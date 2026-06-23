"use client";

/**
 * Community/accountability facade. Signed-in users sync their daily check-ins
 * (`check_ins`), movement logs (`activity_logs`), and challenge progress
 * (`challenge_days`, keyed by challenge slug) so streaks, points, and
 * challenges follow them across devices. Everyone else stays local-first.
 *
 * The points/streak math (computeStreak/computePoints/levelForPoints) is pure
 * and unchanged — this layer just supplies the same three data shapes
 * (check-in dates, activities, challenge state) from either source.
 */

import { createClient } from "@/lib/supabase/client";
import { CHALLENGES_SEED } from "@/data/challenges-seed";
import {
  type Activity,
  type ActivityType,
  addActivity as localAddActivity,
  checkInToday as localCheckIn,
  getActivities as localGetActivities,
  getChallengeState as localGetChallenges,
  getCheckIns as localGetCheckIns,
  tapChallenge as localTapChallenge,
  todayISO,
} from "./storage";

export type ChallengeState = Record<
  string,
  { dates: string[]; completedAt?: string }
>;

export type CommunityState = {
  checkIns: string[];
  activities: Activity[];
  challenges: ChallengeState;
};

/** Derive completedAt the same way the local engine does: set once the day
 *  count reaches the challenge's target. Value just needs to be truthy. */
function withCompletion(slug: string, dates: string[]): {
  dates: string[];
  completedAt?: string;
} {
  const def = CHALLENGES_SEED.find((c) => c.id === slug);
  const sorted = [...dates].sort();
  const completedAt =
    def && sorted.length >= def.target ? sorted[def.target - 1] : undefined;
  return { dates: sorted, completedAt };
}

/* ------------------------------- Load all ------------------------------- */

export async function loadCommunity(remote: boolean): Promise<CommunityState> {
  if (!remote) {
    return {
      checkIns: localGetCheckIns(),
      activities: localGetActivities(),
      challenges: localGetChallenges(),
    };
  }
  const supabase = createClient();
  const [checkRes, actRes, chalRes] = await Promise.all([
    supabase.from("check_ins").select("checked_in_on").eq("kind", "daily"),
    supabase
      .from("activity_logs")
      .select("id, activity_type, minutes, logged_at")
      .order("logged_at", { ascending: false }),
    supabase.from("challenge_days").select("challenge_slug, progressed_on"),
  ]);
  if (checkRes.error) throw checkRes.error;
  if (actRes.error) throw actRes.error;
  if (chalRes.error) throw chalRes.error;

  const checkIns = (checkRes.data as { checked_in_on: string }[]).map(
    (r) => r.checked_in_on,
  );

  const activities: Activity[] = (
    actRes.data as {
      id: string;
      activity_type: ActivityType;
      minutes: number | null;
      logged_at: string;
    }[]
  ).map((r) => ({
    id: r.id,
    type: r.activity_type,
    minutes: r.minutes ?? undefined,
    date: String(r.logged_at).slice(0, 10),
    createdAt: r.logged_at,
  }));

  const bySlug: Record<string, string[]> = {};
  for (const r of chalRes.data as {
    challenge_slug: string;
    progressed_on: string;
  }[]) {
    (bySlug[r.challenge_slug] ??= []).push(r.progressed_on);
  }
  const challenges: ChallengeState = {};
  for (const [slug, dates] of Object.entries(bySlug)) {
    challenges[slug] = withCompletion(slug, dates);
  }

  return { checkIns, activities, challenges };
}

/* ------------------------------- Mutations ------------------------------- */

async function currentUserId(supabase: ReturnType<typeof createClient>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  return user.id;
}

export async function checkIn(remote: boolean): Promise<void> {
  if (!remote) {
    localCheckIn();
    return;
  }
  const supabase = createClient();
  const user_id = await currentUserId(supabase);
  const { error } = await supabase
    .from("check_ins")
    .upsert(
      { user_id, kind: "daily", checked_in_on: todayISO() },
      { onConflict: "user_id,kind,checked_in_on" },
    );
  if (error) throw error;
}

export async function addActivity(
  input: { type: ActivityType; minutes?: number },
  remote: boolean,
): Promise<void> {
  if (!remote) {
    localAddActivity(input);
    return;
  }
  const supabase = createClient();
  const user_id = await currentUserId(supabase);
  const { error } = await supabase.from("activity_logs").insert({
    user_id,
    activity_type: input.type,
    minutes: input.minutes ?? null,
  });
  if (error) throw error;
  // Moving today counts as showing up.
  await checkIn(remote);
}

export async function tapChallenge(
  slug: string,
  remote: boolean,
): Promise<void> {
  if (!remote) {
    localTapChallenge(slug);
    return;
  }
  const supabase = createClient();
  const user_id = await currentUserId(supabase);
  const { error } = await supabase
    .from("challenge_days")
    .upsert(
      { user_id, challenge_slug: slug, progressed_on: todayISO() },
      { onConflict: "user_id,challenge_slug,progressed_on" },
    );
  if (error) throw error;
}

/* ------------------------------ Migration ------------------------------ */

const MIGRATED_KEY = "hotb.community.migratedToAccount.v1";

/**
 * One-time lift of locally-tracked community data into a freshly signed-in
 * account, only when the account has no check-ins yet (the empty-account
 * check keeps it from duplicating). Covers check-ins, activities, and
 * challenge days together so points/streaks stay consistent.
 */
export async function migrateLocalCommunity(): Promise<void> {
  try {
    if (localStorage.getItem(MIGRATED_KEY)) return;
    const checkIns = localGetCheckIns();
    const activities = localGetActivities();
    const challenges = localGetChallenges();
    if (
      checkIns.length === 0 &&
      activities.length === 0 &&
      Object.keys(challenges).length === 0
    ) {
      localStorage.setItem(MIGRATED_KEY, "1");
      return;
    }

    const supabase = createClient();
    const user_id = await currentUserId(supabase);
    const { count } = await supabase
      .from("check_ins")
      .select("id", { count: "exact", head: true });

    if (!count) {
      if (checkIns.length) {
        await supabase.from("check_ins").upsert(
          checkIns.map((d) => ({
            user_id,
            kind: "daily",
            checked_in_on: d,
          })),
          { onConflict: "user_id,kind,checked_in_on" },
        );
      }
      if (activities.length) {
        await supabase.from("activity_logs").insert(
          activities.map((a) => ({
            user_id,
            activity_type: a.type,
            minutes: a.minutes ?? null,
            logged_at: a.createdAt,
          })),
        );
      }
      const rows: {
        user_id: string;
        challenge_slug: string;
        progressed_on: string;
      }[] = [];
      for (const [slug, state] of Object.entries(challenges)) {
        for (const d of state.dates) {
          rows.push({ user_id, challenge_slug: slug, progressed_on: d });
        }
      }
      if (rows.length) {
        await supabase
          .from("challenge_days")
          .upsert(rows, { onConflict: "user_id,challenge_slug,progressed_on" });
      }
    }

    localStorage.setItem(MIGRATED_KEY, "1");
  } catch {
    /* leave flag unset to retry next visit */
  }
}
