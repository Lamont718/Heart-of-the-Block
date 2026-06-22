import type { Nutrition, ScoreResult, ScoreReason } from "./types";

/**
 * Heart-health scoring — OUR logic layer (SPEC §3a), never handed to the
 * database. We score on specific, heart-relevant factors per serving and
 * explain the WHY in plain language. We do NOT stamp a single "healthy /
 * unhealthy" verdict — that can be wrong and brushes the medical-advice line.
 *
 * Thresholds are guided by FDA "low/high" reference points (per serving), kept
 * deliberately simple and non-clinical:
 *   saturated fat — low ≤1.5g, high >5g
 *   sodium        — low ≤140mg, high >400mg
 *   sugar         — low ≤5g, high >15g   (OFF rarely separates added sugar; we
 *                    use total sugars and say "sugar")
 *   fiber         — good ≥5g, low <2.5g  (a positive factor)
 *   trans fat     — any amount is always flagged
 */

type Lvl = "good" | "okay" | "limit";

const satFatLevel = (g: number): Lvl => (g <= 1.5 ? "good" : g <= 5 ? "okay" : "limit");
const sodiumLevel = (mg: number): Lvl => (mg <= 140 ? "good" : mg <= 400 ? "okay" : "limit");
const sugarLevel = (g: number): Lvl => (g <= 5 ? "good" : g <= 15 ? "okay" : "limit");
const fiberLevel = (g: number): "good" | "okay" | "low" =>
  g >= 5 ? "good" : g >= 2.5 ? "okay" : "low";

// A single factor this extreme is enough to land at "limit" on its own.
const SEVERE = { satFat: 8, sodium: 600, sugar: 22 };

export function scoreNutrition(n: Nutrition): ScoreResult {
  const reasons: ScoreReason[] = [];
  const warns: ScoreReason[] = [];
  const goods: ScoreReason[] = [];

  let limitCount = 0;
  let okayCount = 0;
  let severe = false;
  let haveAny = false;

  if (n.satFatG != null) {
    haveAny = true;
    const l = satFatLevel(n.satFatG);
    if (l === "limit") {
      limitCount++;
      warns.push({ text: "High in saturated fat", tone: "warn" });
      if (n.satFatG >= SEVERE.satFat) severe = true;
    } else if (l === "okay") {
      okayCount++;
    } else {
      goods.push({ text: "Low in saturated fat", tone: "good" });
    }
  }

  if (n.sodiumMg != null) {
    haveAny = true;
    const l = sodiumLevel(n.sodiumMg);
    if (l === "limit") {
      limitCount++;
      warns.push({ text: "High in sodium (salt)", tone: "warn" });
      if (n.sodiumMg >= SEVERE.sodium) severe = true;
    } else if (l === "okay") {
      okayCount++;
    } else {
      goods.push({ text: "Low in sodium", tone: "good" });
    }
  }

  if (n.sugarG != null) {
    haveAny = true;
    const l = sugarLevel(n.sugarG);
    if (l === "limit") {
      limitCount++;
      warns.push({ text: "High in sugar", tone: "warn" });
      if (n.sugarG >= SEVERE.sugar) severe = true;
    } else if (l === "okay") {
      okayCount++;
    } else {
      goods.push({ text: "Low in sugar", tone: "good" });
    }
  }

  if (n.fiberG != null) {
    haveAny = true;
    const l = fiberLevel(n.fiberG);
    if (l === "good") goods.push({ text: "Good source of fiber", tone: "good" });
    else if (l === "low")
      warns.push({ text: "Low in fiber", tone: "warn" });
  }

  // Trans fat: always flagged, always pushes toward "limit".
  const hasTransFat = n.transFatG != null && n.transFatG > 0;
  if (hasTransFat) {
    haveAny = true;
    warns.unshift({ text: "Contains trans fat — best to avoid", tone: "warn" });
  }

  if (!haveAny) {
    return { level: null, reasons: [] };
  }

  let level: Lvl;
  if (hasTransFat || limitCount >= 2 || severe) level = "limit";
  else if (limitCount === 1 || okayCount >= 2) level = "okay";
  else level = "good";

  // Assemble up to ~4 reasons: warnings first, then a positive or two.
  reasons.push(...warns.slice(0, 3));
  reasons.push(...goods.slice(0, reasons.length >= 3 ? 1 : 2));
  if (reasons.length === 0 && goods.length) reasons.push(...goods.slice(0, 2));

  return { level, reasons };
}
