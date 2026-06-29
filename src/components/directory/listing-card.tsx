"use client";

import {
  CATEGORY_META,
  FRESH_PRODUCE_TAG,
  type DirectoryListing,
} from "@/lib/directory/types";
import { getOpenState } from "@/lib/directory/hours";
import { formatMiles } from "@/lib/directory/distance";

const TAG_LABELS: Record<string, string> = {
  "fresh-produce": "Fresh produce",
  caribbean: "Caribbean",
  halal: "Halal",
  "ebt-snap": "EBT / SNAP",
  bulk: "Bulk",
  organic: "Organic",
  affordable: "Affordable",
  seasonal: "Seasonal",
  "local-farms": "Local farms",
  "black-owned": "Black-owned",
  "soul-food": "Soul food",
  asian: "Asian",
  jamaican: "Jamaican",
  "produce-specialist": "Produce specialist",
};

export function ListingCard({
  listing,
  now,
  distanceMi,
  selected,
  onSelect,
}: {
  listing: DirectoryListing;
  now: Date | null;
  distanceMi: number | null;
  selected: boolean;
  onSelect: () => void;
}) {
  const cat = CATEGORY_META[listing.category];
  const open = now ? getOpenState(listing.hours, now) : null;
  const directionsHref =
    listing.lat != null && listing.lng != null
      ? `https://www.google.com/maps/dir/?api=1&destination=${listing.lat},${listing.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          listing.name + " " + listing.address,
        )}`;

  return (
    <article
      id={`listing-${listing.id}`}
      className={`card scroll-mt-4 cursor-pointer p-4 transition ${
        selected
          ? "border-brick ring-2 ring-brick"
          : "hover:-translate-y-0.5 hover:shadow-lift"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="pill bg-cream text-ink">
              <span aria-hidden>{cat.emoji} </span>
              {cat.label}
            </span>
            {!listing.verified && (
              <span
                className="pill bg-gold-100 text-ink"
                title="Hours/details still being confirmed"
              >
                To confirm
              </span>
            )}
          </div>
          {/* The name is a real button so keyboard & screen-reader users can
              select the listing (which highlights it on the map). The whole-card
              onClick above is a pointer-only convenience; onSelect is idempotent
              so the bubbled double-call is harmless. */}
          <h3 className="mt-2 font-display text-lg font-bold text-ink">
            <button
              type="button"
              onClick={onSelect}
              aria-pressed={selected}
              aria-label={`${listing.name} — ${cat.label}. Highlight on the map.`}
              className="block w-full truncate text-left hover:underline focus-visible:underline"
            >
              {listing.name}
            </button>
          </h3>
          <p className="truncate text-sm text-muted">{listing.address}</p>
        </div>
        {distanceMi != null && (
          <span className="shrink-0 rounded-lg bg-teal-100 px-2 py-1 text-xs font-bold text-teal">
            {formatMiles(distanceMi)}
          </span>
        )}
      </div>

      {open && (
        <p className="mt-2 text-sm font-semibold">
          <span className={open.open ? "text-good" : "text-brick-700"}>
            {open.open ? "● Open" : "○ Closed"}
          </span>{" "}
          <span className="font-normal text-muted">· {open.label}</span>
        </p>
      )}

      {listing.highlights && (
        <p className="mt-2 text-sm text-ink">{listing.highlights}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {listing.tags.map((t) => (
          <span
            key={t}
            className={`pill text-xs ${
              t === FRESH_PRODUCE_TAG
                ? "bg-teal-100 text-teal"
                : "bg-cream text-muted"
            }`}
          >
            {TAG_LABELS[t] ?? t}
          </span>
        ))}
      </div>

      <div className="mt-3">
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm font-semibold text-brick-700 hover:underline"
        >
          Get directions →
        </a>
      </div>
    </article>
  );
}
