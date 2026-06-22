/** Numbers Tracker types. Local-first now; maps to `health_logs` when synced. */

export type Metric = "a1c" | "bp" | "cholesterol" | "weight";

export interface Reading {
  id: string;
  metric: Metric;
  /** ISO date, yyyy-mm-dd (the day the reading is for). */
  date: string;
  /**
   * weight: { value }  (+ unit on the reading)
   * bp: { systolic, diastolic }
   * cholesterol: { total, ldl, hdl, trig? }
   */
  values: Record<string, number>;
  unit?: string; // weight only: 'lb' | 'kg'
  createdAt: string;
}

export interface WeightGoal {
  targetWeight: number;
  unit: string; // 'lb' | 'kg'
  startWeight?: number;
  startDate: string;
}

// Ordered to lead with the "ABCs of Life" — A1C, Blood pressure, Cholesterol —
// then weight. Tab order follows this object's key order.
export const METRIC_META: Record<
  Metric,
  { label: string; short: string; emoji: string }
> = {
  a1c: { label: "Blood sugar (A1C)", short: "A1C", emoji: "🍬" },
  bp: { label: "Blood pressure", short: "BP", emoji: "🫀" },
  cholesterol: { label: "Cholesterol", short: "Cholesterol", emoji: "🩸" },
  weight: { label: "Weight", short: "Weight", emoji: "⚖️" },
};
