"use client";

import { useEffect, useState } from "react";
import { CHALLENGES_SEED } from "@/data/challenges-seed";
import {
  type Activity,
  type ActivityType,
  addActivity,
  checkInToday,
  computePoints,
  computeStreak,
  getActivities,
  getChallengeState,
  getCheckIns,
  hasCheckedInToday,
  levelForPoints,
  tapChallenge,
  todayISO,
} from "@/lib/community/storage";
import { CrossToolNudges } from "./cross-tool-nudges";

const ACTIVITY_LABEL: Record<ActivityType, string> = {
  walk: "Walk",
  home_workout: "Home workout",
  other: "Other",
};

export function CommunityHub({ signedIn }: { signedIn: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [checkIns, setCheckIns] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [challenges, setChallenges] = useState(getChallengeStateSafe);

  function refresh() {
    setCheckIns(getCheckIns());
    setActivities(getActivities());
    setChallenges(getChallengeState());
  }

  useEffect(() => {
    setMounted(true);
    refresh();
  }, []);

  const streak = computeStreak(checkIns);
  const points = computePoints(checkIns, activities, challenges);
  const { level, label } = levelForPoints(points);
  const checkedToday = mounted && hasCheckedInToday();

  return (
    <div className="space-y-6">
      {/* Header: points / level / streak */}
      <div className="card bg-brick text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white/80">
              Level {mounted ? level : 1} · {mounted ? label : "Getting started"}
            </p>
            <p className="font-display text-3xl font-extrabold">
              {mounted ? points : 0} points
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-extrabold">
              🔥 {mounted ? streak.current : 0}
            </p>
            <p className="text-sm text-white/80">
              day streak{mounted && streak.longest > 0 ? ` · best ${streak.longest}` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Daily check-in */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              {checkedToday ? "You showed up today ✓" : "Check in for today"}
            </h2>
            <p className="text-sm text-muted">
              {checkedToday
                ? "That's how streaks are built — one day at a time."
                : "Tap in to keep your streak going. Showing up is the whole game."}
            </p>
          </div>
          {!checkedToday && (
            <button
              onClick={() => {
                checkInToday();
                refresh();
              }}
              disabled={!mounted}
              className="btn-primary shrink-0"
            >
              I’m in for today
            </button>
          )}
        </div>

        {/* Week dots */}
        <div className="mt-4 flex justify-between gap-1">
          {(mounted ? streak.week : emptyWeek()).map((d, i) => {
            const isToday = d.date === todayISO();
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    d.hit
                      ? "bg-teal text-white"
                      : isToday
                        ? "border-2 border-brick text-brick-700"
                        : "bg-cream text-muted"
                  }`}
                >
                  {d.hit ? "✓" : ""}
                </div>
                <span className="text-[10px] text-muted">{dayLetter(d.date)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity log */}
      <ActivityCard activities={mounted ? activities : []} onLogged={refresh} mounted={mounted} />

      {/* Challenges */}
      <section>
        <h2 className="mb-3 font-display text-xl font-extrabold text-ink">
          Challenges
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CHALLENGES_SEED.map((c) => {
            const state = challenges[c.id] ?? { dates: [] };
            const progress = Math.min(state.dates.length, c.target);
            const pct = Math.round((progress / c.target) * 100);
            const tappedToday = state.dates.includes(todayISO());
            const completed = !!state.completedAt;
            return (
              <div key={c.id} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-base font-bold text-ink">
                      {c.emoji} {c.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{c.blurb}</p>
                  </div>
                  <span className="shrink-0 pill bg-gold-100 text-xs text-ink">
                    +{c.points}
                  </span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-cream">
                  <div
                    className="h-full rounded-full bg-teal transition-all"
                    style={{ width: `${mounted ? pct : 0}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted">
                    {progress}/{c.target} days
                  </span>
                  {completed ? (
                    <span className="text-sm font-bold text-good">Done 🎉</span>
                  ) : (
                    <button
                      onClick={() => {
                        tapChallenge(c.id);
                        refresh();
                      }}
                      disabled={!mounted || tappedToday}
                      className="btn-secondary !min-h-[36px] !px-3 !py-1.5 text-sm"
                    >
                      {tappedToday ? "✓ Today" : "Did it today"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cross-tool nudges */}
      <section>
        <h2 className="mb-3 font-display text-xl font-extrabold text-ink">
          Keep going
        </h2>
        <CrossToolNudges />
      </section>

      <p className="rounded-xl bg-cream p-4 text-sm text-muted">
        {signedIn ? (
          "Your streak and progress are saved to your account."
        ) : (
          <>
            🔒 Your streak, points, and challenges are saved{" "}
            <strong>on this device</strong>. When accounts go live you’ll keep
            them across devices — and join challenges with neighbors on a real
            leaderboard.
          </>
        )}
      </p>
    </div>
  );
}

function ActivityCard({
  activities,
  onLogged,
  mounted,
}: {
  activities: Activity[];
  onLogged: () => void;
  mounted: boolean;
}) {
  const [type, setType] = useState<ActivityType>("walk");
  const [minutes, setMinutes] = useState("");
  const [flash, setFlash] = useState(false);

  function log() {
    const mins = minutes.trim() ? Number(minutes) : undefined;
    addActivity({ type, minutes: mins && mins > 0 ? mins : undefined });
    setMinutes("");
    setFlash(true);
    setTimeout(() => setFlash(false), 1500);
    onLogged();
  }

  return (
    <div className="card">
      <h2 className="font-display text-lg font-bold text-ink">
        Log today’s movement
      </h2>
      <p className="text-sm text-muted">
        A walk, a home workout, anything. It counts toward your streak.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {(Object.keys(ACTIVITY_LABEL) as ActivityType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            aria-pressed={type === t}
            className={`pill border transition ${
              type === t
                ? "border-brick bg-brick text-white"
                : "border-line bg-surface text-ink hover:bg-cream"
            }`}
          >
            {ACTIVITY_LABEL[t]}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          inputMode="numeric"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Minutes (optional)"
          aria-label="Minutes"
          className="field"
        />
        <button onClick={log} disabled={!mounted} className="btn-primary shrink-0">
          {flash ? "Logged ✓" : "Log it"}
        </button>
      </div>

      {activities.length > 0 && (
        <ul className="mt-4 divide-y divide-line">
          {activities.slice(0, 5).map((a) => (
            <li key={a.id} className="flex items-center justify-between py-2 text-sm">
              <span className="font-semibold text-ink">
                {ACTIVITY_LABEL[a.type]}
                {a.minutes ? ` · ${a.minutes} min` : ""}
              </span>
              <span className="text-muted">
                {a.date === todayISO() ? "Today" : a.date.slice(5)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getChallengeStateSafe() {
  return {} as ReturnType<typeof getChallengeState>;
}
function emptyWeek() {
  return Array.from({ length: 7 }, () => ({ date: "", hit: false }));
}
function dayLetter(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return ["S", "M", "T", "W", "T", "F", "S"][new Date(y, m - 1, d).getDay()];
}
