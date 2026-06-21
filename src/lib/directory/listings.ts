import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { DIRECTORY_SEED } from "@/data/directory-seed";
import type { DirectoryListing } from "./types";

export type ListingsResult = {
  listings: DirectoryListing[];
  /** True when we're showing placeholder seed data, not real DB rows. */
  usingPlaceholders: boolean;
};

/**
 * Directory listings for the page. Reads from `directory_listings` when Supabase
 * is configured and the table has rows; otherwise falls back to the labelled
 * placeholder seed so the UI is fully reviewable.
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
        };
      }
    } catch {
      // fall through to seed
    }
  }
  return { listings: DIRECTORY_SEED, usingPlaceholders: true };
}
