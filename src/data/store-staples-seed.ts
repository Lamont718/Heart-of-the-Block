/**
 * Healthy staples by store — what to grab at the stores around Brooklyn, and
 * roughly what it costs.
 *
 * PRICES ARE TYPICAL BROOKLYN ESTIMATES, NOT LIVE QUOTES. Grocery prices change
 * week to week and vary by location, so every price here is rounded and labelled
 * "~" / "approx." on the page, with a "last checked" date and a "check the shelf"
 * note. Per CONTEXT.md we do not invent precise/real-time prices. When real,
 * verified per-store prices are collected (by Lamont or the community), update
 * the numbers here and bump PRICES_LAST_CHECKED.
 */

export const PRICES_LAST_CHECKED = "June 2026";

export type Staple = {
  name: string;
  emoji: string;
  price: string; // always shown with a "~" on the page
  why: string;
};

export type Store = {
  id: string;
  name: string;
  kind: string; // short badge: "Warehouse club", "Discount grocer", etc.
  blurb: string; // what this store is good for
  note?: string; // gotchas: membership, bring bags, fewer locations…
  staples: Staple[];
};

export const STORES: Store[] = [
  {
    id: "bjs",
    name: "BJ's Wholesale",
    kind: "Warehouse club",
    blurb: "Best for buying the basics in bulk and splitting with family or neighbors.",
    note: "Membership required. Worth it if you cook at home a lot or shop for a big household.",
    staples: [
      { name: "Brown rice (10 lb)", emoji: "🍚", price: "$9", why: "Whole grain — a lot more fiber than white rice." },
      { name: "Dried beans (4 lb)", emoji: "🫘", price: "$6", why: "Protein and fiber with no added salt. Soak and freeze." },
      { name: "Canned wild salmon (6-pack)", emoji: "🐟", price: "$13", why: "Omega-3 fats that are good for your heart." },
      { name: "Frozen mixed vegetables (4 lb)", emoji: "🥦", price: "$7", why: "No prep, no salt, ready in the freezer for weeks." },
      { name: "Old-fashioned oats (10 lb)", emoji: "🥣", price: "$9", why: "Eaten regularly, oats help lower cholesterol." },
      { name: "Olive oil (2 L)", emoji: "🫒", price: "$18", why: "A heart-healthier fat to cook with than butter or lard." },
      { name: "Eggs (24 ct)", emoji: "🥚", price: "$7", why: "Affordable protein that stretches across the week." },
    ],
  },
  {
    id: "aldi",
    name: "Aldi",
    kind: "Discount grocer",
    blurb: "Usually the lowest prices in the neighborhood on everyday healthy basics.",
    note: "Bring your own bags and a quarter for the cart.",
    staples: [
      { name: "Canned black beans (15 oz)", emoji: "🫘", price: "$1", why: "About the cheapest protein there is. Rinse to cut the salt." },
      { name: "Frozen broccoli (12 oz)", emoji: "🥦", price: "$1.50", why: "Fiber and vitamin C that keeps for months." },
      { name: "Bananas (per lb)", emoji: "🍌", price: "$0.50", why: "Potassium helps keep blood pressure in check." },
      { name: "Rolled oats (42 oz)", emoji: "🥣", price: "$3.50", why: "A heart-smart breakfast for pennies a bowl." },
      { name: "Brown rice (2 lb)", emoji: "🍚", price: "$2", why: "An easy whole-grain swap for white rice." },
      { name: "Eggs (dozen)", emoji: "🥚", price: "$3", why: "Often the lowest egg price around." },
      { name: "Natural peanut butter", emoji: "🥜", price: "$3", why: "Look for the kind that's just peanuts — no added sugar or oil." },
    ],
  },
  {
    id: "shoprite",
    name: "ShopRite",
    kind: "Supermarket",
    blurb: "Big selection and weekly sales — load the Price Plus card for the deals.",
    staples: [
      { name: "Dried red kidney beans (1 lb)", emoji: "🫘", price: "$2", why: "Rice and peas, done heart-smart with real fiber." },
      { name: "No-salt canned tomatoes (28 oz)", emoji: "🍅", price: "$1.75", why: "A stew base without the sodium hit." },
      { name: "Frozen mixed vegetables (12 oz)", emoji: "🥦", price: "$1.50", why: "Toss a handful into almost anything." },
      { name: "Sweet potatoes (per lb)", emoji: "🍠", price: "$1.25", why: "Fiber and natural sweetness, no added sugar." },
      { name: "Canned salmon (5 oz)", emoji: "🐟", price: "$3", why: "Shelf-stable omega-3s for salmon patties or salad." },
      { name: "Low-sodium chicken broth", emoji: "🍲", price: "$2.50", why: "Flavor your pot without the salt." },
      { name: "Old-fashioned oats (18 oz)", emoji: "🥣", price: "$4", why: "Cholesterol-friendly and filling." },
    ],
  },
  {
    id: "keyfood",
    name: "Key Food",
    kind: "Neighborhood supermarket",
    blurb: "Right on the block, and stocked with the foods Brooklyn actually cooks.",
    staples: [
      { name: "Collard greens (bunch)", emoji: "🥬", price: "$2.50", why: "Greens are great — just go easy on the salt pork." },
      { name: "Plantains (each)", emoji: "🍌", price: "$0.70", why: "Bake or boil them instead of frying." },
      { name: "Canned sardines", emoji: "🐟", price: "$1.50", why: "Tiny fish, big omega-3s, tiny price." },
      { name: "Sweet potatoes (per lb)", emoji: "🍠", price: "$1.30", why: "A Sunday-dinner staple, made a little better for you." },
      { name: "Dried pigeon peas (1 lb)", emoji: "🫛", price: "$2.50", why: "For rice and peas with real fiber in it." },
      { name: "Eggs (dozen)", emoji: "🥚", price: "$4", why: "Protein that goes a long way." },
      { name: "Brown rice (2 lb)", emoji: "🍚", price: "$3", why: "Swap it in for white rice a little at a time." },
    ],
  },
  {
    id: "ctown",
    name: "C-Town",
    kind: "Neighborhood grocer",
    blurb: "Reliable for cheap, filling staples close to home.",
    staples: [
      { name: "Cabbage (head)", emoji: "🥬", price: "$2", why: "Cheap, filling, and good for you — stretches a meal." },
      { name: "Dried beans (1 lb)", emoji: "🫘", price: "$2", why: "Soak overnight and save money over the canned kind." },
      { name: "Bananas (per lb)", emoji: "🍌", price: "$0.70", why: "Grab-and-go potassium." },
      { name: "Canned beans (15 oz)", emoji: "🫘", price: "$1.25", why: "No time to soak? Rinse the can to wash off salt." },
      { name: "Onions & garlic (3 lb)", emoji: "🧅", price: "$3", why: "Build flavor without reaching for the salt." },
      { name: "Oats (18 oz)", emoji: "🥣", price: "$4", why: "Start the day heart-smart." },
      { name: "Frozen spinach", emoji: "🥬", price: "$2", why: "Iron and fiber that keeps for months." },
    ],
  },
  {
    id: "traderjoes",
    name: "Trader Joe's",
    kind: "Specialty grocer",
    blurb: "Fewer locations, but cheap, clean basics with short ingredient lists.",
    note: "Not in every neighborhood — worth a trip for the staples below.",
    staples: [
      { name: "Frozen brown rice (3-pack)", emoji: "🍚", price: "$3", why: "Whole-grain rice in 3 minutes, no pot to watch." },
      { name: "No-salt-added canned beans", emoji: "🫘", price: "$1", why: "Clean ingredient list — just beans and water." },
      { name: "Unsalted mixed nuts", emoji: "🥜", price: "$6", why: "A heart-healthy snack — keep the portion to a handful." },
      { name: "Frozen wild salmon", emoji: "🐟", price: "$7", why: "Omega-3s on a budget, straight from the freezer." },
      { name: "Rolled oats", emoji: "🥣", price: "$3", why: "Some of the cheapest clean oats around." },
      { name: "Bananas (each)", emoji: "🍌", price: "$0.20", why: "The famous 19¢ banana — potassium for next to nothing." },
      { name: "Frozen mixed berries", emoji: "🫐", price: "$4", why: "Antioxidants with no added sugar." },
    ],
  },
];
