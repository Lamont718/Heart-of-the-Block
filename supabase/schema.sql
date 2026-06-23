-- ============================================================================
-- Heart of the Block — database schema
-- Postgres + Supabase Auth + Row Level Security
--
-- Run this in the Supabase SQL Editor (or `supabase db push`) on a fresh
-- project. It is idempotent-ish: safe to re-run, but it will not drop data.
--
-- RLS PRINCIPLE (SPEC §6): personal health data is owner-only. Public reference
-- content (directory, swaps, articles, plans) is world-readable, writable only
-- by the service role (seeding / admin).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type health_log_type as enum ('a1c', 'cholesterol', 'bp', 'weight');
exception when duplicate_object then null; end $$;
-- For databases created before 'a1c' existed (the "A" of the ABCs of Life):
alter type health_log_type add value if not exists 'a1c';

do $$ begin
  create type activity_type as enum ('walk', 'home_workout', 'other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type listing_category as enum
    ('grocer', 'market', 'health_food_store', 'farmers_market');
exception when duplicate_object then null; end $$;

do $$ begin
  create type scan_score as enum ('good', 'okay', 'limit');
exception when duplicate_object then null; end $$;

-- ===========================================================================
-- 1. PROFILES  (1:1 with auth.users)
-- ===========================================================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  email         text,
  display_name  text,
  neighborhood  text,
  age_range     text,
  goals         text[] default '{}',
  created_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: owner read" on public.profiles;
create policy "profiles: owner read" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles: owner update" on public.profiles;
create policy "profiles: owner update" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles: owner insert" on public.profiles;
create policy "profiles: owner insert" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===========================================================================
-- 2. HEALTH LOGS  (owner-only)  — cholesterol | bp | weight
-- ===========================================================================
create table if not exists public.health_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  type        health_log_type not null,
  -- flexible values: weight {kg|lb}, bp {systolic, diastolic}, cholesterol {total, ldl, hdl, trig}
  values      jsonb not null default '{}',
  note        text,
  recorded_at timestamptz not null default now(),
  created_at  timestamptz not null default now()
);
create index if not exists health_logs_user_time
  on public.health_logs (user_id, type, recorded_at desc);

alter table public.health_logs enable row level security;
drop policy if exists "health_logs: owner all" on public.health_logs;
create policy "health_logs: owner all" on public.health_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- 3. WEIGHT GOALS  (owner-only)
-- ===========================================================================
create table if not exists public.weight_goals (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  start_weight  numeric not null,
  target_weight numeric not null,
  unit          text not null default 'lb',
  start_date    date not null default current_date,
  target_date   date,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);
create index if not exists weight_goals_user on public.weight_goals (user_id, active);

alter table public.weight_goals enable row level security;
drop policy if exists "weight_goals: owner all" on public.weight_goals;
create policy "weight_goals: owner all" on public.weight_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- 4. ACTIVITY LOGS  (owner-only)
-- ===========================================================================
create table if not exists public.activity_logs (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  activity_type     activity_type not null default 'walk',
  minutes           int,
  steps             int,
  linked_plan_day_id uuid,  -- fk wired once plan_days exists (see §11)
  logged_at         timestamptz not null default now()
);
create index if not exists activity_logs_user_time
  on public.activity_logs (user_id, logged_at desc);

alter table public.activity_logs enable row level security;
drop policy if exists "activity_logs: owner all" on public.activity_logs;
create policy "activity_logs: owner all" on public.activity_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- 5. DIRECTORY LISTINGS  (public read; healthy spots only)
-- ===========================================================================
create table if not exists public.directory_listings (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  address    text not null,
  lat        double precision,
  lng        double precision,
  category   listing_category not null,
  hours      jsonb default '{}',
  highlights text,
  tags       text[] default '{}',
  verified   boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists directory_category on public.directory_listings (category);

alter table public.directory_listings enable row level security;
drop policy if exists "directory: public read" on public.directory_listings;
create policy "directory: public read" on public.directory_listings
  for select using (true);
-- writes: service role only (no policy → blocked for anon/authenticated)

-- ===========================================================================
-- 6. SWAPS  (public read) — Food Swap Finder seed data
-- ===========================================================================
create table if not exists public.swaps (
  id            uuid primary key default gen_random_uuid(),
  original_food text not null,
  swap_food     text not null,
  reason        text not null,
  category      text,
  cultural_tags text[] default '{}',
  created_at    timestamptz not null default now()
);

alter table public.swaps enable row level security;
drop policy if exists "swaps: public read" on public.swaps;
create policy "swaps: public read" on public.swaps
  for select using (true);

-- Per-user favorite swaps. Keyed by the swap's slug/id so it works for seed
-- swaps that aren't rows in public.swaps; therefore no FK to public.swaps.
create table if not exists public.saved_swaps (
  user_id    uuid not null references auth.users (id) on delete cascade,
  swap_slug  text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, swap_slug)
);

alter table public.saved_swaps enable row level security;
drop policy if exists "saved_swaps: owner all" on public.saved_swaps;
create policy "saved_swaps: owner all" on public.saved_swaps
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- 7. SCANNED ITEMS  (owner-only for saved scans)
-- ===========================================================================
create table if not exists public.scanned_items (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  barcode_upc      text not null,
  product_name     text,
  brand            text,
  nutrition        jsonb default '{}',  -- {sat_fat, sodium, added_sugar, fiber, trans_fat} per serving
  score            scan_score,
  score_reasons    text[] default '{}',
  suggested_swap_id uuid references public.swaps (id) on delete set null,
  scanned_at       timestamptz not null default now()
);
create index if not exists scanned_items_user_time
  on public.scanned_items (user_id, scanned_at desc);

