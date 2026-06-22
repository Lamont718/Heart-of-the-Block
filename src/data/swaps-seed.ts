import type { Swap } from "@/lib/swaps/types";

/**
 * Food Swap seed — culturally-grounded, heart-smart swaps for the foods
 * Brooklyn actually eats (weighted to Caribbean & soul food, plus common
 * staples). These are general healthy-cooking suggestions written in the
 * "make what you love in a way that loves you back" voice — NOT medical advice
 * and NOT calorie math. Lamont should approve/extend; aim is 50–100 over time.
 *
 * The `reason` always names a plain-language WHY (usually: less saturated fat,
 * less sodium, less added sugar, or more fiber) without lecturing.
 */
const s = (
  id: string,
  original_food: string,
  swap_food: string,
  reason: string,
  category: Swap["category"],
  cultural_tags: string[],
  keywords: string[] = [],
): Swap => ({ id, original_food, swap_food, reason, category, cultural_tags, keywords });

export const SWAPS_SEED: Swap[] = [
  // ---------------- Caribbean ----------------
  s("sw-oxtail", "Oxtail in heavy gravy", "Braised oxtail, fat skimmed, with extra veg", "Skim the fat off the top after it braises — you keep all the flavor you simmered in with far less of the saturated fat.", "caribbean", ["caribbean", "jamaican"], ["oxtail", "beef", "gravy"]),
  s("sw-fried-chicken-jerk", "Fried chicken", "Baked or air-fried jerk/seasoned chicken", "Same crispy, well-seasoned chicken — baking or air-frying skips most of the added fat from the deep fryer.", "caribbean", ["caribbean", "soul-food"], ["fried chicken", "chicken"]),
  s("sw-white-rice", "White rice", "Brown rice, or half brown / half white", "More fiber keeps you full and helps your heart. Start half-and-half so it still tastes like home.", "caribbean", ["caribbean", "soul-food", "staple"], ["white rice", "rice"]),
  s("sw-rice-and-peas", "Rice and peas with full coconut milk", "Rice and peas with light coconut milk (or half the amount)", "Light coconut milk or a smaller pour cuts the saturated fat while keeping that rich, familiar taste.", "caribbean", ["caribbean", "jamaican"], ["rice and peas", "coconut", "peas"]),
  s("sw-fried-plantain", "Fried plantain", "Baked or pan-seared plantain with a little oil", "Roasting brings out the same sweetness with a fraction of the frying oil.", "caribbean", ["caribbean"], ["plantain", "fried"]),
  s("sw-fry-dumpling", "Fried dumpling (fry dumpling)", "Boiled dumpling or spinners", "Boiling instead of frying skips the oil — still soft, filling, and good with everything.", "caribbean", ["caribbean", "jamaican"], ["dumpling", "fry dumpling", "spinner"]),
  s("sw-beef-patty", "Beef patty", "Baked patty, or a chicken / vegetable-filled patty", "A leaner filling and a baked shell mean less saturated fat in every bite.", "caribbean", ["caribbean", "jamaican"], ["beef patty", "patty"]),
  s("sw-pigtail-stew", "Stew with salt beef or pig tail", "Stew with a lean cut, plus a small piece of cured meat just for flavor", "Use the cured meat like a seasoning, not the main — big drop in salt and saturated fat, same soul.", "caribbean", ["caribbean"], ["pig tail", "salt beef", "stew", "saltbeef"]),
  s("sw-festival", "Festival (fried cornmeal)", "Baked festival / cornmeal dough", "Baking the dough keeps it sweet and golden without the deep-fry oil.", "caribbean", ["caribbean", "jamaican"], ["festival", "cornmeal"]),
  s("sw-curry-goat", "Curry goat (fatty cut)", "Curry goat, trimmed and skimmed, loaded with veg", "Trim the fat and skim the curry, then bulk it up with vegetables — rich flavor, lighter on the heart.", "caribbean", ["caribbean"], ["curry goat", "goat", "curry"]),
  s("sw-bun-cheese", "Bun and cheese", "Bun with a thinner slice of cheese + a piece of fruit", "A thinner slice of cheese trims the saturated fat; the fruit fills the plate.", "caribbean", ["caribbean", "jamaican"], ["bun and cheese", "bun", "cheese"]),
  s("sw-sorrel", "Sorrel with lots of sugar", "Sorrel with less sugar, more ginger and spice", "Lean on ginger, cloves, and pimento for flavor so you need less added sugar.", "drinks", ["caribbean"], ["sorrel", "drink", "sugar"]),
  s("sw-coconut-drops", "Coconut drops / heavy sweets", "Fresh mango, papaya, or a small portion", "Fresh tropical fruit satisfies the sweet tooth with fiber instead of added sugar.", "snacks", ["caribbean"], ["coconut drops", "sweets", "dessert"]),

  // ---------------- Soul food ----------------
  s("sw-collards-hamhock", "Collard greens with ham hock", "Collards with smoked turkey, garlic, and a splash of vinegar", "Smoked turkey is leaner than ham hock; garlic, onion, and vinegar let you use less salt.", "soul-food", ["soul-food"], ["collard", "greens", "ham hock", "hamhock"]),
  s("sw-fried-fish", "Fried fish", "Baked or pan-seared seasoned fish", "Fish is already heart-friendly — bake or sear it to keep it that way.", "soul-food", ["soul-food", "caribbean"], ["fried fish", "fish"]),
  s("sw-fried-porkchops", "Fried pork chops", "Baked or grilled pork chops, trimmed", "Trim the edge fat and bake or grill — less saturated fat, same hearty chop.", "soul-food", ["soul-food"], ["pork chop", "pork", "chops"]),
  s("sw-candied-yams", "Candied yams", "Roasted sweet potato with cinnamon and a little maple", "Sweet potatoes are naturally sweet — roast them and go easy on the sugar and butter.", "soul-food", ["soul-food"], ["candied yams", "yams", "sweet potato"]),
  s("sw-mac-cheese", "Macaroni and cheese", "A smaller portion + whole-grain pasta + a sharp cheese", "A sharper cheese means you can use less, and a side of greens balances the plate.", "soul-food", ["soul-food", "caribbean"], ["mac and cheese", "macaroni", "mac"]),
  s("sw-cornbread", "Cornbread with lots of butter", "Cornbread made with oil and less sugar; a smaller piece", "Swapping oil for butter trims saturated fat; a little less sugar goes a long way.", "soul-food", ["soul-food"], ["cornbread", "bread"]),
  s("sw-fried-catfish", "Fried catfish", "Oven-“fried” catfish (cornmeal-crusted, baked)", "A cornmeal crust baked in the oven gives you crunch without the fryer oil.", "soul-food", ["soul-food"], ["catfish", "fried fish"]),
  s("sw-blackeyed-saltpork", "Black-eyed peas with salt pork", "Black-eyed peas with smoked turkey or smoked paprika", "Smoked paprika or a little turkey brings the smoky taste with far less salt and fat.", "soul-food", ["soul-food"], ["black eyed peas", "salt pork", "peas"]),
  s("sw-smothered-chicken", "Smothered chicken in flour-and-fat gravy", "Smothered chicken, skin off, lighter gravy, lots of onions and peppers", "Taking the skin off and thinning the gravy cuts saturated fat; onions and peppers carry the flavor.", "soul-food", ["soul-food"], ["smothered chicken", "gravy", "chicken"]),
  s("sw-sweet-tea", "Sweet tea", "Unsweetened or half-sweet tea with lemon and mint", "Cut the sugar slowly — lemon and mint make it taste like more.", "drinks", ["soul-food"], ["sweet tea", "tea"]),
  s("sw-banana-pudding", "Banana pudding", "Greek-yogurt banana parfait", "Greek yogurt adds creaminess and protein with less added sugar than the custard.", "snacks", ["soul-food"], ["banana pudding", "pudding", "dessert"]),

  // ---------------- Breakfast ----------------
  s("sw-whole-milk", "Whole milk", "1% or skim milk", "Same calcium, a lot less saturated fat — your coffee won’t know the difference.", "breakfast", ["staple"], ["whole milk", "milk"]),
  s("sw-bacon", "Bacon", "Turkey bacon, or a smaller portion of bacon", "Turkey bacon has less saturated fat and salt; if you love the real thing, keep the portion small.", "breakfast", ["soul-food"], ["bacon", "pork"]),
  s("sw-sausage", "Sausage links", "Chicken or turkey sausage", "Poultry sausage keeps the spice and savor with less saturated fat.", "breakfast", [], ["sausage", "links"]),
  s("sw-sugary-cereal", "Sugary cereal", "Oatmeal with fruit and cinnamon", "Oats bring fiber that helps your cholesterol; fruit and cinnamon handle the sweetness.", "breakfast", ["staple"], ["cereal", "oatmeal", "oats"]),
  s("sw-white-toast", "White toast with butter", "Whole-grain toast with avocado or nut butter", "Whole grain adds fiber and avocado brings a heart-friendly fat.", "breakfast", ["staple"], ["toast", "white bread", "butter"]),
  s("sw-saltfish", "Saltfish (very salty)", "Soak the saltfish longer (or use fresh fish), then add tomato, onion, and pepper", "Soaking pulls out a lot of the salt; fresh veg makes it taste full without more.", "breakfast", ["caribbean"], ["saltfish", "salt fish", "ackee"]),
  s("sw-fried-eggs-butter", "Eggs fried in butter", "Eggs in a little olive oil, or boiled", "Olive oil swaps saturated fat for a heart-friendly fat; boiling uses none.", "breakfast", ["staple"], ["eggs", "fried egg", "butter"]),

  // ---------------- Drinks ----------------
  s("sw-soda", "Soda / pop", "Seltzer with a squeeze of fruit", "All the fizz, none of the added sugar — add lime, orange, or a splash of juice.", "drinks", ["staple"], ["soda", "pop", "cola"]),
  s("sw-fruit-punch", "Fruit punch / juice drinks", "Whole fruit plus water, or 100% juice in a small glass", "Whole fruit gives you fiber the punch can’t; a small glass of real juice scratches the itch.", "drinks", ["staple"], ["fruit punch", "juice", "punch"]),
  s("sw-creamer", "Sweetened coffee creamer", "Low-fat milk with a little cinnamon or vanilla", "Skip the added sugar and oils in flavored creamers — spice does the work.", "drinks", ["staple"], ["creamer", "coffee"]),
  s("sw-energy-drink", "Energy drinks", "Water, or green tea for a lift", "Green tea gives you a gentle lift without the sugar and heavy caffeine load.", "drinks", [], ["energy drink", "energy"]),

  // ---------------- Snacks ----------------
  s("sw-chips", "Potato chips", "Air-popped popcorn or a handful of unsalted nuts", "Popcorn is a whole grain; unsalted nuts bring good fats — both beat the salt and oil of chips.", "snacks", ["staple"], ["chips", "potato chips", "crisps"]),
  s("sw-cheese-doodles", "Cheese doodles / fried snacks", "Roasted chickpeas or nuts", "Crunchy and savory with fiber and good fats instead of fried starch and salt.", "snacks", [], ["cheese doodles", "fried snacks", "puffs"]),
  s("sw-candy", "Candy", "Fresh or frozen fruit", "Frozen grapes or mango hit the sweet spot with fiber and no added sugar.", "snacks", ["staple"], ["candy", "sweets"]),
  s("sw-ice-cream", "Ice cream", "Frozen yogurt or banana “nice cream”", "Blended frozen banana is creamy and naturally sweet, with far less saturated fat.", "snacks", ["staple"], ["ice cream", "dessert"]),
  s("sw-crackers-cheese", "Crackers with processed cheese", "Whole-grain crackers with hummus", "Hummus brings fiber and good fat instead of the salt and saturated fat of processed cheese.", "snacks", ["staple"], ["crackers", "cheese", "processed cheese"]),

  // ---------------- Cooking & staples ----------------
  s("sw-lard-butter", "Cooking with lard or butter", "Cook with olive or canola oil", "Plant oils trade saturated fat for fats that are easier on your heart.", "cooking", ["staple", "caribbean", "soul-food"], ["lard", "butter", "cooking oil", "shortening"]),
  s("sw-deep-frying", "Deep-frying", "Bake, roast, air-fry, or pan-sear", "Same crispy results with a fraction of the oil soaking in.", "cooking", ["staple", "caribbean", "soul-food"], ["deep fry", "frying", "fried"]),
  s("sw-salt", "Lots of salt, adobo, or bouillon", "Salt-free seasoning blends, citrus, fresh herbs, and garlic", "Garlic, onion, citrus, and herbs build big flavor so you can ease up on the salt that raises blood pressure.", "cooking", ["staple", "caribbean"], ["salt", "adobo", "sazon", "seasoning", "sodium"]),
  s("sw-canned-veg", "Salty canned vegetables", "Rinse canned veg, or use frozen / fresh", "A quick rinse washes off a lot of the sodium; frozen veg is just as good as fresh.", "cooking", ["staple"], ["canned vegetables", "canned veg", "vegetables"]),
  s("sw-canned-beans", "Salty canned beans", "Rinse canned beans, or cook dried beans", "Rinsing cuts the sodium; beans are a heart-friendly source of fiber and protein either way.", "cooking", ["staple", "caribbean"], ["canned beans", "beans"]),
  s("sw-ground-beef", "Ground beef (80/20)", "Lean ground beef (90/10) or ground turkey, fat drained", "A leaner blend and draining the fat cut the saturated fat without changing the recipe.", "cooking", ["staple", "soul-food"], ["ground beef", "beef", "mince"]),
  s("sw-white-bread", "White bread", "100% whole-grain bread", "Whole grain adds the fiber that helps your heart and keeps you full.", "cooking", ["staple"], ["white bread", "bread"]),
  s("sw-white-pasta", "White pasta", "Whole-grain or chickpea pasta", "More fiber (and with chickpea pasta, more protein) for a steadier, fuller meal.", "cooking", ["staple"], ["pasta", "white pasta", "spaghetti"]),
  s("sw-bouillon", "Bouillon cubes", "Low-sodium broth plus herbs", "Most of a bouillon cube is salt — low-sodium broth and herbs give flavor without it.", "cooking", ["staple", "caribbean"], ["bouillon", "stock cube", "maggi"]),
  s("sw-sour-cream", "Sour cream", "Plain Greek yogurt", "Greek yogurt is just as creamy and tangy with less saturated fat and more protein.", "cooking", ["staple"], ["sour cream"]),
  s("sw-mayo", "Heavy mayonnaise", "Mashed avocado, mustard, or light mayo", "Avocado and mustard add flavor and good fats in place of the saturated fat.", "cooking", ["staple"], ["mayo", "mayonnaise"]),
  s("sw-butter-veg", "Butter on vegetables", "Olive oil with lemon and garlic", "A drizzle of olive oil with lemon and garlic is just as satisfying and better for your heart.", "cooking", ["staple"], ["butter", "vegetables", "veg"]),
  s("sw-cream-sauce", "Cream-based sauces", "Tomato- or broth-based sauces", "Tomato and broth bases skip the heavy cream and its saturated fat.", "cooking", ["staple"], ["cream sauce", "alfredo", "cream"]),
  s("sw-salted-nuts", "Salted nuts", "Unsalted nuts", "Nuts are great for your heart — just lose the added salt.", "snacks", ["staple"], ["salted nuts", "nuts"]),
];
