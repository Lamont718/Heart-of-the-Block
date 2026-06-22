/** Food Swap domain types. Mirrors the `swaps` table (CONTEXT). */

export interface Swap {
  id: string;
  original_food: string;
  swap_food: string;
  /** Plain-language "why this loves your heart back". Never clinical. */
  reason: string;
  category: SwapCategory;
  cultural_tags: string[];
  /** Extra terms to match free-text searches against. */
  keywords?: string[];
}

export type SwapCategory =
  | "caribbean"
  | "soul-food"
  | "breakfast"
  | "drinks"
  | "snacks"
  | "cooking";

export const SWAP_CATEGORY_META: Record<
  SwapCategory,
  { label: string; emoji: string }
> = {
  caribbean: { label: "Caribbean", emoji: "🌴" },
  "soul-food": { label: "Soul food", emoji: "🍗" },
  breakfast: { label: "Breakfast", emoji: "🍳" },
  drinks: { label: "Drinks", emoji: "🥤" },
  snacks: { label: "Snacks", emoji: "🍿" },
  cooking: { label: "Cooking & staples", emoji: "🧂" },
};
