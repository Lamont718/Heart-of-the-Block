# Heart of the Block — setup

A Brooklyn heart-health platform. **Step 1 (scaffold, auth, shell, medical-safety
disclaimer) is built.** Later steps — directory, swap finder, scanner, content,
plans, community — are intentionally not built yet (see `SPEC.md §7`).

## Run it locally (no Supabase needed for the shell)

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

## Deploy (Vercel)

Set the three env vars in the Vercel project, set `NEXT_PUBLIC_SITE_URL` to the
production domain, add the prod URL to Supabase's redirect allow-list, and ship.

## What I need from you (real data — do not invent, per CONTEXT.md)

- 30–50 **real, verified** Brooklyn healthy places (markets/grocers/farmers
  markets) with addresses — for the directory seed.
- Confirmation of the 50–100 food swaps direction (Caribbean / soul-food / common
  staples) so the swap dataset is culturally accurate.
- Domain decision: `heartoftheblock.org` (recommended) vs `.com` / `hotb.nyc`.
