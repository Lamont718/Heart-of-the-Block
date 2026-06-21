# KICKOFF.md — how to start building Heart of the Block in Claude Code

Paste the prompt below into Claude Code once SPEC.md and CONTEXT.md are in the repo root.

---

Read SPEC.md and CONTEXT.md in full before writing any code. They are the source of truth
for this project (Heart of the Block — a Brooklyn heart-health platform).

Then begin **step 1 of the build order only** (SPEC §7): project scaffold, Supabase setup,
auth, layout shell, and the medical-safety disclaimer system. Do NOT build later steps yet —
stop after step 1 so we can review before moving on.

Hard rules to honor from the start:
- Tech stack is fixed (SPEC §5): Next.js 14 App Router, Tailwind, Supabase (Postgres + Auth +
  RLS), Vercel. Stripe is stubbed only — no checkout.
- Medical safety (SPEC §6) is non-negotiable: build the persistent disclaimer + first-run
  modal now, as part of the shell, not later.
- Mobile-first and accessible (WCAG AA). The site must be responsive — phone layout AND a wide
  desktop layout from the same codebase.
- Brand voice and design direction live in CONTEXT.md — match them.
- Don't invent seed data (real Brooklyn places, etc.). Use clearly-labeled placeholders where
  real data is needed and list what you need from me.

When step 1 is done, show me: the folder structure, the Supabase schema you created, how auth
works, and how the disclaimer system behaves. Then wait for my go-ahead before step 2
(the directory).
