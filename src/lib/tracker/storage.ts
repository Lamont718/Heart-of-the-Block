"use client";

import type { Metric, Reading, WeightGoal } from "./types";

/**
 * Local-first tracker storage. Lives in localStorage so the tracker works
 * immediately (before accounts are enabled) and offline. When Supabase auth is
 * live, the same shape maps onto the `health_logs` / `weight_goals` tables for
 * cross-device sync — that's the upgrade path, not a v1 requirement.
 */
const READINGS_KEY = "hotb.tracker.readings.v1";
const GOAL_KEY = "hotb.tracker.weightGoal.v1";

function readAll(): Reading[] {
  try {
    const raw = localStorage.getItem(READINGS_KEY);
    return raw ? (JSON.parse(raw) as Reading[]) : [];
  } catch {
    return [];
  }
}

function writeAll(readings: Reading[]) {
  try {
    localStorage.setItem(READINGS_KEY, JSON.stringify(readings));
  } catch {
    /* storage full / blocked */
  }
}

/** Readings for a metric, sorted oldest → newest by date. */
export function getReadings(metric: Metric): Reading[] {
  return readAll()
    .filter((r) => r.metric === metric)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function addReading(
  input: Omit<Reading, "id" | "createdAt">,
): Reading {
  const reading: Reading = {
    ...input,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now()) + Math.round(Math.random() * 1e6),
    createdAt: new Date().toISOString(),
  };
  writeAll([...readAll(), reading]);
  return reading;
}

export function deleteReading(id: string) {
  writeAll(readAll().filter((r) => r.id !== id));
}

export function getWeightGoal(): WeightGoal | null {
  try {
    const raw = localStorage.getItem(GOAL_KEY);
    return raw ? (JSON.parse(raw) as WeightGoal) : null;
  } catch {
    return null;
  }
}

export function setWeightGoal(goal: WeightGoal) {
  try {
    localStorage.setItem(GOAL_KEY, JSON.stringify(goal));
  } catch {
    /* ignore */
  }
}

export function clearWeightGoal() {
  try {
    localStorage.removeItem(GOAL_KEY);
  } catch {
    /* ignore */
  }
}
