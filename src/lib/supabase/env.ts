/**
 * Supabase connection env. Centralised so every entry point degrades the same
 * way: if the project hasn't been wired up yet (placeholders in .env.local),
 * `isSupabaseConfigured` is false and callers no-op instead of crashing. This
 * lets the whole shell run for review before a real Supabase project exists.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  SUPABASE_URL.startsWith("http") &&
  SUPABASE_ANON_KEY.length > 20 &&
  !SUPABASE_URL.includes("your-project");
