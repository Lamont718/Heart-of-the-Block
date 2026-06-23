"use client";

/**
 * Saved-swap (favorite) storage. Signed-in users keep their favorites in the
 * `saved_swaps` table (keyed by swap slug) so they follow them across devices;
 * everyone else uses localStorage. Same async API either way — the component
 * passes `remote = signedIn && isSupabaseConfigured`.
 */

import { createClient } from "@/lib/supabase/client";

const SAVE_KEY = "hotb.savedSwaps.v1";
const MIGRATED_KEY = "hotb.savedSwaps.migratedToAccount.v1";

function readLocal(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(ids));
  } catch {
    /* storage full / blocked */
  }
}

export async function loadSavedSwaps(remote: boolean): Promise<string[]> {
  if (!remote) return readLocal();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("saved_swaps")
    .select("swap_slug");
  if (error) throw error;
  return (data as { swap_slug: string }[]).map((r) => r.swap_slug);
}

export async function setSwapSaved(
  slug: string,
  saved: boolean,
  remote: boolean,
): Promise<void> {
  if (!remote) {
    const list = readLocal();
    writeLocal(
      saved
        ? list.includes(slug)
          ? list
          : [...list, slug]
        : list.filter((id) => id !== slug),
    );
    return;
  }
  const supabase = createClient();
  if (saved) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not signed in.");
    const { error } = await supabase
      .from("saved_swaps")
      .upsert(
        { user_id: user.id, swap_slug: slug },
        { onConflict: "user_id,swap_slug" },
      );
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("saved_swaps")
      .delete()
      .eq("swap_slug", slug);
    if (error) throw error;
  }
}

/**
 * One-time lift of locally-saved favorites into a freshly signed-in account.
 * Only seeds an empty account, so it can't duplicate favorites synced
 * elsewhere. Marks itself done either way.
 */
export async function migrateLocalSavedSwaps(): Promise<void> {
  try {
    if (localStorage.getItem(MIGRATED_KEY)) return;
    const local = readLocal();
    if (local.length === 0) {
      localStorage.setItem(MIGRATED_KEY, "1");
      return;
    }
    const supabase = createClient();
    const { count } = await supabase
      .from("saved_swaps")
      .select("swap_slug", { count: "exact", head: true });
    if (!count) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("saved_swaps")
          .upsert(
            local.map((slug) => ({ user_id: user.id, swap_slug: slug })),
            { onConflict: "user_id,swap_slug" },
          );
      }
    }
    localStorage.setItem(MIGRATED_KEY, "1");
  } catch {
    /* leave flag unset to retry next visit */
  }
}
