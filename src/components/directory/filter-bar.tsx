"use client";

import {
  CATEGORY_META,
  type ListingCategory,
} from "@/lib/directory/types";

export type DirectoryFilters = {
  category: ListingCategory | "all";
  openNow: boolean;
  freshProduce: boolean;
  maxDistance: number | null; // miles; null = any
  query: string;
};

const CATEGORIES: (ListingCategory | "all")[] = [
  "all",
  "grocer",
  "market",
  "health_food_store",
  "farmers_market",
];

const DISTANCES: { label: string; value: number | null }[] = [
  { label: "Any distance", value: null },
  { label: "Within 0.5 mi", value: 0.5 },
  { label: "Within 1 mi", value: 1 },
  { label: "Within 2 mi", value: 2 },
  { label: "Within 5 mi", value: 5 },
];

export function FilterBar({
  filters,
  onChange,
  onLocate,
  hasLocation,
  locating,
  resultCount,
}: {
  filters: DirectoryFilters;
  onChange: (next: Partial<DirectoryFilters>) => void;
  onLocate: () => void;
  hasLocation: boolean;
  locating: boolean;
  resultCount: number;
}) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
          🔎
        </span>
        <input
          type="search"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="Search by name, neighborhood, or what’s good there"
          aria-label="Search the directory"
          className="field pl-10"
        />
      </div>

      {/* Category chips */}
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label="Filter by category"
      >
        {CATEGORIES.map((c) => {
          const active = filters.category === c;
          const label = c === "all" ? "All spots" : CATEGORY_META[c].short;
          return (
            <button
              key={c}
              onClick={() => onChange({ category: c })}
              aria-pressed={active}
              className={`pill shrink-0 whitespace-nowrap border transition ${
                active
                  ? "border-brick bg-brick text-white"
                  : "border-line bg-surface text-ink hover:bg-cream"
              }`}
            >
              {c === "all" ? "All spots" : `${CATEGORY_META[c].emoji} ${label}`}
            </button>
          );
        })}
      </div>

      {/* Toggles + distance + locate */}
      <div className="flex flex-wrap items-center gap-2">
        <Toggle
          active={filters.openNow}
          onClick={() => onChange({ openNow: !filters.openNow })}
        >
          Open now
        </Toggle>
        <Toggle
          active={filters.freshProduce}
          onClick={() => onChange({ freshProduce: !filters.freshProduce })}
        >
          Has fresh produce
        </Toggle>

        <select
          value={filters.maxDistance ?? ""}
          onChange={(e) =>
            onChange({
              maxDistance: e.target.value ? Number(e.target.value) : null,
            })
          }
          disabled={!hasLocation}
          aria-label="Maximum distance"
          className="min-h-[40px] rounded-full border border-line bg-surface px-3 text-sm font-semibold text-ink disabled:opacity-50"
          title={hasLocation ? "" : "Share your location to filter by distance"}
        >
          {DISTANCES.map((d) => (
            <option key={d.label} value={d.value ?? ""}>
              {d.label}
            </option>
          ))}
        </select>

        <button
          onClick={onLocate}
          className={`pill shrink-0 border transition ${
            hasLocation
              ? "border-teal bg-teal-100 text-teal"
              : "border-line bg-surface text-ink hover:bg-cream"
          }`}
        >
          {locating ? "Locating…" : hasLocation ? "📍 Near me ✓" : "📍 Near me"}
        </button>
      </div>

      <p className="text-sm font-semibold text-muted" aria-live="polite">
        {resultCount} {resultCount === 1 ? "place" : "places"}
      </p>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`pill shrink-0 border transition ${
        active
          ? "border-brick bg-brick text-white"
          : "border-line bg-surface text-ink hover:bg-cream"
      }`}
    >
      {children}
    </button>
  );
}
