"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { DirectoryListing } from "@/lib/directory/types";
import { FRESH_PRODUCE_TAG } from "@/lib/directory/types";
import { getOpenState } from "@/lib/directory/hours";
import { milesBetween } from "@/lib/directory/distance";
import { ListingCard } from "./listing-card";
import { FilterBar, type DirectoryFilters } from "./filter-bar";

// Leaflet touches `window`, so the map is client-only (no SSR).
const DirectoryMap = dynamic(() => import("./directory-map"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-cream text-muted">
      Loading map…
    </div>
  ),
});

type LatLng = { lat: number; lng: number };

export function DirectoryExplorer({
  listings,
}: {
  listings: DirectoryListing[];
}) {
  const [filters, setFilters] = useState<DirectoryFilters>({
    category: "all",
    openNow: false,
    freshProduce: false,
    maxDistance: null,
    query: "",
  });
  const [now, setNow] = useState<Date | null>(null);
  const [userLoc, setUserLoc] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  // Compute "now" on the client only, refresh each minute (avoids hydration
  // mismatch and keeps "open now" honest).
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  function updateFilters(next: Partial<DirectoryFilters>) {
    setFilters((f) => ({ ...f, ...next }));
  }

  function locate() {
    if (!("geolocation" in navigator)) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  }

  const withDistance = useMemo(() => {
    return listings.map((l) => {
      const distanceMi =
        userLoc && l.lat != null && l.lng != null
          ? milesBetween(userLoc, { lat: l.lat, lng: l.lng })
          : null;
      return { listing: l, distanceMi };
    });
  }, [listings, userLoc]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const rows = withDistance.filter(({ listing, distanceMi }) => {
      if (filters.category !== "all" && listing.category !== filters.category)
        return false;
      if (filters.freshProduce && !listing.tags.includes(FRESH_PRODUCE_TAG))
        return false;
      if (filters.openNow && now && !getOpenState(listing.hours, now).open)
        return false;
      if (
        filters.maxDistance != null &&
        (distanceMi == null || distanceMi > filters.maxDistance)
      )
        return false;
      if (q) {
        const hay = [
          listing.name,
          listing.address,
          listing.highlights ?? "",
          listing.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    rows.sort((a, b) => {
      if (a.distanceMi != null && b.distanceMi != null)
        return a.distanceMi - b.distanceMi;
      return a.listing.name.localeCompare(b.listing.name);
    });
    return rows;
  }, [withDistance, filters, now]);

  const filteredListings = filtered.map((r) => r.listing);

  function selectListing(id: string) {
    setSelectedId(id);
    // On mobile, jump to the map when a card is tapped.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileView("map");
    }
  }

  function selectFromMap(id: string) {
    setSelectedId(id);
    document
      .getElementById(`listing-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div>
      <FilterBar
        filters={filters}
        onChange={updateFilters}
        onLocate={locate}
        hasLocation={!!userLoc}
        locating={locating}
        resultCount={filtered.length}
      />

      {/* Mobile list/map toggle */}
      <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-cream p-1 lg:hidden">
        {(["list", "map"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setMobileView(v)}
            aria-pressed={mobileView === v}
            className={`min-h-[40px] rounded-lg text-sm font-semibold transition ${
              mobileView === v ? "bg-surface text-ink shadow-card" : "text-muted"
            }`}
          >
            {v === "list" ? "List" : "Map"}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* List */}
        <div
          className={`${mobileView === "list" ? "block" : "hidden"} lg:block`}
        >
          {filtered.length === 0 ? (
            <div className="card text-center text-muted">
              No spots match these filters. Try clearing “open now” or widening
              the distance.
            </div>
          ) : (
            <ul className="grid max-h-[70vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-1">
              {filtered.map(({ listing, distanceMi }) => (
                <li key={listing.id}>
                  <ListingCard
                    listing={listing}
                    now={now}
                    distanceMi={distanceMi}
                    selected={selectedId === listing.id}
                    onSelect={() => selectListing(listing.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Map */}
        <div
          className={`${
            mobileView === "map" ? "block" : "hidden"
          } overflow-hidden rounded-2xl border border-line lg:sticky lg:top-20 lg:block`}
        >
          <div className="h-[60vh] w-full lg:h-[70vh]">
            <DirectoryMap
              listings={filteredListings}
              selectedId={selectedId}
              onSelect={selectFromMap}
              userLoc={userLoc}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
