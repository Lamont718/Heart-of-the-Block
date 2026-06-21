import { createClient } from "./server";
import { isSupabaseConfigured } from "./env";
import type { User } from "@supabase/supabase-js";

/**
 * The authenticated user for the current request, or null. Uses getUser()
 * (which validates the token with Supabase) rather than getSession(), per
 * Supabase's server-side guidance. Returns null when Supabase isn't wired up
 * yet so the shell renders in a logged-out state.
 */
export async function getUser(): Promise<User | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}
