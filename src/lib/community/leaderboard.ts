"use client";

/**
 * Neighbor leaderboard facade. Opt-in, engagement-only (points + streak +
 * chosen name/neighborhood — never health data). Each signed-in neighbor
 * upserts their own summary row into `leaderboard_entries`; the list reads the
 * top opted-in rows. Requires the 2026-06-23-leaderboard.sql migration.
 */

import { createClient } from "@/lib/supabase/client";

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  neighborhood: string | null;
  points: number;
  currentStreak: number;
}

export interface MyEntry {
  optedIn: boolean;
  points: number;
  currentStreak: number;
}

type Row = {
  user_id: string;
  display_name: string | null;
  neighborhood: string | null;
  points: number;
  current_streak: number;
  opted_in?: boolean;
};

async function currentUserId(supabase: ReturnType<typeof createClient>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

/** Top opted-in neighbors, ranked by points then streak. */
export async function getLeaderboard(limit = 25): Promise<LeaderboardEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("leaderboard_entries")
    .select("user_id, display_name, neighborhood, points, current_streak")
    .eq("opted_in", true)
    .order("points", { ascending: false })
    .order("current_streak", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as Row[]).map((r) => ({
    userId: r.user_id,
    displayName: r.display_name?.trim() || "A neighbor",
    neighborhood: r.neighborhood?.trim() || null,
    points: r.points,
    currentStreak: r.current_streak,
  }));
}

/** The signed-in user's own row (so the UI knows their opt-in state). */
export async function getMyEntry(): Promise<MyEntry | null> {
  const supabase = createClient();
  const userId = await currentUserId(supabase);
  if (!userId) return null;
  const { data, error } = await supabase
    .from("leaderboard_entries")
    .select("points, current_streak, opted_in")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const r = data as Row;
  return {
    optedIn: !!r.opted_in,
    points: r.points,
    currentStreak: r.current_streak,
  };
}

/**
 * Upsert the signed-in user's summary row. Keeps points/streak/name fresh and
 * sets the opt-in flag. Safe to call on every refresh.
 */
export async function publishEntry(input: {
  points: number;
  currentStreak: number;
  displayName: string | null;
  neighborhood: string | null;
  optedIn: boolean;
}): Promise<void> {
  const supabase = createClient();
  const userId = await currentUserId(supabase);
  if (!userId) return;
  const { error } = await supabase.from("leaderboard_entries").upsert(
    {
      user_id: userId,
      display_name: input.displayName?.trim() || null,
      neighborhood: input.neighborhood?.trim() || null,
      points: input.points,
      current_streak: input.currentStreak,
      opted_in: input.optedIn,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
}
