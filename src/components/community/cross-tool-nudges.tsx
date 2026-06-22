"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PLANS_SEED } from "@/data/plans-seed";
import { getCompleted } from "@/lib/plans/progress";
import { getWeightGoal, getReadings } from "@/lib/tracker/storage";

type Nudge = { href: string; emoji: string; title: string; body: string };

/**
 * Pulls progress from the other pillars (plans, weight goal) into the
 * accountability hub — the "did you do today's walk?" / "you're almost there"
 * nudges that drive retention (SPEC Pillar 4).
 */
export function CrossToolNudges() {
  const [nudges, setNudges] = useState<Nudge[]>([]);

  useEffect(() => {
    const out: Nudge[] = [];

    // Plan in progress?
    for (const plan of PLANS_SEED) {
      const done = getCompleted(plan.slug).length;
      if (done > 0 && done < plan.days.length) {
        out.push({
          href: `/plans/${plan.slug}`,
          emoji: plan.kind === "meal" ? "🍽️" : "👟",
          title: "Pick up where you left off",
          body: `${plan.title} — ${done} of ${plan.days.length} done`,
        });
        break;
      }
    }

    // Weight goal progress?
    const goal = getWeightGoal();
    if (goal) {
      const weights = getReadings("weight");
      const latest = weights[weights.length - 1]?.values.value;
      if (latest != null) {
        const toGo = Math.abs(latest - goal.targetWeight);
        out.push({
          href: "/tracker",
          emoji: "🎯",
          title: "Your weight goal",
          body:
            toGo <= 0.5
              ? "You're right at your target — keep it steady."
              : `${toGo.toFixed(1)} ${goal.unit} to go`,
        });
      }
    }

    // Always give a couple of ways forward.
    if (out.length < 3) {
      const fillers: Nudge[] = [
        { href: "/plans", emoji: "🗓️", title: "Start a plan", body: "Pick a meal or movement plan that fits your week." },
        { href: "/tracker", emoji: "📈", title: "Log your numbers", body: "Track weight or blood pressure and watch the trend." },
        { href: "/swaps", emoji: "🔎", title: "Find a swap", body: "Make a favorite meal love you back." },
      ];
      for (const f of fillers) {
        if (out.length >= 3) break;
        if (!out.some((n) => n.href === f.href)) out.push(f);
      }
    }

    setNudges(out.slice(0, 3));
  }, []);

  if (nudges.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {nudges.map((n) => (
        <Link
          key={n.title + n.href}
          href={n.href}
          className="card transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <div className="text-2xl" aria-hidden>
            {n.emoji}
          </div>
          <p className="mt-2 font-display text-base font-bold text-ink">
            {n.title}
          </p>
          <p className="mt-0.5 text-sm text-muted">{n.body}</p>
        </Link>
      ))}
    </div>
  );
}
