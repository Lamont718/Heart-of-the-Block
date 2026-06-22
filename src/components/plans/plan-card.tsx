import Link from "next/link";
import { PLAN_TAG_META, type Plan } from "@/lib/plans/types";

export function PlanCard({ plan }: { plan: Plan }) {
  const isMeal = plan.kind === "meal";
  return (
    <Link
      href={`/plans/${plan.slug}`}
      className="card group flex flex-col transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="flex items-center justify-between">
        <span className="pill bg-cream text-muted">
          {isMeal ? "🍽️ Meal plan" : "👟 Movement"}
        </span>
        <span className="text-sm font-semibold text-muted">
          {plan.lengthLabel}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-brick-700">
        {plan.title}
      </h3>
      <p className="mt-1 flex-1 text-sm text-muted">{plan.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {plan.tags.slice(0, 3).map((t) => (
          <span key={t} className="pill bg-cream text-xs text-muted">
            {PLAN_TAG_META[t].emoji} {PLAN_TAG_META[t].label}
          </span>
        ))}
      </div>
    </Link>
  );
}
