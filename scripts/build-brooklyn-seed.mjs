#!/usr/bin/env node
/**
 * Builds src/data/directory-seed.ts from the verified Brooklyn list
 * (docs/brooklyn-directory-candidates.md). Geocodes each address via OSM
 * Nominatim (free, ~1 req/sec) and writes the TypeScript seed.
 *
 *   node scripts/build-brooklyn-seed.mjs
 *
 * Re-runnable. Store hours are typical/approximate and flagged for confirming;
 * farmers-market days/hours are from GrowNYC and are accurate.
 */
import { writeFile } from "node:fs/promises";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const W = (open, close) => [{ open, close }];
const everyday = (o, c) => ({
  sun: W(o, c), mon: W(o, c), tue: W(o, c), wed: W(o, c),
  thu: W(o, c), fri: W(o, c), sat: W(o, c),
});
const monSat = (o, c) => ({
  mon: W(o, c), tue: W(o, c), wed: W(o, c), thu: W(o, c), fri: W(o, c), sat: W(o, c),
});

// id, name, display address, geocode query, category, hours, highlights, tags, verified
const DATA = [
  // ---------- Farmers markets (GrowNYC / Down to Earth) ----------
  ["gm-grand-army", "Grand Army Plaza Greenmarket", "Prospect Park West & Flatbush Ave, Prospect Heights", "Grand Army Plaza, Brooklyn, NY", "farmers_market", { sat: W("08:00", "16:00") }, "Brooklyn's flagship greenmarket — regional farms, greens, fruit, eggs.", ["fresh-produce", "local-farms", "ebt-snap", "seasonal"], true],
  ["gm-boro-hall", "Brooklyn Borough Hall Greenmarket", "Court St & Montague St, Downtown Brooklyn", "Court St & Montague St, Brooklyn, NY", "farmers_market", { tue: W("08:00", "15:00"), sat: W("08:00", "15:00") }, "Downtown's year-round market — produce, bread, dairy from local farms.", ["fresh-produce", "local-farms", "ebt-snap"], true],
  ["gm-fort-greene", "Fort Greene Greenmarket", "Washington Park btwn DeKalb & Willoughby Ave, Fort Greene", "Fort Greene Park, Brooklyn, NY", "farmers_market", { sat: W("08:00", "15:00") }, "Saturdays in Fort Greene Park — leafy greens, root veg, eggs.", ["fresh-produce", "local-farms", "ebt-snap"], true],
  ["gm-cortelyou", "Cortelyou Greenmarket", "Cortelyou Rd btwn Argyle & Rugby Rd, Ditmas Park", "Cortelyou Rd & Argyle Rd, Brooklyn, NY", "farmers_market", { sun: W("08:00", "14:00") }, "Flatbush's Sunday market — seasonal produce and local growers.", ["fresh-produce", "local-farms", "ebt-snap"], true],
  ["gm-carroll-gardens", "Carroll Gardens Greenmarket", "Carroll St btwn Smith & Court St, Carroll Gardens", "Carroll St & Smith St, Brooklyn, NY", "farmers_market", { sun: W("08:00", "14:00") }, "Sunday produce by Carroll Park — fruit, vegetables, baked goods.", ["fresh-produce", "local-farms", "ebt-snap"], true],
  ["gm-bartel-pritchard", "Bartel-Pritchard Square Greenmarket", "Prospect Park West & 15th St, Park Slope", "Bartel-Pritchard Square, Brooklyn, NY", "farmers_market", { wed: W("08:00", "14:00"), sun: W("09:00", "14:00") }, "Park Slope greenmarket at the Prospect Park entrance.", ["fresh-produce", "local-farms", "ebt-snap", "seasonal"], true],
  ["gm-7th-sunset", "7th Ave Sunset Park Greenmarket", "7th Ave & 44th St, Sunset Park", "4415 7th Ave, Brooklyn, NY 11220", "farmers_market", { sat: W("08:00", "15:00") }, "Year-round Sunset Park market — affordable fresh produce.", ["fresh-produce", "local-farms", "ebt-snap", "affordable"], true],
  ["gm-bay-ridge", "Bay Ridge Greenmarket", "3rd Ave & 95th St, Bay Ridge", "3rd Ave & 95th St, Brooklyn, NY", "farmers_market", { sat: W("08:00", "15:00") }, "Seasonal Saturday market with regional farm produce.", ["fresh-produce", "local-farms", "seasonal"], true],
  ["gm-bensonhurst", "Bensonhurst Greenmarket", "18th Ave btwn 81st & 82nd St (Milestone Park), Bensonhurst", "18th Ave & 81st St, Brooklyn, NY", "farmers_market", { sun: W("09:00", "15:00") }, "Sundays at Milestone Park — seasonal fruit and vegetables.", ["fresh-produce", "local-farms", "seasonal"], true],
  ["gm-borough-park", "Borough Park Greenmarket", "14th Ave btwn 49th & 50th St, Borough Park", "14th Ave & 49th St, Brooklyn, NY", "farmers_market", { thu: W("08:00", "15:00") }, "Seasonal Thursday market with local farm produce.", ["fresh-produce", "local-farms", "seasonal"], false],
  ["gm-domino", "Domino Park Greenmarket", "River St btwn S 3rd & S 4th St, Williamsburg", "Domino Park, Brooklyn, NY", "farmers_market", { sun: W("08:00", "15:00") }, "Waterfront Williamsburg market — seasonal local produce.", ["fresh-produce", "local-farms", "seasonal"], true],
  ["gm-mccarren", "McCarren Park Greenmarket", "Union Ave btwn Driggs Ave & N 12th St, Williamsburg", "McCarren Park, Brooklyn, NY", "farmers_market", { sat: W("08:00", "15:00") }, "Year-round Saturday market on the Williamsburg/Greenpoint line.", ["fresh-produce", "local-farms", "ebt-snap"], true],
  ["gm-mcgolrick", "McGolrick Park Down to Earth Market", "108 Russell St (in McGolrick Park), Greenpoint", "108 Russell St, Brooklyn, NY", "farmers_market", { sun: W("09:00", "14:00") }, "Greenpoint Sunday market — produce, bread, local goods.", ["fresh-produce", "local-farms", "seasonal"], true],
  ["gm-park-slope-d2e", "Park Slope Down to Earth Market", "289 4th St (Old Stone House), Park Slope", "289 4th St, Brooklyn, NY", "farmers_market", { sun: W("09:00", "14:00") }, "Sundays at the Old Stone House — seasonal local produce.", ["fresh-produce", "local-farms", "seasonal"], true],
  ["gm-bed-stuy-farmstand", "Bed-Stuy Farmstand (GrowNYC)", "Decatur St & Lewis Ave, Bedford-Stuyvesant", "Decatur St & Lewis Ave, Brooklyn, NY", "farmers_market", { sat: W("09:00", "15:00") }, "GrowNYC youth-run farmstand bringing fresh produce to Bed-Stuy.", ["fresh-produce", "local-farms", "seasonal", "ebt-snap"], false],
  ["gm-4th-sunset", "4th Ave Sunset Park Greenmarket", "4th Ave near 44th St, Sunset Park", "4402 4th Ave, Brooklyn, NY 11220", "farmers_market", { sat: W("08:00", "15:00") }, "Seasonal Saturday produce market in Sunset Park.", ["fresh-produce", "local-farms", "seasonal"], false],

  // ---------- Health-food & natural grocers ----------
  ["hf-ps-food-coop", "Park Slope Food Coop", "782 Union St, Brooklyn, NY 11215", "782 Union St, Brooklyn, NY 11215", "health_food_store", everyday("08:00", "22:00"), "Member co-op with huge fresh & organic produce at low markups.", ["fresh-produce", "organic", "bulk", "affordable"], true],
  ["hf-flatbush-coop", "Flatbush Food Coop", "1415 Cortelyou Rd, Brooklyn, NY 11226", "1415 Cortelyou Rd, Brooklyn, NY 11226", "health_food_store", everyday("08:00", "22:00"), "Open-to-all co-op — organic produce, bulk goods, supplements.", ["fresh-produce", "organic", "bulk"], true],
  ["hf-natural-frontier", "Natural Frontier Market", "1102 Cortelyou Rd, Brooklyn, NY 11218", "1102 Cortelyou Rd, Brooklyn, NY 11218", "health_food_store", everyday("08:00", "21:00"), "Full natural market — organic produce, juice bar, supplements.", ["fresh-produce", "organic"], true],
  ["hf-sunac", "Sunac Natural Market", "440 Union Ave, Brooklyn, NY 11211", "440 Union Ave, Brooklyn, NY 11211", "health_food_store", everyday("07:00", "23:00"), "Daily-fresh local produce, juices, and a salad bar.", ["fresh-produce", "organic"], true],
  ["hf-greene-grape", "Greene Grape Provisions", "767 Fulton St, Brooklyn, NY 11217", "767 Fulton St, Brooklyn, NY 11217", "grocer", everyday("08:00", "21:00"), "Fort Greene grocer with excellent produce, butcher, and cheese.", ["fresh-produce", "organic"], true],
  ["hf-union-ps", "Union Market (Park Slope)", "402 7th Ave, Brooklyn, NY 11215", "402 7th Ave, Brooklyn, NY 11215", "grocer", everyday("07:00", "22:00"), "Gourmet grocer — strong produce, cheese, meats, prepared foods.", ["fresh-produce", "organic"], true],
  ["hf-union-cobble", "Union Market (Cobble Hill)", "288 Court St, Brooklyn, NY 11231", "288 Court St, Brooklyn, NY 11231", "grocer", everyday("07:00", "22:00"), "Gourmet grocer with fresh produce and prepared foods.", ["fresh-produce", "organic"], true],
  ["hf-mom-pop", "Mom & Pop's Organic Market", "889 Manhattan Ave, Brooklyn, NY 11222", "889 Manhattan Ave, Brooklyn, NY 11222", "grocer", everyday("00:00", "23:59"), "24-hour Greenpoint grocer with organic produce deals.", ["fresh-produce", "organic"], true],
  ["hf-tonys", "Tony's Health Food", "2923 Glenwood Rd, Brooklyn, NY 11210", "2923 Glenwood Rd, Brooklyn, NY 11210", "health_food_store", monSat("09:00", "19:00"), "Long-running natural supplement & herb shop (lighter on produce).", ["organic"], true],

  // ---------- Cultural & affordable produce markets ----------
  ["cm-labay", "LABAY Market", "1127 Nostrand Ave, Brooklyn, NY 11225", "1127 Nostrand Ave, Brooklyn, NY 11225", "grocer", everyday("08:00", "21:00"), "Black-owned Caribbean grocer — soursop, tropical fruit, callaloo, ground provisions.", ["fresh-produce", "caribbean", "black-owned"], true],
  ["cm-caribbean-supermarket", "Caribbean Supermarket", "741 Utica Ave, Brooklyn, NY 11203", "741 Utica Ave, Brooklyn, NY 11203", "grocer", { mon: W("08:00", "21:00"), tue: W("08:00", "21:00"), wed: W("08:00", "21:00"), thu: W("08:00", "21:00"), fri: W("08:00", "21:00"), sat: W("08:00", "21:00"), sun: W("08:00", "20:00") }, "West Indian & Jamaican staples plus fresh produce.", ["fresh-produce", "caribbean", "jamaican"], true],
  ["cm-food-garden", "Food Garden Market", "608 Franklin Ave, Brooklyn, NY 11238", "608 Franklin Ave, Brooklyn, NY 11238", "grocer", everyday("08:00", "22:00"), "Crown Heights grocer — full produce, butcher, fish, juice bar, bakery.", ["fresh-produce", "organic", "affordable"], true],
  ["cm-flatbush-central", "Flatbush Central Caribbean Marketplace", "2123 Caton Ave, Brooklyn, NY 11226", "2123 Caton Ave, Brooklyn, NY 11226", "market", monSat("10:00", "20:00"), "Caribbean vendor marketplace; in-season Wednesday farmers' market.", ["fresh-produce", "caribbean"], true],
  ["cm-food-universe-369", "Food Universe Marketplace", "369 Flatbush Ave, Brooklyn, NY 11238", "369 Flatbush Ave, Brooklyn, NY 11238", "grocer", everyday("07:00", "22:00"), "Neighborhood supermarket — produce, meat, grocery staples.", ["fresh-produce", "affordable", "ebt-snap"], true],
  ["cm-ctown-church", "CTown Supermarket (Church Ave)", "5311 Church Ave, Brooklyn, NY 11203", "5311 Church Ave, Brooklyn, NY 11203", "grocer", everyday("07:00", "22:00"), "Affordable full grocery with produce; accepts SNAP.", ["fresh-produce", "affordable", "caribbean", "ebt-snap"], true],
  ["cm-ideal-food-basket", "Ideal Food Basket", "4806 Church Ave, Brooklyn, NY 11203", "4806 Church Ave, Brooklyn, NY 11203", "grocer", everyday("07:00", "22:00"), "Affordable supermarket — strong produce; SNAP/WIC.", ["fresh-produce", "affordable", "caribbean", "ebt-snap"], true],
  ["cm-met-foods", "Met Foodmarket", "1086 Brooklyn Ave, Brooklyn, NY 11203", "1086 Brooklyn Ave, Brooklyn, NY 11203", "grocer", everyday("07:00", "22:00"), "East Flatbush supermarket with fresh produce.", ["fresh-produce", "affordable", "ebt-snap"], true],
  ["cm-songs-fruit", "Song's Fruit Market", "848 Utica Ave, Brooklyn, NY 11203", "848 Utica Ave, Brooklyn, NY 11203", "market", everyday("07:00", "21:00"), "Dedicated fruit & produce market on Utica Ave.", ["fresh-produce", "produce-specialist", "affordable"], true],
  ["cm-new-best-utica", "New Best Utica Market", "890 Utica Ave, Brooklyn, NY 11203", "890 Utica Ave, Brooklyn, NY 11203", "market", everyday("07:00", "21:00"), "Produce-focused market on Utica Ave.", ["fresh-produce", "produce-specialist", "affordable"], true],
  ["cm-mr-mango", "Mr. Mango Fruit & Vegetables", "112 Rockaway Ave, Brooklyn, NY 11233", "112 Rockaway Ave, Brooklyn, NY 11233", "market", everyday("07:00", "20:00"), "Beloved Brownsville green-grocer — lots of affordable fresh produce.", ["fresh-produce", "produce-specialist", "affordable"], true],
  ["cm-super-foodtown-bedstuy", "Super Foodtown of Bed-Stuy", "1420 Fulton St, Brooklyn, NY 11216", "1420 Fulton St, Brooklyn, NY 11216", "grocer", everyday("07:00", "22:00"), "Full supermarket — organic produce plus Caribbean & soul-food selections.", ["fresh-produce", "soul-food", "caribbean", "affordable"], true],
  ["cm-fei-long", "Fei Long Supermarket", "6301 8th Ave, Brooklyn, NY 11220", "6301 8th Ave, Brooklyn, NY 11220", "grocer", everyday("08:00", "21:00"), "Large Sunset Park market — very affordable produce, seafood, meat; EBT.", ["fresh-produce", "asian", "affordable", "ebt-snap"], true],
  ["cm-meat-place", "The Meat Place", "1889 Nostrand Ave, Brooklyn, NY 11226", "1889 Nostrand Ave, Brooklyn, NY 11226", "grocer", monSat("08:00", "20:00"), "Butcher/grocer on the Little Caribbean corridor; SNAP.", ["caribbean", "affordable", "ebt-snap"], true],
  ["cm-green-village-meat", "Green Village Meat Market", "1861 Nostrand Ave, Brooklyn, NY 11226", "1861 Nostrand Ave, Brooklyn, NY 11226", "grocer", monSat("08:00", "20:00"), "Meat market & grocer on the Nostrand Ave Caribbean corridor.", ["caribbean", "affordable"], true],
  ["cm-bk-grange", "Brooklyn Grange Farm Stand", "Brooklyn Army Terminal, 140 58th St, Sunset Park, NY 11220", "Brooklyn Army Terminal, Brooklyn, NY 11220", "market", { sun: W("10:00", "15:00") }, "Rooftop-farm produce stand — ultra-fresh local vegetables, in season.", ["fresh-produce", "local-farms", "seasonal"], false],
];

