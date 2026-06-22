import type { Metadata } from "next";
import Link from "next/link";
import { getPlans } from "@/lib/plans/plans";
import { PlanCard } from "@/components/plans/plan-card";

export const metadata: Metadata = {
  title: "Guided plans — meals & movement that fit your life",
  description:
    "Affordable, bodega-friendly meal plans and no-gym exercise plans — walking, home workouts, and chair exercises. Pick one and track your progress.",
};

const FILTERS = [
  { key: "all", label: "All plans" },
  { key: "meal", label: "🍽️ Meals" },
  { key: "exercise", label: "👟 Movement" },
  { key: "seated", label: "🪑 Seated-friendly" },
];

export default async function PlansPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const all = await getPlans();
  const filter = searchParams.filter ?? "all";

  const shown = all.filter((p) => {
    if (filter === "meal" || filter === "exercise") return p.kind === filter;
    if (filter === "seated") return p.tags.includes("seated-friendly");
    return true;
  });

  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Guided plans
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          A plan that fits your life
        </h1>
        <p className="mt-2 text-muted">
          No fancy ingredients, no gym. Pick a meal plan or a way to move, follow
          along day by day, and check off your progress as you go.
        </p>
      </header>

      <nav aria-label="Filter plans" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key || (f.key === "all" && filter === "all");
          return (
            <Link
              key={f.key}
              href={f.key === "all" ? "/plans" : `/plans?filter=${f.key}`}
              className={`pill border transition ${
                active
                  ? "border-brick bg-brick text-white"
                  : "border-line bg-surface text-ink hover:bg-cream"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm text-muted">
        These are general wellness plans, not a prescription. If you have a heart
        condition, are pregnant, or haven’t been active in a while, check with
        your doctor before starting — especially the movement plans.
      </p>
    </div>
  );
}
