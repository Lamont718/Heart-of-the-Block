"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { getReadings } from "@/lib/tracker/storage";
import {
  type FactorResult,
  type HeartRiskInput,
  type Level,
  assessHeartRisk,
} from "@/lib/heart-risk/assess";

const LEVEL_STYLE: Record<Level, { pill: string; dot: string; word: string }> =
  {
    good: { pill: "bg-teal-100 text-teal", dot: "bg-teal", word: "Looking good" },
    watch: { pill: "bg-gold-100 text-ink", dot: "bg-gold", word: "Keep an eye on it" },
    talk: {
      pill: "bg-brick-100 text-brick-700",
      dot: "bg-brick",
      word: "Talk to your doctor",
    },
    unknown: {
      pill: "bg-cream text-muted",
      dot: "bg-line",
      word: "Worth finding out",
    },
  };

type YesNo = "yes" | "no" | "";

export function HeartRiskCheck() {
  // Numbers — pre-filled from the tracker (local) when the person has logged any.
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [bpUnknown, setBpUnknown] = useState(false);
  const [totalChol, setTotalChol] = useState("");
  const [ldl, setLdl] = useState("");
  const [cholUnknown, setCholUnknown] = useState(false);
  const [a1c, setA1c] = useState("");
  const [a1cUnknown, setA1cUnknown] = useState(false);

  // Habits & history.
  const [smokes, setSmokes] = useState<YesNo>("");
  const [active, setActive] = useState<YesNo>("");
  const [familyHistory, setFamilyHistory] = useState<"yes" | "no" | "unsure" | "">("");

  const [prefilled, setPrefilled] = useState<string[]>([]);
  const [result, setResult] = useState<ReturnType<typeof assessHeartRisk> | null>(
    null,
  );

  // Best-effort pre-fill from locally tracked numbers (latest of each).
  useEffect(() => {
    const filled: string[] = [];
    const latest = (m: Parameters<typeof getReadings>[0]) => {
      const rs = getReadings(m);
      return rs.length ? rs[rs.length - 1] : null;
    };
    const bp = latest("bp");
    if (bp?.values.systolic && bp.values.diastolic) {
      setSystolic(String(bp.values.systolic));
      setDiastolic(String(bp.values.diastolic));
      filled.push("blood pressure");
    }
    const chol = latest("cholesterol");
    if (chol?.values.total) {
      setTotalChol(String(chol.values.total));
      if (chol.values.ldl) setLdl(String(chol.values.ldl));
      filled.push("cholesterol");
    }
    const sugar = latest("a1c");
    if (sugar?.values.value) {
      setA1c(String(sugar.values.value));
      filled.push("A1C");
    }
    setPrefilled(filled);
  }, []);

  function run(e: React.FormEvent) {
    e.preventDefault();
    const n = (v: string) => (v.trim() === "" ? undefined : Number(v));
    const input: HeartRiskInput = {
      systolic: n(systolic),
      diastolic: n(diastolic),
      bpUnknown,
      totalChol: n(totalChol),
      ldl: n(ldl),
      cholUnknown,
      a1c: n(a1c),
      a1cUnknown,
      smokes: smokes || undefined,
      active: active || undefined,
      familyHistory: familyHistory || undefined,
    };
    setResult(assessHeartRisk(input));
    // Scroll the result into view on mobile.
    requestAnimationFrame(() => {
      document
        .getElementById("heart-risk-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* ---------------------------- The form ---------------------------- */}
      <form onSubmit={run} className="space-y-5">
        {prefilled.length > 0 && (
          <p className="rounded-xl bg-teal-100 p-3 text-sm font-semibold text-teal">
            ✓ We filled in your {listJoin(prefilled)} from your tracker. Change
            anything that&apos;s out of date.
          </p>
        )}

        {/* Blood pressure */}
        <fieldset className="card space-y-3">
          <legend className="font-display text-lg font-bold text-ink">
            🫀 Blood pressure
          </legend>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label htmlFor="hr-sys" className="label">
                Top (systolic)
              </label>
              <input
                id="hr-sys"
                inputMode="numeric"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                disabled={bpUnknown}
                className="field"
                placeholder="120"
              />
            </div>
            <span className="pb-3 text-xl text-muted">/</span>
            <div className="flex-1">
              <label htmlFor="hr-dia" className="label">
                Bottom (diastolic)
              </label>
              <input
                id="hr-dia"
                inputMode="numeric"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                disabled={bpUnknown}
                className="field"
                placeholder="80"
              />
            </div>
          </div>
          <DontKnow checked={bpUnknown} onChange={setBpUnknown} />
        </fieldset>

        {/* Cholesterol */}
        <fieldset className="card space-y-3">
          <legend className="font-display text-lg font-bold text-ink">
            🩸 Cholesterol
          </legend>
          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="hr-total" className="label">
                Total
              </label>
              <input
                id="hr-total"
                inputMode="numeric"
                value={totalChol}
                onChange={(e) => setTotalChol(e.target.value)}
                disabled={cholUnknown}
                className="field"
                placeholder="190"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="hr-ldl" className="label">
                LDL (optional)
              </label>
              <input
                id="hr-ldl"
                inputMode="numeric"
                value={ldl}
                onChange={(e) => setLdl(e.target.value)}
                disabled={cholUnknown}
                className="field"
                placeholder="100"
              />
            </div>
          </div>
          <DontKnow checked={cholUnknown} onChange={setCholUnknown} />
        </fieldset>

        {/* Blood sugar */}
        <fieldset className="card space-y-3">
          <legend className="font-display text-lg font-bold text-ink">
            🍬 Blood sugar (A1C)
          </legend>
          <div>
            <label htmlFor="hr-a1c" className="label">
              A1C (%)
            </label>
            <input
              id="hr-a1c"
              inputMode="decimal"
              value={a1c}
              onChange={(e) => setA1c(e.target.value)}
              disabled={a1cUnknown}
              className="field"
              placeholder="5.6"
            />
          </div>
          <DontKnow checked={a1cUnknown} onChange={setA1cUnknown} />
        </fieldset>

        {/* Habits & history */}
        <fieldset className="card space-y-4">
          <legend className="font-display text-lg font-bold text-ink">
            A few more
          </legend>
          <Choice
            label="Do you smoke or vape?"
            value={smokes}
            onChange={(v) => setSmokes(v as YesNo)}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
          />
          <Choice
            label="Do you move your body most days? (a walk counts)"
            value={active}
            onChange={(v) => setActive(v as YesNo)}
            options={[
              { value: "yes", label: "Most days" },
              { value: "no", label: "Not really" },
            ]}
          />
          <Choice
            label="Heart disease or stroke in your family before 60?"
            value={familyHistory}
            onChange={(v) => setFamilyHistory(v as "yes" | "no" | "unsure")}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
              { value: "unsure", label: "Not sure" },
            ]}
          />
        </fieldset>

        <button type="submit" className="btn-primary w-full">
          See where I stand
        </button>
      </form>

      {/* ---------------------------- The result ---------------------------- */}
      <div
        id="heart-risk-result"
        aria-live="polite"
        className="space-y-4 scroll-mt-24"
      >
        {!result ? (
          <div className="card flex h-full min-h-[200px] flex-col items-center justify-center text-center text-muted">
            <span className="text-4xl" aria-hidden>
              ❤️
            </span>
            <p className="mt-3 max-w-xs">
              Fill in what you know — even partly — and tap{" "}
              <strong>See where I stand</strong>. Your answers stay on this
              device.
            </p>
          </div>
        ) : (
          <Result result={result} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Result ------------------------------- */

function Result({ result }: { result: ReturnType<typeof assessHeartRisk> }) {
  const { factors, talkCount, watchCount, unknownCount, allGood } = result;

  const headline = allGood
    ? "Everything you shared lines up with the guideposts 🎉"
    : talkCount > 0
      ? `${talkCount} thing${talkCount > 1 ? "s" : ""} worth bringing to your doctor`
      : "A couple of things to keep an eye on";

  const sub = allGood
    ? "Beautiful work — keep doing what you're doing, and keep your numbers fresh in the tracker."
    : [
        talkCount > 0 &&
          `${talkCount} to talk over with your doctor`,
        watchCount > 0 && `${watchCount} to keep an eye on`,
        unknownCount > 0 && `${unknownCount} worth finding out`,
      ]
        .filter(Boolean)
        .join(" · ");

  return (
    <>
      <div className="card bg-brick text-white">
        <p className="text-sm font-semibold text-white/80">Where you stand</p>
        <p className="mt-1 font-display text-2xl font-extrabold">{headline}</p>
        <p className="mt-2 text-sm text-white/90">{sub}</p>
      </div>

      <ul className="space-y-3">
        {factors.map((f) => (
          <FactorCard key={f.key} factor={f} />
        ))}
      </ul>

      {/* Next steps */}
      <div className="card space-y-3">
        <h2 className="font-display text-lg font-bold text-ink">Next steps</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Link href="/tracker" className="btn-secondary w-full">
            📈 Track your numbers
          </Link>
          <Link href="/get-screened" className="btn-secondary w-full">
            🩺 Get screened
          </Link>
          <Link href="/swaps" className="btn-secondary w-full">
            🔎 Find food swaps
          </Link>
          <Link href="/plans" className="btn-secondary w-full">
            👟 Guided plans
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
        <p>
          <span aria-hidden>💛 </span>
          This is a check-in to help you know your numbers — <strong>not a
          diagnosis</strong>. Only your doctor can tell you what these mean for
          you. In an emergency, call <strong>911</strong>.
        </p>
      </div>
    </>
  );
}

function FactorCard({ factor }: { factor: FactorResult }) {
  const s = LEVEL_STYLE[factor.level];
  return (
    <li className="card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-xl">
            {factor.emoji}
          </span>
          <div>
            <p className="font-semibold text-ink">{factor.label}</p>
            <p className="text-sm text-muted">{factor.headline}</p>
          </div>
        </div>
        <span className={`pill shrink-0 whitespace-nowrap text-xs ${s.pill}`}>
          {s.word}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">{factor.message}</p>
    </li>
  );
}

/* ------------------------------- Inputs ------------------------------- */

function DontKnow({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-muted">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-line text-brick focus:ring-brick"
      />
      I don&apos;t know this number
    </label>
  );
}

function Choice({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId}>
      <p id={labelId} className="label">
        {label}
      </p>
      <div className="mt-1 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`pill border transition ${
              value === o.value
                ? "border-brick bg-brick text-white"
                : "border-line bg-surface text-ink hover:bg-cream"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function listJoin(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