const NOMINATIM = "https://nominatim.openstreetmap.org/search";

async function geocode(q) {
  const url = `${NOMINATIM}?format=json&limit=1&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "HeartOfTheBlock/1.0 (directory geocoder)" },
  });
  if (!res.ok) throw new Error(`Nominatim ${res.status}`);
  const data = await res.json();
  if (!data.length) return null;
  return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
}

async function main() {
  const out = [];
  let ok = 0;
  for (const [id, name, address, geo, category, hours, highlights, tags, verified] of DATA) {
    let lat = null, lng = null;
    try {
      const c = await geocode(geo);
      if (c) {
        lat = c.lat; lng = c.lng; ok++;
        process.stderr.write(`✓ ${name}  (${lat.toFixed(4)}, ${lng.toFixed(4)})\n`);
      } else {
        process.stderr.write(`✗ NO MATCH: ${name} — ${geo}\n`);
      }
    } catch (e) {
      process.stderr.write(`! ERROR: ${name} — ${e.message}\n`);
    }
    out.push({ id, name, address, lat, lng, category, hours, highlights, tags, verified });
    await sleep(1100);
  }

  const header = `import type { DirectoryListing } from "@/lib/directory/types";

/**
 * Brooklyn directory — REAL, address-verified listings (June 2026).
 * Generated by scripts/build-brooklyn-seed.mjs from
 * docs/brooklyn-directory-candidates.md. Addresses verified against GrowNYC,
 * NYC DOHMH, NYC Food Policy Center, and store sources. Coordinates geocoded
 * via OSM Nominatim. Farmers-market days/hours are accurate (GrowNYC); store
 * hours are typical/approximate — entries with verified:false still need their
 * hours/season confirmed. Re-run the script to regenerate.
 */
export const DIRECTORY_SEED: DirectoryListing[] = ${JSON.stringify(out, null, 2)};
`;

  await writeFile(new URL("../src/data/directory-seed.ts", import.meta.url), header, "utf8");
  process.stderr.write(`\nGeocoded ${ok}/${DATA.length}. Wrote src/data/directory-seed.ts\n`);
}

main();
