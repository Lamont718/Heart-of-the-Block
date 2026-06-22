import type { Swap } from "@/lib/swaps/types";

export type ScoreLevel = "good" | "okay" | "limit";

/** Per-serving (or per-100g) heart-relevant nutrition, normalized from OFF. */
export interface Nutrition {
  satFatG: number | null;
  sodiumMg: number | null;
  sugarG: number | null;
  fiberG: number | null;
  transFatG: number | null;
  /** Whether the numbers are per serving or per 100g. */
  basis: "serving" | "100g";
  servingSize?: string | null;
}

export interface ScoreReason {
  text: string;
  tone: "good" | "warn";
}

export interface ScoreResult {
  /** null when we have a product but no usable nutrition data. */
  level: ScoreLevel | null;
  reasons: ScoreReason[];
}

export interface ScannedProduct {
  barcode: string;
  name: string;
  brand: string | null;
  imageUrl: string | null;
  nutrition: Nutrition;
  score: ScoreResult;
}

export interface ScanResponse {
  found: boolean;
  product?: ScannedProduct;
  suggestedSwap?: Swap | null;
}

export const SCORE_META: Record<
  ScoreLevel,
  { label: string; blurb: string }
> = {
  good: { label: "Good choice", blurb: "Easy on the heart by the numbers." },
  okay: { label: "Okay", blurb: "Fine sometimes — check the why below." },
  limit: { label: "Best to limit", blurb: "Worth saving for now and then." },
};
