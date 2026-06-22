/** Guided plan types. Mirrors plans / plan_days / exercises / meals (CONTEXT). */

export type PlanKind = "meal" | "exercise";
export type Mobility = "any" | "seated";

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";

export interface Meal {
  slot: MealSlot;
  name: string;
  ingredients: string[];
  note?: string;
}

export interface Exercise {
  name: string;
  instructions: string;
  minutes?: number;
  seated?: boolean;
}

export interface PlanDay {
  index: number;
  title: string;
  note?: string;
  meals?: Meal[];
  exercises?: Exercise[];
}

export interface Plan {
  id: string;
  slug: string;
  title: string;
  kind: PlanKind;
  description: string;
  /** How the plan reads at a glance, e.g. "5 days" or "4 weeks". */
  lengthLabel: string;
  audience: {
    goals: string[];
    mobility: Mobility;
    level?: "beginner" | "easy";
  };
  tags: PlanTag[];
  days: PlanDay[];
}

export type PlanTag =
  | "no-gym"
  | "seated-friendly"
  | "budget"
  | "lower-salt"
  | "caribbean"
  | "beginner"
  | "weight"
  | "blood-pressure";

export const PLAN_TAG_META: Record<PlanTag, { label: string; emoji: string }> = {
  "no-gym": { label: "No gym", emoji: "🏠" },
  "seated-friendly": { label: "Seated-friendly", emoji: "🪑" },
  budget: { label: "Budget", emoji: "💵" },
  "lower-salt": { label: "Lower salt", emoji: "🧂" },
  caribbean: { label: "Caribbean", emoji: "🌴" },
  beginner: { label: "Beginner", emoji: "🌱" },
  weight: { label: "Weight goal", emoji: "🎯" },
  "blood-pressure": { label: "Blood pressure", emoji: "🫀" },
};

export const MEAL_SLOT_LABEL: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};
