-- Migration: sync plan progress and community/challenge progress to accounts.
-- Run once in the Supabase SQL editor (safe to re-run — uses if-not-exists).
--
-- Plans and challenges are seed content (not rows in public.plans /
-- public.challenges), so completion is tracked by slug + index/date here
-- rather than via the UUID-FK tables. check_ins and activity_logs (already in
-- the base schema) are reused as-is for daily check-ins and movement logs.

-- One row per completed plan day.
create table if not exists public.user_plan_days (
  user_id    uuid not null references auth.users (id) on delete cascade,
  plan_slug  text not null,
  day_index  int  not null,
  created_at timestamptz not null default now(),
  primary key (user_id, plan_slug, day_index)
);

alter table public.user_plan_days enable row level security;
drop policy if exists "user_plan_days: owner all" on public.user_plan_days;
create policy "user_plan_days: owner all" on public.user_plan_days
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- One row per day a user made progress on a challenge.
create table if not exists public.challenge_days (
  user_id        uuid not null references auth.users (id) on delete cascade,
  challenge_slug text not null,
  progressed_on  date not null default current_date,
  created_at     timestamptz not null default now(),
  primary key (user_id, challenge_slug, progressed_on)
);

alter table public.challenge_days enable row level security;
drop policy if exists "challenge_days: owner all" on public.challenge_days;
create policy "challenge_days: owner all" on public.challenge_days
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
