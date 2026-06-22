"use client";

import {
  SCORE_META,
  type ScanResponse,
  type ScoreLevel,
} from "@/lib/scanner/types";
import { SwapCard } from "@/components/swaps/swap-card";

const LEVEL_STYLES: Record<ScoreLevel, string> = {
  good: "bg-teal-100 text-teal border-teal/30",
  okay: "bg-gold-100 text-ink border-gold/40",
  limit: "bg-brick-100 text-brick-700 border-brick/30",
};

export function ScanResult({
  data,
  saved,
  onSave,
  onScanAnother,
}: {
  data: ScanResponse;
  saved: boolean;
  onSave: () => void;
  onScanAnother: () => void;
}) {
  const p = data.product!;
  const n = p.nutrition;
  const level = p.score.level;
  const basisLabel = n.basis === "serving" ? `per serving${n.servingSize ? ` (${n.servingSize})` : ""}` : "per 100g";

  const chips: { label: string; value: string }[] = [];
  if (n.satFatG != null) chips.push({ label: "Saturated fat", value: `${round(n.satFatG)} g` });
  if (n.sodiumMg != null) chips.push({ label: "Sodium", value: `${Math.round(n.sodiumMg)} mg` });
  if (n.sugarG != null) chips.push({ label: "Sugar", value: `${round(n.sugarG)} g` });
  if (n.fiberG != null) chips.push({ label: "Fiber", value: `${round(n.fiberG)} g` });
  if (n.transFatG != null && n.transFatG > 0)
    chips.push({ label: "Trans fat", value: `${round(n.transFatG)} g` });

  return (
    <div className="space-y-5">
      <div className="card">
        <div className="flex items-start gap-4">
          {p.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.imageUrl}
              alt=""
              className="h-20 w-20 rounded-xl border border-line object-contain"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-xl bg-cream text-2xl">
              🛒
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-bold text-ink">{p.name}</h2>
            {p.brand && <p className="text-sm text-muted">{p.brand}</p>}
            <button
              onClick={onSave}
              aria-pressed={saved}
              className={`mt-2 text-sm font-semibold ${saved ? "text-brick" : "text-brick-700 hover:underline"}`}
            >
              {saved ? "♥ Saved" : "♡ Save this scan"}
            </button>
          </div>
        </div>

        {/* Score */}
        {level ? (
          <div className={`mt-4 rounded-xl border p-4 ${LEVEL_STYLES[level]}`}>
            <p className="font-display text-lg font-extrabold">
              {dot(level)} {SCORE_META[level].label}
            </p>
            <p className="text-sm">{SCORE_META[level].blurb}</p>
            {p.score.reasons.length > 0 && (
              <ul className="mt-3 space-y-1">
                {p.score.reasons.map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span aria-hidden>{r.tone === "good" ? "✓" : "•"}</span>
                    {r.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-line bg-cream p-4 text-sm text-muted">
            We found this product but don’t have its nutrition details yet, so we
            can’t give it a read. You can add them on Open Food Facts to help the
            next person.
          </div>
        )}

        {/* Nutrition chips */}
        {chips.length > 0 && (
          <>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
              The numbers · {basisLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c.label} className="pill bg-cream text-sm text-ink">
                  {c.label}: <strong className="ml-1">{c.value}</strong>
                </span>
              ))}
            </div>
          </>
        )}

        <p className="mt-4 text-xs text-muted">
          A guide based on the label — not a diagnosis. What’s right for you is a
          conversation with your doctor.
        </p>
      </div>

      {/* The magic loop: a better swap */}
      {data.suggestedSwap && (
        <div>
          <h3 className="mb-2 font-display text-lg font-bold text-ink">
            Try this instead
          </h3>
          <SwapCard swap={data.suggestedSwap} />
        </div>
      )}

      <button onClick={onScanAnother} className="btn-primary w-full">
        Scan another
      </button>
    </div>
  );
}

function round(v: number): string {
  return (Math.round(v * 10) / 10).toString();
}
function dot(level: ScoreLevel): string {
  return level === "good" ? "●" : level === "okay" ? "◐" : "○";
}
