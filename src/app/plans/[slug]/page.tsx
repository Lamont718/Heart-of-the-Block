import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlanBySlug, getPlans } from "@/lib/plans/plans";
import { PLAN_TAG_META } from "@/lib/plans/types";
import { PlanRunner } from "@/components/plans/plan-runner";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

export async function generateStaticParams() {
  const plans = await getPlans();
  return plans.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const plan = await getPlanBySlug(params.slug);
  if (!plan) return { title: "Plan not found" };
  return { title: plan.title, description: plan.description };
}

export default async function PlanPage({
  params,
}: {
  params: { slug: string };
}) {
  const plan = await getPlanBySlug(params.slug);
  if (!plan) notFound();

  return (
    <div className="container-block max-w-2xl py-8 sm:py-10">
      <Link
        href="/plans"
        className="text-sm font-semibold text-brick-700 hover:underline"
      >
        ← All plans
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="pill bg-cream text-muted">
          {plan.kind === "meal" ? "🍽️ Meal plan" : "👟 Movement"}
        </span>
        <span className="pill bg-cream text-muted">{plan.lengthLabel}</span>
        {plan.tags.map((t) => (
          <span key={t} className="pill bg-cream text-xs text-muted">
            {PLAN_TAG_META[t].emoji} {PLAN_TAG_META[t].label}
          </span>
        ))}
      </div>

      <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        {plan.title}
      </h1>
      <p className="mt-2 text-muted">{plan.description}</p>

      <div className="mt-6">
        <PlanRunner plan={plan} />
      </div>

      <div className="mt-8">
        <DisclaimerBanner variant="inline" />
      </div>
    </div>
  );
}
