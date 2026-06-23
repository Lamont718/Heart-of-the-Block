-- Migration: per-user favorite swaps.
-- Run once in the Supabase SQL editor (safe to re-run — uses if-not-exists).
-- Needed for syncing the Swap Finder's ♥ favorites to a signed-in account.

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
