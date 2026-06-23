"use client";

import { useEffect, useState } from "react";
import {
  MEAL_SLOT_LABEL,
  type MealSlot,
  type Plan,
  type PlanDay,
} from "@/lib/plans/types";
import {
  loadCompleted,
  migrateLocalPlan,
  resetPlan,
  toggleDay,
} from "@/lib/plans/data";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const SLOT_ORDER: MealSlot[] = ["breakfast", "lunch", "dinner", "snack"];

export function PlanRunner({
  plan,
  signedIn,
}: {
  plan: Plan;
  signedIn: boolean;
}) {
  const remote = signedIn && isSupabaseConfigured;
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (remote) await migrateLocalPlan(plan.slug);
        const days = await loadCompleted(plan.slug, remote);
        if (active) setCompleted(days);
      } catch {
        /* leave empty on failure */
      } finally {
        if (active) setMounted(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [plan.slug, remote]);

  const total = plan.days.length;
  const doneCount = completed.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const allDone = mounted && doneCount === total;

  async function onToggle(index: number) {
    const wasDone = completed.includes(index);
    // Optimistic flip, revert on failure.
    setCompleted((prev) =>
      wasDone ? prev.filter((i) => i !== index) : [...prev, index].sort((a, b) => a - b),
    );
    try {
      const next = await toggleDay(plan.slug, index, wasDone, remote);
      setCompleted(next);
    } catch {
      setCompleted((prev) =>
        wasDone ? [...prev, index].sort((a, b) => a - b) : prev.filter((i) => i !== index),
      );
    }
  }
  async function onReset() {
    const prev = completed;
    setCompleted([]);
    try {
      await resetPlan(plan.slug, remote);
    } catch {
      setCompleted(prev);
    }
  }

  return (
    <div>
      {/* Progress */}
      <div className="card sticky top-16 z-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">
            Your progress
          </h2>
          {mounted && doneCount > 0 && (
            <button
              onClick={onReset}
              className="text-sm font-semibold text-muted hover:text-brick-700"
            >
              Reset
            </button>
          )}
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-cream">
          <div
            className="h-full rounded-full bg-teal transition-all"
            style={{ width: `${mounted ? pct : 0}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-semibold text-ink">
          {!mounted
            ? "—"
            : allDone
              ? "🎉 You finished the whole plan — that's real."
              : `${doneCount} of ${total} done`}
        </p>
      </div>

      {/* Days */}
      <ol className="mt-5 space-y-4">
        {plan.days.map((d) => (
          <DayCard
            key={d.index}
            day={d}
            kind={plan.kind}
            done={completed.includes(d.index)}
            disabled={!mounted}
            onToggle={() => onToggle(d.index)}
          />
        ))}
      </ol>
    </div>
  );
}

function DayCard({
  day,
  kind,
  done,
  disabled,
  onToggle,
}: {
  day: PlanDay;
  kind: Plan["kind"];
  done: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <li className={`card ${done ? "border-teal/40 bg-teal-100/40" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{day.title}</h3>
          {day.note && <p className="mt-1 text-sm text-muted">{day.note}</p>}
        </div>
        <button
          onClick={onToggle}
          disabled={disabled}
          aria-pressed={done}
          className={
            done
              ? "btn !min-h-[40px] shrink-0 bg-teal !px-3 !py-2 text-sm text-white"
              : "btn-secondary !min-h-[40px] shrink-0 !px-3 !py-2 text-sm"
          }
        >
          {done ? "✓ Done" : "Mark done"}
        </button>
      </div>

      {kind === "meal" && day.meals && (
        <div className="mt-4 space-y-3">
          {SLOT_ORDER.filter((s) => day.meals!.some((m) => m.slot === s)).map(
            (slot) => {
              const meal = day.meals!.find((m) => m.slot === slot)!;
              return (
                <div key={slot} className="rounded-xl bg-cream p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-brick-700">
                    {MEAL_SLOT_LABEL[slot]}
                  </p>
                  <p className="font-semibold text-ink">{meal.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {meal.ingredients.join(" · ")}
                  </p>
                  {meal.note && (
                    <p className="mt-1 text-xs italic text-muted">{meal.note}</p>
                  )}
                </div>
              );
            },
          )}
        </div>
      )}

      {kind === "exercise" && day.exercises && (
        <ul className="mt-4 space-y-2">
          {day.exercises.map((ex, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl bg-cream p-3">
              <div className="flex-1">
                <p className="font-semibold text-ink">
                  {ex.name}
                  {ex.seated && (
                    <span className="ml-2 pill bg-surface text-xs text-muted">
                      🪑 seated
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-muted">{ex.instructions}</p>
              </div>
              {ex.minutes != null && (
                <span className="shrink-0 rounded-lg bg-surface px-2 py-1 text-xs font-bold text-ink">
                  {ex.minutes} min
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
