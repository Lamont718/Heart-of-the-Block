# Translations — review needed

Heart of the Block now supports **English, Español, and Kreyòl (Haitian Creole)**
via a language switcher (🌐 in the header / mobile menu). This is **v1**.

## What's translated now
The **UI shell** that appears on every page:
- Top navigation + mobile menu
- Sign in / Get started / My account / Sign out
- Footer (tagline, section titles, links, copyright, emergency line)
- The language switcher + the "some pages still in English" notice

All strings live in **`src/i18n/dictionaries.ts`** (`en`, `es`, `ht`).

## ⚠️ NEEDS NATIVE-SPEAKER REVIEW
The **Spanish and Haitian Creole** strings in `dictionaries.ts` are a careful
**first pass**, not verified by a native speaker. Before promoting the language
options, have someone fluent review them — especially the **Haitian Creole**.
Edit the values in `dictionaries.ts` and redeploy; nothing else changes.

Likely spots to double-check:
- "Eat for less" → ES `Come por menos` / HT `Manje pou mwens`
- "Healthy buys" → ES `Compras saludables` / HT `Acha ki bon pou sante`
- "Heart-risk check" → ES `Chequeo de riesgo cardíaco` / HT `Tcheke risk kè`
- The footer tagline in both languages.

## Now translated as content (pending HT native review)
- **The ABCs of Life page** (`/abcs`) — fully translated (ES solid, HT first pass).
  Content lives in `src/i18n/content/abcs.ts`; the page renders the locale's text
  server-side from the `hotb_locale` cookie. This is the model for translating the
  rest: a per-locale content file + `getLocale()` in the page.

## What is NOT translated yet (on purpose)
**The rest of the health content stays in English** until a native speaker reviews
it — we do not machine-translate medical content on a trust-based platform. Still
English (next batches, lower-risk first):
- Money-for-Produce / Healthy Buys / Directory body copy (practical, low-risk — good next)
- Recipes (ingredients/steps)
- Learn articles (long-form prose — do last, with the most review)
- The medical-safety disclaimers (SPEC §6)

When a non-English language is selected, a banner tells visitors some pages are
still in English (the `notice` string, already translated).

## How translating content will work (next phase)
1. Decide priority order (suggest: ABCs page → top 3–4 articles → recipes).
2. For each, add a reviewed translation (a per-locale content file or a
   `translations` field on the seed item).
3. Have it reviewed by a native speaker / one of the clinician partners.
4. Swap the "English only" notice off for pages that are fully translated.

## How the system works (for future edits)
- `src/i18n/config.ts` — the locale list + labels + cookie name.
- `src/i18n/dictionaries.ts` — all UI strings, one object per locale (typed, so a
  missing key is a compile error — keeps the languages in sync).
- `src/i18n/provider.tsx` — client provider; stores choice in the `hotb_locale`
  cookie. Renders English first (server + first paint) then adopts the saved
  locale, so there's no hydration mismatch.
- `src/components/language-switcher.tsx` — the 🌐 picker.
- To add a 4th language: add it to `LOCALES` + `LOCALE_LABELS`, then add a full
  dictionary object. TypeScript will tell you what's missing.
