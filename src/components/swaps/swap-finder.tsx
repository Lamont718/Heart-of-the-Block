"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SWAP_CATEGORY_META,
  type Swap,
  type SwapCategory,
} from "@/lib/swaps/types";
import { matchSwaps } from "@/lib/swaps/match";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  loadSavedSwaps,
  migrateLocalSavedSwaps,
  setSwapSaved,
} from "@/lib/swaps/saved";
import { SwapCard } from "./swap-card";

const QUICK_PICKS = [
  "oxtail",
  "fried chicken",
  "white rice",
  "mac and cheese",
  "soda",
  "salt",
  "fried plantain",
  "sweet tea",
];

export function SwapFinder({
  swaps,
  signedIn,
}: {
  swaps: Swap[];
  signedIn: boolean;
}) {
  const remote = signedIn && isSupabaseConfigured;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SwapCategory | "all">("all");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (remote) await migrateLocalSavedSwaps();
        const ids = await loadSavedSwaps(remote);
        if (active) setSavedIds(new Set(ids));
      } catch {
        /* leave empty — cards just show unsaved */
      }
    })();
    return () => {
      active = false;
    };
  }, [remote]);

  async function toggleSave(id: string) {
    const willSave = !savedIds.has(id);
    // Optimistic: flip immediately, revert if the write fails.
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (willSave) next.add(id);
      else next.delete(id);
      return next;
    });
    try {
      await setSwapSaved(id, willSave, remote);
    } catch {
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (willSave) next.delete(id);
        else next.add(id);
        return next;
      });
    }
  }

  const results = useMemo(() => {
    if (query.trim()) return matchSwaps(swaps, query);
    if (category !== "all")
      return swaps.filter((s) => s.category === category);
    return swaps;
  }, [swaps, query, category]);

  const searching = query.trim().length > 0;
  const categories = Object.keys(SWAP_CATEGORY_META) as SwapCategory[];

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
          🔎
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you eat? e.g. oxtail, fried chicken, soda…"
          aria-label="Search foods to swap"
          className="field pl-11 text-lg"
        />
      </div>

      {/* Quick picks */}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_PICKS.map((p) => (
          <button
            key={p}
            onClick={() => setQuery(p)}
            className="pill border border-line bg-surface text-ink transition hover:bg-brick-100 hover:text-brick-700"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Category filter (only when browsing, not searching) */}
      {!searching && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={`pill shrink-0 border transition ${
              category === "all"
                ? "border-brick bg-brick text-white"
                : "border-line bg-surface text-ink hover:bg-cream"
            }`}
          >
            All foods
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`pill shrink-0 whitespace-nowrap border transition ${
                category === c
                  ? "border-brick bg-brick text-white"
                  : "border-line bg-surface text-ink hover:bg-cream"
              }`}
            >
              {SWAP_CATEGORY_META[c].emoji} {SWAP_CATEGORY_META[c].label}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="mt-5">
        {searching && (
          <p className="mb-3 text-sm font-semibold text-muted" aria-live="polite">
            {results.length > 0
              ? `${results.length} swap${results.length === 1 ? "" : "s"} for “${query}”`
              : `No swaps for “${query}” yet`}
          </p>
        )}

        {results.length === 0 ? (
          <div className="card text-center">
            <p className="text-ink">
              We don’t have that one yet — try a simpler word (like “chicken” or
              “rice”), or tap a suggestion above.
            </p>
            <p className="mt-2 text-sm text-muted">
              Know a swap we’re missing? It’ll be easy to add more soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => (
              <SwapCard
                key={s.id}
                swap={s}
                saved={savedIds.has(s.id)}
                onToggleSave={() => toggleSave(s.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
