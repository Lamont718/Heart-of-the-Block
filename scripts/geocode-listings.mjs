#!/usr/bin/env node
/**
 * Geocode directory listings by street address using OpenStreetMap Nominatim
 * (free, no API key). Run this once you have REAL addresses, then import the
 * output into the `directory_listings` table.
 *
 * Usage:
 *   node scripts/geocode-listings.mjs input.json > output.json
 *
 * input.json: an array of listing objects, each with at least { name, address }.
 * The script fills in lat/lng for any entry missing them and leaves the rest
 * untouched. Be polite to Nominatim: it sleeps 1.1s between requests (their
 * usage policy is max ~1 req/sec). For large lists, consider a paid geocoder.
 */
import { readFile } from "node:fs/promises";

const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const SLEEP_MS = 1100;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocode(address) {
  const url = `${NOMINATIM}?format=json&limit=1&q=${encodeURIComponent(
    address + ", Brooklyn, NY",
  )}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "HeartOfTheBlock/1.0 (directory geocoder)" },
  });
  if (!res.ok) throw new Error(`Nominatim ${res.status}`);
  const data = await res.json();
  if (!data.length) return null;
  return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node scripts/geocode-listings.mjs input.json > out.json");
    process.exit(1);
  }
  const listings = JSON.parse(await readFile(file, "utf8"));
  const out = [];
  for (const item of listings) {
    if ((item.lat == null || item.lng == null) && item.address) {
      try {
        const coords = await geocode(item.address);
        if (coords) {
          item.lat = coords.lat;
          item.lng = coords.lng;
          process.stderr.write(`✓ ${item.name}\n`);
        } else {
          process.stderr.write(`✗ no match: ${item.name} (${item.address})\n`);
        }
      } catch (e) {
        process.stderr.write(`! error: ${item.name} — ${e.message}\n`);
      }
      await sleep(SLEEP_MS);
    }
    out.push(item);
  }
  process.stdout.write(JSON.stringify(out, null, 2));
}

main();
