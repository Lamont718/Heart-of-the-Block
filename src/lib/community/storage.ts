"use client";

import { CHALLENGES_SEED } from "@/data/challenges-seed";

/**
 * Local-first community/accountability state (SPEC Pillar 4). Check-ins,
 * activity logs, and challenge progress live in localStorage so the engagement
 * loop works before accounts; maps to check_ins / streaks / activity_logs /
 * challenge_participants for cross-device + real cohorts later.
 */
const CHECKINS_KEY = "hotb.community.checkins.v1";
const ACTIVITIES_KEY = "hotb.community.activities.v1";
const CHALLENGES_KEY = "hotb.community.challenges.v1";

export type ActivityType = "walk" | "home_workout" | "other";

export interface Activity {
  id: string;
  type: ActivityType;
  minutes?: number;
  date: string; // yyyy-mm-dd
  createdAt: string;
}

type ChallengeState = Record<string, { dates: string[]; completedAt?: string }>;

export const todayISO = () => new Date().toISOString().slice(0, 10);

function addDays(iso: string, delta: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + delta);
  return dt.toISOString().slice(0, 10);
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now()) + Math.round(Math.random() * 1e6);

/* ----------------------------- Check-ins ----------------------------- */

export function getCheckIns(): string[] {
  return read<string[]>(CHECKINS_KEY, []);
}
export function hasCheckedInToday(): boolean {
  return getCheckIns().includes(todayISO());
}
export function checkInToday(): string[] {
  const list = getCheckIns();
  if (!list.includes(todayISO())) {
    list.push(todayISO());
    write(CHECKINS_KEY, list);
  }
  return list;
}

/* ----------------------------- Activities ----------------------------- */

export function getActivities(): Activity[] {
  return read<Activity[]>(ACTIVITIES_KEY, []).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}
export function addActivity(input: {
  type: ActivityType;
  minutes?: number;
}): Activity {
  const a: Activity = {
    id: newId(),
    type: input.type,
    minutes: input.minutes,
    date: todayISO(),
    createdAt: new Date().toISOString(),
  };
  write(ACTIVITIES_KEY, [...read<Activity[]>(ACTIVITIES_KEY, []), a]);
  checkInToday(); // moving today counts as showing up
  return a;
}

/* ----------------------------- Challenges ----------------------------- */

export function getChallengeState(): ChallengeState {
  return read<ChallengeState>(CHALLENGES_KEY, {});
}

/** Record one day of progress on a challenge (idempotent per day). */
export function tapChallenge(id: string): ChallengeState {
  const def = CHALLENGES_SEED.find((c) => c.id === id);
  if (!def) return getChallengeState();
  const all = getChallengeState();
  const entry = all[id] ?? { dates: [] };
  if (!entry.dates.includes(todayISO())) entry.dates.push(todayISO());
  if (!entry.completedAt && entry.dates.length >= def.target) {
    entry.completedAt = todayISO();
  }
  all[id] = entry;
  write(CHALLENGES_KEY, all);
  return all;
}

/* ----------------------- Pure helpers (no storage) ----------------------- */

export interface StreakInfo {
  current: number;
  longest: number;
  /** Last 7 days oldest→newest: did we check in that day? */
  week: { date: string; hit: boolean }[];
}

export function computeStreak(dates: string[]): StreakInfo {
  const set = new Set(dates);
  const today = todayISO();

  // Current streak: from today (or yesterday) backward.
  const cursor = set.has(today) ? today : addDays(today, -1);
  let current = 0;
  if (set.has(cursor)) {
    current = 1;
    let prev = addDays(cursor, -1);
    while (set.has(prev)) {
      current++;
      prev = addDays(prev, -1);
    }
  }

  // Longest run across all dates.
  const sorted = Array.from(set).sort();
  let longest = 0;
  let run = 0;
  let prevDate: string | null = null;
  for (const d of sorted) {
    if (prevDate && addDays(prevDate, 1) === d) run++;
    else run = 1;
    longest = Math.max(longest, run);
    prevDate = d;
  }

  const week = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i - 6);
    return { date, hit: set.has(date) };
  });

  return { current, longest, week };
}

export function computePoints(
  checkIns: string[],
  activities: Activity[],
  challenges: ChallengeState,
): number {
  let pts = checkIns.length * 5 + activities.length * 5;
  for (const def of CHALLENGES_SEED) {
    if (challenges[def.id]?.completedAt) pts += def.points;
  }
  return pts;
}

export function levelForPoints(points: number): { level: number; label: string } {
  const level = Math.floor(points / 100) + 1;
  const labels = ["Getting started", "On a roll", "Block regular", "Heart strong", "Block legend"];
  return { level, label: labels[Math.min(level - 1, labels.length - 1)] };
}
