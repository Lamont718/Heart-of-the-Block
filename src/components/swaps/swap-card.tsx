"use client";

import { useState } from "react";
import { SWAP_CATEGORY_META, type Swap } from "@/lib/swaps/types";

export function SwapCard({
  swap,
  saved = false,
  onToggleSave,
}: {
  swap: Swap;
  /** Omit save props (e.g. the scanner's suggested swap) to hide the heart. */
  saved?: boolean;
  onToggleSave?: () => void;
}) {
  const cat = SWAP_CATEGORY_META[swap.category];
  const [shared, setShared] = useState<"" | "copied" | "shared">("");

  async function share() {
    const text = `Heart-smart swap: instead of ${swap.original_food}, try ${swap.swap_food}. Why: ${swap.reason}`;
    const shareData = {
      title: "Heart of the Block — food swap",
      text,
      url: "https://heartoftheblock.org/swaps",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShared("shared");
      } else {
        await navigator.clipboard.writeText(`${text}\n— Heart of the Block`);
        setShared("copied");
      }
    } catch {
      /* user cancelled or blocked */
    }
    if (shared !== "shared") setTimeout(() => setShared(""), 2500);
  }

  return (
    <article className="card flex flex-col">
      <div className="flex items-center justify-between">
        <span className="pill bg-cream text-muted">
          {cat.emoji} {cat.label}
        </span>
        {onToggleSave && (
          <button
            onClick={onToggleSave}
            aria-pressed={saved}
            aria-label={saved ? "Saved" : "Save this swap"}
            className={`text-xl leading-none transition ${
              saved ? "text-brick" : "text-muted hover:text-brick"
            }`}
            title={saved ? "Saved" : "Save"}
          >
            {saved ? "♥" : "♡"}
          </button>
        )}
      </div>

      {/* instead of → try */}
      <div className="mt-4 flex items-start gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Instead of
          </p>
          <p className="font-display text-base font-bold text-ink">
            {swap.original_food}
          </p>
        </div>
        <div className="mt-5 text-brick" aria-hidden>
          →
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">
            Try
          </p>
          <p className="font-display text-base font-bold text-ink">
            {swap.swap_food}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-gold-100/70 p-3">
        <p className="text-sm text-ink">
          <span className="font-semibold">Why it loves you back: </span>
          {swap.reason}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {swap.cultural_tags.slice(0, 3).map((t) => (
            <span key={t} className="pill bg-cream text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={share}
          className="text-sm font-semibold text-brick-700 hover:underline"
        >
          {shared === "copied"
            ? "Copied ✓"
            : shared === "shared"
              ? "Shared ✓"
              : "Share"}
        </button>
      </div>
    </article>
  );
}
