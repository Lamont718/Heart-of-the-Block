# SPEC.md — Heart of the Block (Brooklyn Heart Health Platform)

## 1. What this is

A proactive heart-health platform for Brooklyn communities. Not a generic health site — a
culturally-grounded, mobile-first tool that helps people understand their numbers, make
realistic food swaps, scan products in the store, move more, find genuinely healthy places to
shop near them, and stay accountable.

The core insight: people here don't lack health *information* — they lack *practical tools
that work in the moment*, *access*, and the *trust and follow-through* to stick with it. Every
feature is built to close that gap, not to restate "eat better, exercise more." It speaks
Brooklyn — the food people actually eat and the lives they actually live — without being
preachy or clinical. That cultural fit is the platform's core advantage over the dozen
well-funded general health apps; protect it.

## 2. Audience

- Primary: Brooklyn residents, all ages, mobile-first. Culturally rooted in the community.
- Welcoming across a range of health literacy without talking down to anyone.
- Design implications: large tap targets, plain language, fast on any connection, works well
  on any phone, accessible (WCAG AA).

## 3. The four pillars + the directory

### Pillar 1 — Educational content
- Short, plain-language articles. Culturally grounded in what Brooklyn actually cooks and eats
  (e.g. oxtail, fried chicken, Caribbean & soul-food done heart-smart) — practical and
  relatable, never clinical instructions like "reduce saturated fat intake."
- "Here's how to make your favorites in a way that loves you back" energy.
- Bite-sized cards, mobile-first, optional audio read-aloud for accessibility.
- Tagged by topic (cholesterol, blood pressure, diabetes-adjacent, etc.).

### Pillar 2 — Interactive tools
- **Heart risk / cholesterol calculator** — inputs (age, numbers if known, lifestyle) →
  plain-language risk picture. ALWAYS routes to "talk to your doctor."
- **Food Swap Finder** (the sleeper hit) — user types what they eat → realistic, culturally
  relevant swaps with the *why*. Shareable result cards.
- **Barcode Scanner** (the in-store hook) — scan a product in the aisle → instant
  heart-health read. See §3a below for full detail. This is the feature that turns the
  platform from something you *read* into something you *use in the moment*.
- **Numbers tracker** — log cholesterol/BP/weight over time, simple trend charts.
- **Weight-loss tracking** — user sets a weight goal, logs weight, sees a trend line and
  progress toward target. Low-burden and encouraging. NO calorie counting / food diary — see
  §3b for why and where the line is.
