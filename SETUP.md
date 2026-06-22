# Heart of the Block — setup

A Brooklyn heart-health platform. **All 8 build steps (SPEC §7) are complete:**
scaffold + auth + medical-safety shell, the Directory, Food Swap Finder, Numbers
Tracker, Barcode Scanner, educational content, guided plans, community &
accountability, and the polish pass (PWA, SEO, a11y, error pages).

Everything runs **right now without Supabase** — the interactive tools, content,
plans, and accountability hub are local-first (browser storage), and the
Directory/Swaps/Articles read real bundled data. Connecting Supabase turns on
accounts and cross-device sync; see below.

## What's built (where to look)

| Feature | Route | Notes |
|---|---|---|
| Home + medical-safety shell | `/` | first-run modal, persistent disclaimer |
| Directory (map + filters) | `/directory` | 41 verified Brooklyn spots, Leaflet/OSM |
| Food Swap Finder | `/swaps` | ~55 swaps, shareable cards |
| Barcode Scanner | `/scan` | Open Food Facts → our scoring → swap loop |
| Numbers Tracker | `/tracker` | weight/BP/cholesterol, trends, weight goal |
| Learn (articles) | `/learn` | 12 articles, topic filters, read-aloud |
| Guided plans | `/plans` | 3 meal + 3 movement plans, progress tracking |
| Community / accountability | `/community` | streaks, check-ins, challenges, points |

## Run it locally (no Supabase needed)

```bash
npm install
npm run dev
```

Open http://localhost:3000. With empty Supabase keys the site runs in
**shell-only / logged-out review mode** — every page renders, the first-run
disclaimer modal shows, but sign-in is disabled until you connect Supabase.

## Connect Supabase (enables accounts)

1. Create a project at https://supabase.com.
2. **Database → SQL Editor →** paste and run `supabase/schema.sql`. This creates
   every table, all Row Level Security policies, and the trigger that makes a
   `profiles` row automatically on signup.
3. **Project Settings → API →** copy the Project URL and the `anon` public key.
4. Put them in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
5. **Authentication → URL Configuration →** add `http://localhost:3000/**` (and
   later your production URL) to the redirect allow-list.
6. Restart `npm run dev`. Sign-up, email confirmation, sign-in, the protected
   `/account` page, and sign-out now work.

## How auth works

- `@supabase/ssr` cookie-based sessions.
- `src/middleware.ts` refreshes the session on every request and redirects
  unauthenticated users away from protected routes (`/account`, `/dashboard`).
- Email + password with email confirmation. Confirmation links land on
  `/auth/confirm`, which verifies the token and forwards the user on.
- `getUser()` (`src/lib/supabase/auth.ts`) validates the token server-side — used
  by the layout, the header, and protected pages.

## How the medical-safety system works (SPEC §6)

- **First-run modal** (`first-run-modal.tsx`): shown once per browser until the
  visitor acknowledges "education, not medical care." Stored in `localStorage`.
- **Persistent footer disclaimer** (`disclaimer-banner.tsx`): on every page.
- **`/disclaimer`**: the full, plain-language disclaimer page.
- **Inline variant**: drop `<DisclaimerBanner variant="inline" />` onto any tool
  that touches personal health (already on `/account`).

## The Directory (step 2) — how it works & how to seed it

- Page: `/directory`. Map (Leaflet + free OpenStreetMap/CARTO tiles — no Google
  billing), list, and filters: search, category, **open now**, **has fresh
  produce**, and **distance** (after "Near me" shares location). Map ↔ list stay
  in sync; mobile gets a List/Map toggle.
- **Data source:** reads the `directory_listings` table when Supabase is
  configured AND has rows; otherwise it shows the labelled **placeholder seed**
  (`src/data/directory-seed.ts`) so the UI is reviewable. Placeholders are pinned
  to neighborhood centers, named "Sample —", and flagged with a banner.

### Seeding real listings (do NOT invent — per CONTEXT)

1. Put your real, verified spots in a JSON array (`name`, `address`, `category`
   one of grocer|market|health_food_store|farmers_market, `highlights`, `tags`,
   `hours`). Use the tag `fresh-produce` to power the "has fresh produce" filter.
2. **Geocode addresses → lat/lng:**
   ```bash
   node scripts/geocode-listings.mjs my-listings.json > geocoded.json
   ```
   (Uses free OSM Nominatim, ~1 req/sec.)
3. Insert `geocoded.json` rows into `directory_listings` (Supabase Table editor,
   or a SQL insert / CSV import). Set `verified = true` for confirmed spots.
4. The directory revalidates hourly, so new rows appear without a redeploy.

## Deploy (Vercel)

Set the three env vars in the Vercel project, set `NEXT_PUBLIC_SITE_URL` to the
production domain, add the prod URL to Supabase's redirect allow-list, and ship.

## What I need from you (real data — do not invent, per CONTEXT.md)

- 30–50 **real, verified** Brooklyn healthy places (markets/grocers/farmers
  markets) with addresses — for the directory seed.
- Confirmation of the 50–100 food swaps direction (Caribbean / soul-food / common
  staples) so the swap dataset is culturally accurate.
- Domain decision: `heartoftheblock.org` (recommended) vs `.com` / `hotb.nyc`.
