"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  type LeaderboardEntry,
  getLeaderboard,
  getMyEntry,
  publishEntry,
} from "@/lib/community/leaderboard";

export function Leaderboard({
  remote,
  userId,
  points,
  currentStreak,
  displayName,
  neighborhood,
}: {
  remote: boolean;
  userId: string | null;
  points: number;
  currentStreak: number;
  displayName: string;
  neighborhood: string;
}) {
  const [optedIn, setOptedIn] = useState<boolean | null>(null); // null = loading
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const reloadList = useCallback(async () => {
    try {
      setEntries(await getLeaderboard(25));
    } catch {
      setError(true);
    }
  }, []);

  // Initial load: my opt-in state + the public list.
  useEffect(() => {
    if (!remote) return;
    let active = true;
    (async () => {
      try {
        const mine = await getMyEntry();
        if (active) setOptedIn(mine?.optedIn ?? false);
        await reloadList();
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [remote, reloadList]);

  // Keep my published row fresh while I'm opted in and my score changes.
  useEffect(() => {
    if (!remote || optedIn !== true) return;
    let active = true;
    (async () => {
      try {
        await publishEntry({
          points,
          currentStreak,
          displayName,
          neighborhood,
          optedIn: true,
        });
        if (active) await reloadList();
      } catch {
        /* transient; will retry on next change */
      }
    })();
    return () => {
      active = false;
    };
  }, [remote, optedIn, points, currentStreak, displayName, neighborhood, reloadList]);

  async function toggle(next: boolean) {
    setBusy(true);
    setOptedIn(next);
    try {
      await publishEntry({
        points,
        currentStreak,
        displayName,
        neighborhood,
        optedIn: next,
      });
      await reloadList();
    } catch {
      setOptedIn(!next); // revert on failure
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  if (!remote) {
    return (
      <div className="card">
        <h2 className="font-display text-lg font-bold text-ink">
          Block leaderboard
        </h2>
        <p className="mt-1 text-sm text-muted">
          See how you stack up with neighbors taking the same small steps. It’s
          opt-in, and it only ever shows points and streaks — never your health
          numbers.
        </p>
        <Link href="/login?next=/community" className="btn-primary mt-4 inline-flex">
          Sign in to join
        </Link>
      </div>
    );
  }

  const noName = !displayName.trim();

  return (
    <div className="card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-ink">
            Block leaderboard
          </h2>
          <p className="mt-1 text-sm text-muted">
            Opt-in. Shows only points & streaks — never health numbers.
          </p>
        </div>
        {optedIn !== null && (
          <button
            onClick={() => toggle(!optedIn)}
            disabled={busy}
            aria-pressed={optedIn}
            className={optedIn ? "btn-secondary shrink-0" : "btn-primary shrink-0"}
          >
            {busy
              ? "One moment…"
              : optedIn
                ? "Leave the board"
                : "Join the board"}
          </button>
        )}
      </div>

      {optedIn && noName && (
        <p className="mt-3 rounded-xl bg-gold-100 px-4 py-3 text-sm text-ink">
          You’re showing as “A neighbor.”{" "}
          <Link href="/account" className="font-semibold underline">
            Add your name
          </Link>{" "}
          so the block knows it’s you.
        </p>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-brick-100 px-4 py-3 text-sm font-medium text-brick-700">
          Couldn’t load the leaderboard just now — please try again in a moment.
        </p>
      )}

      {!loaded ? (
        <p className="mt-4 text-sm text-muted">Loading neighbors…</p>
      ) : entries.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          {optedIn
            ? "You’re first on the board — keep showing up and neighbors will join you."
            : "No one’s on the board yet. Join and be the first."}
        </p>
      ) : (
        <ol className="mt-4 space-y-1.5">
          {entries.map((e, i) => {
            const isMe = e.userId === userId;
            return (
              <li
                key={e.userId}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                  isMe ? "bg-teal-100 ring-1 ring-teal/30" : "bg-cream"
                }`}
              >
                <span
                  className={`w-6 shrink-0 text-center font-display font-extrabold ${
                    i === 0
                      ? "text-gold-700"
                      : i < 3
                        ? "text-brick-700"
                        : "text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink">
                    {e.displayName}
                    {isMe && (
                      <span className="ml-1 text-xs font-bold text-teal">
                        (you)
                      </span>
                    )}
                  </span>
                  {e.neighborhood && (
                    <span className="block truncate text-xs text-muted">
                      {e.neighborhood}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-display font-bold text-ink">
                    {e.points} pts
                  </span>
                  {e.currentStreak > 0 && (
                    <span className="block text-xs text-muted">
                      🔥 {e.currentStreak}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
