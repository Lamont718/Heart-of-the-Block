/**
 * Heart-risk check — a *risk-factor awareness* assessment, deliberately NOT a
 * clinical 10-year risk score or a diagnosis. It mirrors the rest of the
 * platform's stance (the scanner avoids "healthy/unhealthy" verdicts): we flag
 * each factor against a plain-language guidepost and always point back to a
 * conversation with a doctor. Thresholds match the ABCs of Life page.
 *
 * Pure logic, no React — easy to reason about and reuse.
 */

export type Level = "good" | "watch" | "talk" | "unknown";

export interface HeartRiskInput {
  // Numbers (pre-filled from the tracker when available).
  systolic?: number;
  diastolic?: number;
  bpUnknown?: boolean;
  totalChol?: number;
  ldl?: number;
  cholUnknown?: boolean;
  a1c?: number;
  a1cUnknown?: boolean;
  // Habits & history.
  smokes?: "yes" | "no";
  active?: "yes" | "no";
  familyHistory?: "yes" | "no" | "unsure";
  age?: "under40" | "40to59" | "60plus";
}

export interface FactorResult {
  key: string;
  label: string;
  emoji: string;
  level: Level;
  headline: string;
  message: string;
}

export interface HeartRiskResult {
  factors: FactorResult[];
  talkCount: number;
  watchCount: number;
  unknownCount: number;
  allGood: boolean;
}

function bp(input: HeartRiskInput): FactorResult {
  const base = { key: "bp", label: "Blood pressure", emoji: "🫀" };
  const { systolic: s, diastolic: d, bpUnknown } = input;
  if (bpUnknown || !s || !d) {
    return {
      ...base,
      level: "unknown",
      headline: "Not sure",
      message:
        "Worth getting checked — it's quick and free at the spots on Get Screened. High blood pressure usually has no symptoms.",
    };
  }
  const headline = `${s}/${d}`;
  if (s >= 180 || d >= 120) {
    return {
      ...base,
      level: "talk",
      headline,
      message:
        "That's very high. Call your doctor soon — and if you feel chest pain, trouble breathing, or weakness, call 911.",
    };
  }
  if (s >= 130 || d >= 80) {
    return {
      ...base,
      level: "talk",
      headline,
      message:
        "Above the under-130/80 guidepost. Bring this to your doctor — it's very manageable once you know.",
    };
  }
  if (s >= 120) {
    return {
      ...base,
      level: "watch",
      headline,
      message:
        "A little above ideal (called “elevated”). A good one to keep an eye on in the tracker.",
    };
  }
  return {
    ...base,
    level: "good",
    headline,
    message: "Right in the healthy range. Keep doing what you're doing.",
  };
}

function cholesterol(input: HeartRiskInput): FactorResult {
  const base = { key: "cholesterol", label: "Cholesterol", emoji: "🩸" };
  const { totalChol: t, ldl, cholUnknown } = input;
  if (cholUnknown || (!t && !ldl)) {
    return {
      ...base,
      level: "unknown",
      headline: "Not sure",
      message:
        "A simple blood test tells you. Ask your doctor or check the free screenings on Get Screened.",
    };
  }
  const headline = t ? `Total ${t}${ldl ? ` · LDL ${ldl}` : ""}` : `LDL ${ldl}`;
  if ((t && t >= 240) || (ldl && ldl >= 160)) {
    return {
      ...base,
      level: "talk",
      headline,
      message:
        "Higher than the guidepost. Worth a conversation with your doctor about diet and next steps.",
    };
  }
  if ((t && t >= 200) || (ldl && ldl >= 130)) {
    return {
      ...base,
      level: "watch",
      headline,
      message:
        "A bit above ideal. Small swaps add up — the Food Swap Finder is built for exactly this.",
    };
  }
  return {
    ...base,
    level: "good",
    headline,
    message: "Looking good. Keep those numbers where they are.",
  };
}

function bloodSugar(input: HeartRiskInput): FactorResult {
  const base = { key: "a1c", label: "Blood sugar (A1C)", emoji: "🍬" };
  const { a1c, a1cUnknown } = input;
  if (a1cUnknown || !a1c) {
    return {
      ...base,
      level: "unknown",
      headline: "Not sure",
      message:
        "Your A1C is the “A” in the ABCs of Life. A quick blood test gives you the number — see Get Screened.",
    };
  }
  const headline = `${a1c}%`;
  if (a1c >= 6.5) {
    return {
      ...base,
      level: "talk",
      headline,
      message:
        "In the range doctors watch closely. Bring it to your doctor — caught early, there's a lot you can do.",
    };
  }
  if (a1c >= 5.7) {
    return {
      ...base,
      level: "watch",
      headline,
      message:
        "Slightly raised (the “prediabetes” range). Often turned around with food and movement — talk it over with your doctor.",
    };
  }
  return {
    ...base,
    level: "good",
    headline,
    message: "In the healthy range. Nice.",
  };
}

function smoking(input: HeartRiskInput): FactorResult {
  const base = { key: "smoking", label: "Smoking or vaping", emoji: "🚭" };
  if (input.smokes === "yes") {
    return {
      ...base,
      level: "talk",
      headline: "Yes",
      message:
        "Quitting is the single biggest thing you can do for your heart. You don't have to do it alone — free help in NY: call 866-NY-QUITS.",
    };
  }
  return {
    ...base,
    level: "good",
    headline: "No",
    message: "Smoke-free is one of the best gifts you give your heart.",
  };
}

function activity(input: HeartRiskInput): FactorResult {
  const base = { key: "activity", label: "Movement", emoji: "👟" };
  if (input.active === "no") {
    return {
      ...base,
      level: "watch",
      headline: "Not most days",
      message:
        "Moving most days protects your heart — even a daily walk counts. The Guided Plans have easy, seated-friendly options.",
    };
  }
  return {
    ...base,
    level: "good",
    headline: "Most days",
    message: "Keep it going — your heart loves the routine.",
  };
}

function family(input: HeartRiskInput): FactorResult {
  const base = { key: "family", label: "Family history", emoji: "👪" };
  if (input.familyHistory === "yes") {
    return {
      ...base,
      level: "talk",
      headline: "Yes",
      message:
        "Tell your doctor — early heart disease or stroke in the family means your own numbers matter even more.",
    };
  }
  if (input.familyHistory === "unsure") {
    return {
      ...base,
      level: "watch",
      headline: "Not sure",
      message:
        "Worth asking your relatives. Knowing your family's history helps your doctor look out for you.",
    };
  }
  return {
    ...base,
    level: "good",
    headline: "No",
    message: "Good to know — one less thing to worry about.",
  };
}

export function assessHeartRisk(input: HeartRiskInput): HeartRiskResult {
  const factors = [
    bp(input),
    cholesterol(input),
    bloodSugar(input),
    smoking(input),
    activity(input),
    family(input),
  ];
  const talkCount = factors.filter((f) => f.level === "talk").length;
  const watchCount = factors.filter((f) => f.level === "watch").length;
  const unknownCount = factors.filter((f) => f.level === "unknown").length;
  return {
    factors,
    talkCount,
    watchCount,
    unknownCount,
    allGood: talkCount === 0 && watchCount === 0 && unknownCount === 0,
  };
}
