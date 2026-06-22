import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { DIRECTORY_SEED } from "@/data/directory-seed";
import type { DirectoryListing } from "./types";

export type ListingsResult = {
  listings: DirectoryListing[];
  /** True only if no real listings are available (should not happen now that
   *  the seed holds the verified Brooklyn set). */
  usingPlaceholders: boolean;
  /** True when listings come from the bundled seed rather than the live DB. */
  fromSeed: boolean;
};

/**
 * Directory listings for the page. Reads from `directory_listings` when Supabase
 * is configured and the table has rows; otherwise falls back to the bundled
 * seed — which now holds the REAL, address-verified Brooklyn list (June 2026),
 * so the directory is fully usable even before Supabase is wired up.
 */
export async function getListings(): Promise<ListingsResult> {
  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("directory_listings")
        .select(
          "id, name, address, lat, lng, category, hours, highlights, tags, verified",
        )
        .order("name");
      if (!error && data && data.length > 0) {
        return {
          listings: data as unknown as DirectoryListing[],
          usingPlaceholders: false,
          fromSeed: false,
        };
      }
    } catch {
      // fall through to seed
    }
  }
  return { listings: DIRECTORY_SEED, usingPlaceholders: false, fromSeed: true };
}
