# CONTEXT.md — Heart of the Block (Brooklyn Heart Health Platform)

## Who's building this & why

Founder: Lamont Kirton — Brooklyn community leader, founder of WWSH (nonprofit) and Our Rose
LLC, with deep roots in Brooklyn and a track record running youth and community programs. This
is a standalone product. The voice and trust come from being *of* the community, not outside
it — which is exactly the edge generic health apps can't replicate.

## Name

**Heart of the Block.** Double meaning: heart *health* + being the heart of the
neighborhood/the block. Rooted in Lamont's actual world (Albany Avenue Block Association,
Brooklyn community work) — which is exactly why no generic health-tech competitor can own it.
"Block" is deeply Brooklyn. Web search came back clear of conflicting health brands/trademarks
(June 2026); a formal USPTO clearance is still recommended before filing/printing.
Domain: heartoftheblock.org fits the community angle; .com / hotb.nyc are fallbacks.

## Brand voice

- Warm, direct, no jargon. Talks like a knowledgeable neighbor, not a clinic pamphlet.
- Respectful of the culture and the food — never shames people for what they eat.
- "Here's how to make what you love in a way that loves you back" energy.
- Encouraging and real about the realities people face (time, access, habit) instead of
  pretending they don't exist.
- Speaks Brooklyn — confident, community-rooted, authentic.

## Design direction

- Mobile-first, big tap targets, high contrast, readable in any lighting.
- Warm, vibrant, confident. Brooklyn energy — bold and community-rooted, never clinical or
  cold, never childish.
- Fast. No heavy frameworks bloating the bundle. Images optimized/lazy-loaded.
- Accessibility is a first-class requirement (WCAG AA), including audio read-aloud option.
- See the frontend-design skill for token/styling discipline when building UI.

## Data models (starting point — refine in build)

### users (Supabase auth + profile table)
- id, email, display_name, neighborhood, age_range, goals[], created_at

### health_logs (RLS: owner-only)
- id, user_id, type (cholesterol|bp|weight), value(s), recorded_at

### weight_goals (RLS: owner-only)
- id, user_id, start_weight, target_weight, start_date, target_date (optional), active (bool)
- Weight entries themselves live in health_logs (type=weight); this stores the goal/target so
  the trend line can show progress. No calorie/food-diary fields — see SPEC §3b.

### activity_logs (RLS: owner-only)
- id, user_id, activity_type (walk|home_workout|other), minutes (int, optional),
  steps (int, optional), linked_plan_day_id (fk, optional), logged_at
- Powers cardio check-ins and streaks. Keep it light — a check-in, not a fitness tracker.

### directory_listings
- id, name, address, lat, lng, category (grocer|market|health_food_store|farmers_market),
  hours (json), highlights (text), tags[], verified (bool)
- Healthy spots only — do not include corner stores/bodegas or general restaurants.

### swaps (for Food Swap Finder seed data)
- id, original_food, swap_food, reason, category, cultural_tags[]

### scanned_items (Barcode Scanner — RLS: owner-only for saved scans)
- id, user_id, barcode_upc, product_name, brand, nutrition (json: sat_fat, sodium,
  added_sugar, fiber, trans_fat per serving), score (good|okay|limit),
  score_reasons[], suggested_swap_id (fk → swaps), scanned_at
- Note: product/nutrition data comes from Open Food Facts at scan time; cache results to
  avoid repeat lookups. Scoring is computed in our own logic, stored alongside.

### articles
- id, title, slug, body (mdx/text), topic_tags[], reading_level, audio_url (optional)

### plans / plan_days / exercises / meals
- structured guided-plan content; user_plan_progress for tracking

### community
- check_ins, streaks, challenges, challenge_participants

## Seed data needed (hand-curated, real)

- 30–50 real, verified healthy places to shop in Brooklyn with addresses (will need
  geocoding). Healthy spots only — markets, grocers, farmers markets with good produce.
- 50–100 food swaps, weighted toward the foods Brooklyn actually eats (Caribbean, soul food,
  common staples) for cultural relevance.
- 10–15 starter articles.
- 2–3 starter meal plans + 2–3 home/no-equipment exercise plans.

Lamont will supply or approve the real Brooklyn place list — accuracy and authenticity matter
more than volume. Don't invent fake addresses; every listing must be a real, verifiable place.

## Out of scope for v1

- First-party e-commerce checkout (Stripe stubbed only).
- Native mobile apps (PWA-friendly web is enough).
- Telehealth / any actual medical service.
- Calorie counting / food diary / nutrition database (see SPEC §3b — deliberate, not an
  oversight). Weight loss is served through goals + weight trend + activity check-ins instead.
- Apple Health / Google Fit integration — a clean phase-2 upgrade path, not a v1 feature.

## Reminder

Medical safety (SPEC.md §6) overrides every other consideration. When in doubt, educate and
defer to a doctor. This applies especially to the Barcode Scanner: score on specific factors
(saturated fat, sodium, added sugar, fiber, trans fat) with a plain-language *why* — never a
single blunt "unhealthy" verdict, and never anything resembling a medical judgment.