- **Activity / cardio check-ins** — log movement (today's walk, minutes active, steps) tied
  to the guided exercise plans. Builds streaks and feeds the accountability pillar. This is
  retention, not just data.

### 3a. Barcode Scanner — detailed spec

The standout "proactive" feature. User stands in a store, scans a product's barcode with
their phone camera, and gets an instant, plain-language heart-health read — then a better
swap.

**Flow:** scan → look up product → score it → explain the why → offer a swap.

**Tech:**
- Camera barcode reading in-browser via a scanning library (e.g. `@zxing/browser` or
  `html5-qrcode`). PWA, no native app needed. Must work on cheap Android cameras.
- Product lookup by UPC against a food database (see data source below).
- Scoring runs in our own logic layer, not handed off to the database.

**Data source:**
- Primary: **Open Food Facts** (free, open, crowd-sourced, mission-aligned). Expect coverage
  gaps and some inaccurate entries on smaller/local brands.
- Fallback when a product isn't found: let the user log it manually or show
  "we don't have this one yet — help us add it." Never fail silently.
- Optional later upgrade path: USDA FoodData Central / Nutritionix for reliability.

**Scoring logic — IMPORTANT, do not oversimplify:**
- Do NOT stamp a single vague "HEALTHY / UNHEALTHY" verdict. That can be wrong and brushes
  the medical-advice line (§6).
- Score on specific, heart-relevant factors per serving: saturated fat, sodium, added sugar,
  fiber (and trans fat if present → always flag).
- Show the *why* in plain language: "High in saturated fat, low fiber" — not a red X alone.
- Use a clear, non-clinical visual scale (e.g. good / okay / limit) tied to those factors.
- Keep the §6 disclaimer visible: it's a guide, not a diagnosis.

**The magic loop — scanner feeds the Swap Finder:**
- After scoring, if the item rates "limit," surface a culturally-relevant swap from the same
  swap dataset the Food Swap Finder uses. Scan → score → swap is the sticky retention loop.
- Logged-in users can save scanned items and swaps to their profile.

### 3b. Weight loss & activity tracking — the deliberate line

Weight loss is a core user goal, but we serve it from OUR lane (heart-health coaching +
accountability), NOT by becoming a calorie counter.

**What we build (fits the platform):**
- Weight goal + weight log + trend line + progress to target. Encouraging, low-burden.
- Activity / cardio check-ins tied to guided exercise plans (walks, minutes active, steps).
- Heart-health framing: movement and weight loss presented as paths to a healthier heart.
- Streaks and check-ins that feed the accountability pillar (Pillar 4).

**What we deliberately do NOT build (off-course):**
- Full calorie counting / log-every-bite food diary / a 200k-item food database. That's a
  separate product category (MyFitnessPal, Lose It) that's free, well-funded, and already on
  most people's phones. Competing there head-on means being a worse version of what they
  already use, with brutal logging-abandonment rates. Our edge is heart-health + cultural fit,
  not calorie math.

**Optional future path (phase 2+):** integrate with Apple Health / Google Fit so weight and
activity flow in automatically — tracking without building or maintaining a food database, and
without the daily-logging grind. Do NOT build this in v1; note it as a clean upgrade path.

### Pillar 3 — Guided plans
- Meal plans built on affordable, accessible, bodega-friendly ingredients.
- Exercise needing no gym: walking routes, home workouts, chair exercises for older adults.
- Plans adapt to user profile (age, mobility, goals).

### Pillar 4 — Community & accountability (retention engine)
- Check-ins, streaks, small cohort challenges, points.
- Pulls in the activity check-ins and weight-loss progress from Pillar 2 — daily/weekly
  "did you do today's walk?" and progress nudges are the core engagement loop.
- This is what makes people come back. Borrow engagement mechanics from gamified learning.

### The Directory ("where to go") — replaces a traditional storefront
- A map + list of genuinely healthy places to shop in Brooklyn: markets and grocers with
  strong fresh produce, health-food stores, and farmers markets. The goal is to *encourage
  people toward healthy locations* — not corner stores or "make do with what's nearest."
  Healthy spots only.
- Filters: open now, distance, category, "has fresh produce," type of store.
- Each listing: name, address, hours, what's good there, tags, map pin.
- Start with Brooklyn, curated well. Built to expand to more of the city later.
- Data starts hand-curated (seed ~30–50 real, verified spots), expandable. Community can
  suggest additions.

## 4. Accounts & data

- Auth required for: saved progress, tracker history, plans, streaks, favorites.
- Free/no-login allowed for: browsing content, using the calculator once, viewing directory.
- Hybrid model: tools work to taste, account unlocks saving + accountability.

## 5. Tech stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, mobile-first.
- **Backend/DB/Auth:** Supabase (Postgres + Auth + Row Level Security).
- **Payments:** Stripe — NOT for a storefront. Reserved for optional future premium accounts
  or selling first-party guides. Stub it, don't build checkout flows yet.
- **Maps:** Use a map library for the directory (Leaflet + OpenStreetMap to avoid Google
  billing, or Mapbox if richer styling wanted). Geocode seed listings at build time.
- **Deploy:** Vercel. **Repo:** GitHub. **Build tool:** Claude Code.
- **AI features** (optional, phase 2): Anthropic API to power the Food Swap Finder's
  free-text understanding and to generate plain-language explanations.

## 6. CRITICAL — medical safety & compliance

This is non-negotiable and must be designed in from day one, not bolted on:
- The platform provides **education, not medical advice or diagnosis.**
- Every tool that touches personal health (calculator, tracker, plans) shows a clear,
  persistent disclaimer and routes users to consult a licensed doctor for diagnosis and
  treatment decisions.
- No tool should ever tell a user to start/stop/change medication.
- Risk calculator outputs a *picture to discuss with a doctor*, never a verdict.
- Footer + first-run modal: plain-language "this is not a substitute for medical care."
- Store health data with RLS so users only see their own; treat it as sensitive.

## 7. Build order (do NOT build all at once)

1. Project scaffold, Supabase setup, auth, layout shell, disclaimer system.
2. Directory (map + listings + filters) — the standout feature, build it well.
3. Food Swap Finder + Numbers Tracker.
4. Barcode Scanner (build after the Swap Finder so the scan→swap loop has swaps to point to).
5. Educational content system (CMS-lite via Supabase or MDX).
6. Guided plans.
7. Community/accountability (streaks, check-ins, challenges).
8. Polish, accessibility pass, performance pass.

## 8. Success criteria

- Loads fast on any phone over a typical mobile connection.
- A non-technical Brooklyn resident can find a healthy place to shop near them in under 30s.
- Every health tool visibly points to "see your doctor."
- Looks and sounds like it was made *for this community*, not adapted to it.
