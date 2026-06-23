"use client";

/**
 * Plan-progress facade. Signed-in users keep completed plan days in
 * `user_plan_days` (keyed by plan slug + day index) so progress follows them
 * across devices; everyone else uses the local-first layer. Same async API
 * either way (`remote = signedIn && isSupabaseConfigured`).
 */

import { createClient } from "@/lib/supabase/client";
import {
  getCompleted as localGetCompleted,
  resetPlan as localResetPlan,
  toggleDay as localToggleDay,
} from "./progress";

export async function loadCompleted(
  slug: string,
  remote: boolean,
): Promise<number[]> {
  if (!remote) return localGetCompleted(slug);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_plan_days")
    .select("day_index")
    .eq("plan_slug", slug);
  if (error) throw error;
  return (data as { day_index: number }[])
    .map((r) => r.day_index)
    .sort((a, b) => a - b);
}

/** Toggle a day's completion. Returns the new completed set. */
export async function toggleDay(
  slug: string,
  dayIndex: number,
  currentlyDone: boolean,
  remote: boolean,
): Promise<number[]> {
  if (!remote) return localToggleDay(slug, dayIndex);
  const supabase = createClient();
  if (currentlyDone) {
    const { error } = await supabase
      .from("user_plan_days")
      .delete()
      .eq("plan_slug", slug)
      .eq("day_index", dayIndex);
    if (error) throw error;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not signed in.");
    const { error } = await supabase
      .from("user_plan_days")
      .upsert(
        { user_id: user.id, plan_slug: slug, day_index: dayIndex },
        { onConflict: "user_id,plan_slug,day_index" },
      );
    if (error) throw error;
  }
  return loadCompleted(slug, remote);
}

export async function resetPlan(slug: string, remote: boolean): Promise<void> {
  if (!remote) {
    localResetPlan(slug);
    return;
  }
  const supabase = createClient();
  const { error } = await supabase
    .from("user_plan_days")
    .delete()
    .eq("plan_slug", slug);
  if (error) throw error;
}

/**
 * One-time lift of locally-tracked progress for THIS plan into a signed-in
 * account, only when the account has no progress for it yet. The empty-account
 * check makes it idempotent (once seeded, count > 0 so it won't run again) and
 * per-plan, so each plan migrates independently and nothing duplicates.
 */
export async function migrateLocalPlan(slug: string): Promise<void> {
  try {
    const local = localGetCompleted(slug);
    if (local.length === 0) return; // nothing to lift for this plan
    const supabase = createClient();
    const { count } = await supabase
      .from("user_plan_days")
      .select("day_index", { count: "exact", head: true })
      .eq("plan_slug", slug);
    if (!count) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("user_plan_days").upsert(
          local.map((day_index) => ({
            user_id: user.id,
            plan_slug: slug,
            day_index,
          })),
          { onConflict: "user_id,plan_slug,day_index" },
        );
      }
    }
  } catch {
    /* ignore — retry next visit */
  }
}
