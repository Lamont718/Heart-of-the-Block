/** Directory domain types. Mirrors the `directory_listings` table (CONTEXT). */

export type ListingCategory =
  | "grocer"
  | "market"
  | "health_food_store"
  | "farmers_market";

/** A single open/close window, 24h "HH:MM". A day with no windows = closed. */
export type HoursWindow = { open: string; close: string };

/** Weekly hours keyed by lowercase 3-letter day. Missing/empty = closed. */
export type WeeklyHours = Partial<Record<DayKey, HoursWindow[]>>;

export type DayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export interface DirectoryListing {
  id: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  category: ListingCategory;
  hours: WeeklyHours;
  highlights: string | null;
  tags: string[];
  verified: boolean;
}

export const CATEGORY_META: Record<
  ListingCategory,
  { label: string; short: string; emoji: string }
> = {
  grocer: { label: "Grocer", short: "Grocers", emoji: "🛒" },
  market: { label: "Market", short: "Markets", emoji: "🏪" },
  health_food_store: {
    label: "Health-food store",
    short: "Health food",
    emoji: "🥑",
  },
  farmers_market: {
    label: "Farmers market",
    short: "Farmers markets",
    emoji: "🧺",
  },
};

/** Tag we treat as the "has fresh produce" filter. */
export const FRESH_PRODUCE_TAG = "fresh-produce";
