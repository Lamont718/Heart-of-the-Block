import type { DirectoryListing } from "@/lib/directory/types";

/**
 * ⚠️ PLACEHOLDER SEED — NOT REAL LISTINGS.
 *
 * Per CONTEXT.md we do NOT invent fake addresses. These entries exist only so
 * the Directory UI is reviewable before Lamont supplies the real, verified list
 * of 30–50 Brooklyn healthy spots. Each is named "Sample —", marked
 * verified: false, and pinned to a NEIGHBORHOOD CENTROID (not a real street
 * address). Replace this file (or seed the `directory_listings` table) with real
 * data, then geocode with `scripts/geocode-listings.mjs`.
 *
 * Standard weekly hours used below to keep the file readable.
 */

const W = (open: string, close: string) => [{ open, close }];
const MON_SAT = (o: string, c: string) => ({
  mon: W(o, c),
  tue: W(o, c),
  wed: W(o, c),
  thu: W(o, c),
  fri: W(o, c),
  sat: W(o, c),
});
const EVERY_DAY = (o: string, c: string) => ({ ...MON_SAT(o, c), sun: W(o, c) });

export const DIRECTORY_SEED: DirectoryListing[] = [
  {
    id: "seed-bedstuy-grocer",
    name: "Sample — Bed-Stuy Fresh Grocer",
    address: "Bedford-Stuyvesant (sample location — real address pending)",
    lat: 40.6872,
    lng: -73.9418,
    category: "grocer",
    hours: EVERY_DAY("08:00", "21:00"),
    highlights: "Full produce aisle, callaloo & plantains, accepts EBT/SNAP.",
    tags: ["fresh-produce", "caribbean", "ebt-snap", "affordable"],
    verified: false,
  },
  {
    id: "seed-crownhts-caribbean",
    name: "Sample — Crown Heights Caribbean Market",
    address: "Crown Heights (sample location — real address pending)",
    lat: 40.6694,
    lng: -73.9422,
    category: "market",
    hours: MON_SAT("09:00", "20:00"),
    highlights: "Ground provisions, fresh fish, low-sodium seasoning blends.",
    tags: ["fresh-produce", "caribbean", "halal"],
    verified: false,
  },
  {
    id: "seed-flatbush-farmers",
    name: "Sample — Flatbush Farmers Market",
    address: "Flatbush (sample location — real address pending)",
    lat: 40.6409,
    lng: -73.9617,
    category: "farmers_market",
    hours: { sat: W("08:00", "15:00"), sun: W("09:00", "14:00") },
    highlights: "Seasonal local produce, greens by the bunch, EBT match.",
    tags: ["fresh-produce", "seasonal", "local-farms", "ebt-snap"],
    verified: false,
  },
  {
    id: "seed-parkslope-health",
    name: "Sample — Park Slope Health Foods",
    address: "Park Slope (sample location — real address pending)",
    lat: 40.671,
    lng: -73.9814,
    category: "health_food_store",
    hours: EVERY_DAY("08:00", "22:00"),
    highlights: "Bulk grains & beans, low-sugar pantry staples, olive oils.",
    tags: ["fresh-produce", "organic", "bulk"],
    verified: false,
  },
  {
    id: "seed-bushwick-grocer",
    name: "Sample — Bushwick Corner Produce",
    address: "Bushwick (sample location — real address pending)",
    lat: 40.6944,
    lng: -73.9213,
    category: "grocer",
    hours: EVERY_DAY("07:00", "23:00"),
    highlights: "Affordable fruit & veg, herbs, beans in bulk.",
    tags: ["fresh-produce", "affordable", "ebt-snap"],
    verified: false,
  },
  {
    id: "seed-fortgreene-farmers",
    name: "Sample — Fort Greene Greenmarket",
    address: "Fort Greene (sample location — real address pending)",
    lat: 40.6892,
    lng: -73.974,
    category: "farmers_market",
    hours: { sat: W("08:00", "16:00") },
    highlights: "Regional farms, leafy greens, root veg, eggs.",
    tags: ["fresh-produce", "seasonal", "local-farms"],
    verified: false,
  },
  {
    id: "seed-sunsetpark-market",
    name: "Sample — Sunset Park Family Market",
    address: "Sunset Park (sample location — real address pending)",
    lat: 40.6453,
    lng: -74.0119,
    category: "market",
    hours: EVERY_DAY("08:00", "21:00"),
    highlights: "Big produce selection, fresh fish, dried beans.",
    tags: ["fresh-produce", "affordable", "ebt-snap"],
    verified: false,
  },
  {
    id: "seed-williamsburg-health",
    name: "Sample — Williamsburg Natural Grocer",
    address: "Williamsburg (sample location — real address pending)",
    lat: 40.7081,
    lng: -73.9571,
    category: "health_food_store",
    hours: EVERY_DAY("09:00", "21:00"),
    highlights: "Whole grains, low-sodium options, fresh produce.",
    tags: ["fresh-produce", "organic"],
    verified: false,
  },
  {
    id: "seed-eastflatbush-caribbean",
    name: "Sample — East Flatbush Provisions",
    address: "East Flatbush (sample location — real address pending)",
    lat: 40.651,
    lng: -73.929,
    category: "market",
    hours: MON_SAT("08:00", "20:00"),
    highlights: "Yam, dasheen, green bananas, fresh thyme & scallion.",
    tags: ["fresh-produce", "caribbean", "affordable"],
    verified: false,
  },
  {
    id: "seed-brownsville-grocer",
    name: "Sample — Brownsville Community Grocer",
    address: "Brownsville (sample location — real address pending)",
    lat: 40.6628,
    lng: -73.9097,
    category: "grocer",
    hours: EVERY_DAY("08:00", "21:00"),
    highlights: "Fresh produce in a food-access area, EBT/SNAP, low prices.",
    tags: ["fresh-produce", "affordable", "ebt-snap"],
    verified: false,
  },
  {
    id: "seed-canarsie-farmers",
    name: "Sample — Canarsie Saturday Market",
    address: "Canarsie (sample location — real address pending)",
    lat: 40.6404,
    lng: -73.901,
    category: "farmers_market",
    hours: { sat: W("09:00", "15:00") },
    highlights: "Local growers, seasonal greens, honey.",
    tags: ["fresh-produce", "seasonal", "local-farms"],
    verified: false,
  },
  {
    id: "seed-bensonhurst-market",
    name: "Sample — Bensonhurst Produce Market",
    address: "Bensonhurst (sample location — real address pending)",
    lat: 40.6027,
    lng: -73.993,
    category: "market",
    hours: EVERY_DAY("07:30", "20:30"),
    highlights: "Wide fruit & veg selection, fresh herbs, good prices.",
    tags: ["fresh-produce", "affordable"],
    verified: false,
  },
];