alter table public.scanned_items enable row level security;
drop policy if exists "scanned_items: owner all" on public.scanned_items;
create policy "scanned_items: owner all" on public.scanned_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- 8. ARTICLES  (public read)
-- ===========================================================================
create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  body          text not null default '',
  topic_tags    text[] default '{}',
  reading_level text,
  audio_url     text,
  published     boolean not null default false,
  created_at    timestamptz not null default now()
);
create index if not exists articles_published on public.articles (published);

alter table public.articles enable row level security;
drop policy if exists "articles: public read published" on public.articles;
create policy "articles: public read published" on public.articles
  for select using (published = true);

-- ===========================================================================
-- 9-11. GUIDED PLANS  (public read)
-- ===========================================================================
create table if not exists public.plans (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  kind        text not null,            -- 'meal' | 'exercise'
  description text,
  audience    jsonb default '{}',       -- {age, mobility, goals[]}
  created_at  timestamptz not null default now()
);

create table if not exists public.plan_days (
  id        uuid primary key default gen_random_uuid(),
  plan_id   uuid not null references public.plans (id) on delete cascade,
  day_index int not null,
  title     text,
  notes     text
);

create table if not exists public.exercises (
  id           uuid primary key default gen_random_uuid(),
  plan_day_id  uuid references public.plan_days (id) on delete cascade,
  name         text not null,
  instructions text,
  minutes      int,
  no_equipment boolean not null default true,
  seated_ok    boolean not null default false
);

create table if not exists public.meals (
  id           uuid primary key default gen_random_uuid(),
  plan_day_id  uuid references public.plan_days (id) on delete cascade,
  name         text not null,
  ingredients  text[] default '{}',
  instructions text,
  bodega_friendly boolean not null default true
);

-- Now that plan_days exists, wire the activity_logs fk.
do $$ begin
  alter table public.activity_logs
    add constraint activity_logs_plan_day_fk
    foreign key (linked_plan_day_id)
    references public.plan_days (id) on delete set null;
exception when duplicate_object then null; end $$;

create table if not exists public.user_plan_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  plan_id     uuid not null references public.plans (id) on delete cascade,
  plan_day_id uuid references public.plan_days (id) on delete set null,
  completed   boolean not null default false,
  completed_at timestamptz,
  created_at  timestamptz not null default now()
);
create index if not exists upp_user on public.user_plan_progress (user_id);

-- public-read plan content
alter table public.plans enable row level security;
alter table public.plan_days enable row level security;
alter table public.exercises enable row level security;
alter table public.meals enable row level security;
drop policy if exists "plans: public read" on public.plans;
create policy "plans: public read" on public.plans for select using (true);
drop policy if exists "plan_days: public read" on public.plan_days;
create policy "plan_days: public read" on public.plan_days for select using (true);
drop policy if exists "exercises: public read" on public.exercises;
create policy "exercises: public read" on public.exercises for select using (true);
drop policy if exists "meals: public read" on public.meals;
create policy "meals: public read" on public.meals for select using (true);

-- owner-only progress
alter table public.user_plan_progress enable row level security;
drop policy if exists "upp: owner all" on public.user_plan_progress;
create policy "upp: owner all" on public.user_plan_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- 12. COMMUNITY & ACCOUNTABILITY
-- ===========================================================================
create table if not exists public.check_ins (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  kind        text not null default 'daily',
  note        text,
  checked_in_on date not null default current_date,
  created_at  timestamptz not null default now(),
  unique (user_id, kind, checked_in_on)
);

create table if not exists public.streaks (
  user_id        uuid primary key references auth.users (id) on delete cascade,
  current_count  int not null default 0,
  longest_count  int not null default 0,
  last_check_in  date,
  updated_at     timestamptz not null default now()
);

create table if not exists public.challenges (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  starts_on   date,
  ends_on     date,
  created_at  timestamptz not null default now()
);

create table if not exists public.challenge_participants (
  id            uuid primary key default gen_random_uuid(),
  challenge_id  uuid not null references public.challenges (id) on delete cascade,
  user_id       uuid not null references auth.users (id) on delete cascade,
  points        int not null default 0,
  joined_at     timestamptz not null default now(),
  unique (challenge_id, user_id)
);

-- owner-only
alter table public.check_ins enable row level security;
drop policy if exists "check_ins: owner all" on public.check_ins;
create policy "check_ins: owner all" on public.check_ins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.streaks enable row level security;
drop policy if exists "streaks: owner all" on public.streaks;
create policy "streaks: owner all" on public.streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- challenges are public to read
alter table public.challenges enable row level security;
drop policy if exists "challenges: public read" on public.challenges;
create policy "challenges: public read" on public.challenges
  for select using (true);

-- participants: a user manages their own row; the leaderboard is readable by all
alter table public.challenge_participants enable row level security;
drop policy if exists "cp: public read" on public.challenge_participants;
create policy "cp: public read" on public.challenge_participants
  for select using (true);
drop policy if exists "cp: owner write" on public.challenge_participants;
create policy "cp: owner write" on public.challenge_participants
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ===========================================================================
-- 11b. SLUG-KEYED PROGRESS  (plans & challenges are seed content, not DB rows,
--      so these track completion by slug + index/date instead of UUID FKs.)
-- ===========================================================================

-- One row per completed plan day (plan_slug + day_index).
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

-- One row per day a user made progress on a challenge (challenge_slug + date).
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

-- ============================================================================
-- End of schema.
-- ============================================================================
