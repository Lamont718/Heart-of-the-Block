-- Neighbor leaderboard (SPEC Pillar 4 — "real challenges with neighbors").
--
-- Privacy-first: this table holds ONLY engagement data (points + streak) plus
-- the name/neighborhood the user already chose to show. NO health numbers ever
-- live here. Appearing is strictly OPT-IN (opted_in defaults false), and each
-- neighbor writes only their own row.
--
-- Points/streak are computed client-side (computePoints/computeStreak), exactly
-- like the points header — the client upserts its own summary row here. We do
-- it this way (rather than aggregating in SQL) because a challenge's point
-- value + target live in app seed data, not the database, so the client is the
-- single source of truth for the score.
--
-- Run this in Supabase → SQL editor.

create table if not exists public.leaderboard_entries (
  user_id        uuid primary key references auth.users (id) on delete cascade,
  display_name   text,
  neighborhood   text,
  points         integer not null default 0,
  current_streak integer not null default 0,
  opted_in       boolean not null default false,
  updated_at     timestamptz not null default now()
);

alter table public.leaderboard_entries enable row level security;

-- Read: anyone may see opted-in rows (it's a public block board; no health data
-- here). Rows where opted_in is false stay private to their owner.
drop policy if exists "leaderboard: read opted-in" on public.leaderboard_entries;
create policy "leaderboard: read opted-in" on public.leaderboard_entries
  for select using (opted_in = true or auth.uid() = user_id);

-- Write: neighbors manage only their own row.
drop policy if exists "leaderboard: owner insert" on public.leaderboard_entries;
create policy "leaderboard: owner insert" on public.leaderboard_entries
  for insert with check (auth.uid() = user_id);

drop policy if exists "leaderboard: owner update" on public.leaderboard_entries;
create policy "leaderboard: owner update" on public.leaderboard_entries
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "leaderboard: owner delete" on public.leaderboard_entries;
create policy "leaderboard: owner delete" on public.leaderboard_entries
  for delete using (auth.uid() = user_id);

-- Ranked reads.
create index if not exists leaderboard_rank_idx
  on public.leaderboard_entries (opted_in, points desc, current_streak desc);
