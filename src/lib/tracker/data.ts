"use client";

/**
 * Tracker data facade. Signed-in users (with Supabase configured) read and
 * write the `health_logs` / `weight_goals` tables, so their numbers follow
 * them across devices. Everyone else uses the local-first localStorage layer
 * (offline, no account needed). The component picks the mode via `remote`
 * (= signedIn && isSupabaseConfigured) and otherwise doesn't care which is in
 * play — every function returns a promise the same way.
 */

import { createClient } from "@/lib/supabase/client";
import {
  addReading as localAdd,
  clearWeightGoal as localClearGoal,
  deleteReading as localDelete,
  getReadings as localGetReadings,
  getWeightGoal as localGetGoal,
  setWeightGoal as localSetGoal,
} from "./storage";
import type { Metric, Reading, WeightGoal } from "./types";

type ReadingInput = Omit<Reading, "id" | "createdAt">;

/* --------------------------- Supabase row mapping --------------------------- */

type HealthLogRow = {
  id: string;
  type: Metric;
  values: Record<string, unknown>;
  recorded_at: string;
  created_at: string;
};

/** Weight carries a unit; we tuck it into the jsonb values column for the DB. */
function toDbValues(input: ReadingInput): Record<string, number | string> {
  return input.metric === "weight" && input.unit
    ? { ...input.values, unit: input.unit }
    : input.values;
}

function rowToReading(row: HealthLogRow): Reading {
  const values: Record<string, number> = {};
  let unit: string | undefined;
  for (const [k, v] of Object.entries(row.values)) {
    if (k === "unit" && typeof v === "string") unit = v;
    else if (typeof v === "number") values[k] = v;
  }
  return {
    id: row.id,
    metric: row.type,
    date: String(row.recorded_at).slice(0, 10),
    values,
    unit,
    createdAt: row.created_at,
  };
}

const LOG_COLUMNS = "id, type, values, recorded_at, created_at";
// Noon UTC keeps a yyyy-mm-dd date on the same calendar day across US timezones.
const recordedAt = (date: string) => `${date}T12:00:00Z`;

/* -------------------------------- Readings -------------------------------- */

export async function loadReadings(
  metric: Metric,
  remote: boolean,
): Promise<Reading[]> {
  if (!remote) return localGetReadings(metric);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("health_logs")
    .select(LOG_COLUMNS)
    .eq("type", metric)
    .order("recorded_at", { ascending: true });
  if (error) throw error;
  return (data as HealthLogRow[]).map(rowToReading);
}

export async function saveReading(
  input: ReadingInput,
  remote: boolean,
): Promise<void> {
  if (!remote) {
    localAdd(input);
    return;
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  const { error } = await supabase.from("health_logs").insert({
    user_id: user.id,
    type: input.metric,
    values: toDbValues(input),
    recorded_at: recordedAt(input.date),
  });
  if (error) throw error;
}

export async function removeReading(
  id: string,
  remote: boolean,
): Promise<void> {
  if (!remote) {
    localDelete(id);
    return;
  }
  const supabase = createClient();
  const { error } = await supabase.from("health_logs").delete().eq("id", id);
  if (error) throw error;
}

/* ------------------------------ Weight goal ------------------------------ */

export async function loadWeightGoal(
  remote: boolean,
): Promise<WeightGoal | null> {
  if (!remote) return localGetGoal();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("weight_goals")
    .select("start_weight, target_weight, unit, start_date")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    targetWeight: Number(data.target_weight),
    unit: data.unit as string,
    startWeight:
      data.start_weight != null ? Number(data.start_weight) : undefined,
    startDate: String(data.start_date),
  };
}

export async function saveWeightGoal(
  goal: WeightGoal,
  remote: boolean,
): Promise<void> {
  if (!remote) {
    localSetGoal(goal);
    return;
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  // Keep a single active goal: retire any existing one, then add the new.
  await supabase
    .from("weight_goals")
    .update({ active: false })
    .eq("active", true);
  const { error } = await supabase.from("weight_goals").insert({
    user_id: user.id,
    start_weight: goal.startWeight ?? goal.targetWeight,
    target_weight: goal.targetWeight,
    unit: goal.unit,
    start_date: goal.startDate,
    active: true,
  });
  if (error) throw error;
}

export async function removeWeightGoal(remote: boolean): Promise<void> {
  if (!remote) {
    localClearGoal();
    return;
  }
  const supabase = createClient();
  const { error } = await supabase
    .from("weight_goals")
    .update({ active: false })
    .eq("active", true);
  if (error) throw error;
}

/* ------------------------------ Migration ------------------------------ */

const MIGRATED_KEY = "hotb.tracker.migratedToAccount.v1";
const METRICS: Metric[] = ["a1c", "bp", "cholesterol", "weight"];

/**
 * One-time, safe lift of locally-tracked data into a freshly signed-in
 * account. Runs only when the account has no readings yet, so it can never
 * duplicate data a user already synced on another device. Marks itself done
 * either way so it won't run again.
 */
export async function migrateLocalToAccount(): Promise<boolean> {
  try {
    if (localStorage.getItem(MIGRATED_KEY)) return false;

    const local = METRICS.flatMap((m) => localGetReadings(m));
    const localGoal = localGetGoal();
    if (local.length === 0 && !localGoal) {
      localStorage.setItem(MIGRATED_KEY, "1");
      return false;
    }

    const supabase = createClient();
    const { count } = await supabase
      .from("health_logs")
      .select("id", { count: "exact", head: true });

    // Only seed an empty account — never merge into existing remote data.
    if (!count) {
      for (const r of local) {
        await saveReading(
          { metric: r.metric, date: r.date, values: r.values, unit: r.unit },
          true,
        );
      }
      if (localGoal) await saveWeightGoal(localGoal, true);
    }

    localStorage.setItem(MIGRATED_KEY, "1");
    return Boolean(count === 0 && (local.length > 0 || localGoal));
  } catch {
    // If anything goes wrong, leave the flag unset so we can retry next visit.
    return false;
  }
}
