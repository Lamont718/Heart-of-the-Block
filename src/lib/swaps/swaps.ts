import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SWAPS_SEED } from "@/data/swaps-seed";
import type { Swap } from "./types";

/**
 * All food swaps. Reads from the `swaps` table when Supabase is configured and
 * populated; otherwise uses the bundled seed so the Swap Finder works offline /
 * before the DB is wired up.
 */
export async function getSwaps(): Promise<Swap[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("swaps")
        .select(
          "id, original_food, swap_food, reason, category, cultural_tags",
        );
      if (!error && data && data.length > 0) {
        return data as unknown as Swap[];
      }
    } catch {
      // fall through to seed
    }
  }
  return SWAPS_SEED;
}
