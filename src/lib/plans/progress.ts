"use client";

/**
 * Local-first plan progress (completed day indices per plan slug). Works before
 * accounts are live; maps to `user_plan_progress` for sync later. This progress
 * also feeds the accountability engine (Pillar 4 / step 7).
 */
const KEY = "hotb.plans.progress.v1";

type ProgressMap = Record<string, number[]>;

function readAll(): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function writeAll(map: ProgressMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* ignore */
  }
}

export function getCompleted(slug: string): number[] {
  return readAll()[slug] ?? [];
}

export function toggleDay(slug: string, dayIndex: number): number[] {
  const all = readAll();
  const set = new Set(all[slug] ?? []);
  if (set.has(dayIndex)) set.delete(dayIndex);
  else set.add(dayIndex);
  all[slug] = Array.from(set).sort((a, b) => a - b);
  writeAll(all);
  return all[slug];
}

export function resetPlan(slug: string) {
  const all = readAll();
  delete all[slug];
  writeAll(all);
}
