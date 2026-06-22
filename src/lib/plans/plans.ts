import { PLANS_SEED } from "@/data/plans-seed";
import type { Plan, PlanKind } from "./types";

/**
 * Guided plans. Plan content (days, meals, exercises) is structured and
 * authored, so it ships from the bundled seed. (The plans / plan_days /
 * exercises / meals tables exist for a future CMS-backed version; user progress
 * is what gets persisted per-user — see lib/plans/progress.ts.)
 */
export async function getPlans(kind?: PlanKind): Promise<Plan[]> {
  return kind ? PLANS_SEED.filter((p) => p.kind === kind) : PLANS_SEED;
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  return PLANS_SEED.find((p) => p.slug === slug) ?? null;
}
