import type { Plan, Meal, Exercise, PlanDay } from "@/lib/plans/types";

/**
 * Guided plans seed (SPEC Pillar 3). Meal plans use affordable, bodega-friendly
 * ingredients; exercise plans need no gym (walking, home, and chair routines for
 * older adults). General wellness guidance, not medical/dietary prescription —
 * plans route to a doctor (§6). Lamont can approve/extend.
 */
const m = (
  slot: Meal["slot"],
  name: string,
  ingredients: string[],
  note?: string,
): Meal => ({ slot, name, ingredients, note });

const e = (
  name: string,
  instructions: string,
  minutes?: number,
  seated?: boolean,
): Exercise => ({ name, instructions, minutes, seated });

const day = (index: number, title: string, body: Partial<PlanDay>): PlanDay => ({
  index,
  title,
  ...body,
});

export const PLANS_SEED: Plan[] = [
  // ============================ MEAL PLANS ============================
  {
    id: "plan-starter-5day",
    slug: "heart-smart-starter-5-day",
    title: "5-Day Heart-Smart Starter",
    kind: "meal",
    description:
      "A whole work-week of simple, filling meals built from things you can grab at the bodega or corner store — beans, eggs, oats, canned fish, frozen veg, rice. Nothing fancy, nothing wasted.",
    lengthLabel: "5 days",
    audience: { goals: ["start", "weight"], mobility: "any", level: "beginner" },
    tags: ["budget", "beginner", "weight"],
    days: [
      day(1, "Day 1", {
        meals: [
          m("breakfast", "Oatmeal with banana & cinnamon", ["oats", "banana", "cinnamon", "low-fat milk"]),
          m("lunch", "Black bean & rice bowl", ["canned black beans (rinsed)", "brown rice", "salsa", "frozen corn"], "Rinsing the beans washes off a lot of the salt."),
          m("dinner", "Baked chicken & roasted vegetables", ["chicken thighs (skin off)", "frozen mixed veg", "olive oil", "garlic"]),
        ],
      }),
      day(2, "Day 2", {
        meals: [
          m("breakfast", "Eggs & whole-grain toast", ["eggs", "whole-grain bread", "tomato"]),
          m("lunch", "Tuna salad sandwich", ["canned tuna", "mustard or light mayo", "whole-grain bread", "lettuce"]),
          m("dinner", "Stewed beans with rice & spinach", ["canned kidney beans", "rice", "frozen spinach", "onion", "garlic"]),
        ],
      }),
      day(3, "Day 3", {
        meals: [
          m("breakfast", "Yogurt, fruit & oats", ["plain Greek yogurt", "frozen berries", "oats"]),
          m("lunch", "Lentil soup", ["lentils", "carrot", "onion", "low-sodium broth"]),
          m("dinner", "Baked fish & sweet potato", ["tilapia or whiting", "sweet potato", "olive oil", "lemon", "pepper"]),
        ],
      }),
      day(4, "Day 4", {
        meals: [
          m("breakfast", "Peanut butter & banana toast", ["whole-grain bread", "peanut butter", "banana"]),
          m("lunch", "Chickpea salad", ["canned chickpeas (rinsed)", "cucumber", "tomato", "olive oil", "lemon"]),
          m("dinner", "Turkey chili", ["lean ground turkey", "canned tomatoes (no salt added)", "beans", "onion", "peppers"]),
        ],
      }),
      day(5, "Day 5", {
        meals: [
          m("breakfast", "Oatmeal with berries", ["oats", "frozen berries", "cinnamon"]),
          m("lunch", "Leftover turkey chili + side salad", ["yesterday's chili", "mixed greens", "olive oil", "vinegar"]),
          m("dinner", "Veggie stir-fry with rice", ["frozen stir-fry veg", "eggs or chicken", "brown rice", "low-sodium soy sauce", "ginger"]),
        ],
      }),
    ],
  },
  {
    id: "plan-caribbean-lighter",
    slug: "caribbean-comfort-lighter-5-day",
    title: "Caribbean Comfort, Lighter",
    kind: "meal",
    description:
      "The food that tastes like home, cooked a little kinder to your heart — baked jerk chicken, rice and peas with more fiber, stewed fish, callaloo. Same flavor, less of the fat and salt.",
    lengthLabel: "5 days",
    audience: { goals: ["weight", "blood-pressure"], mobility: "any" },
    tags: ["caribbean", "lower-salt", "weight"],
    days: [
      day(1, "Day 1", {
        meals: [
          m("breakfast", "Saltfish & callaloo with ground provision", ["soaked saltfish", "callaloo", "onion", "tomato", "boiled green banana"], "Soak the saltfish longer to pull out the salt."),
          m("lunch", "Brown stew chicken (skin off) with salad", ["chicken (skin off)", "browning", "thyme", "scallion", "mixed greens"]),
          m("dinner", "Baked jerk chicken with rice & peas (lighter)", ["chicken", "jerk seasoning", "brown rice", "kidney beans", "light coconut milk"]),
        ],
      }),
      day(2, "Day 2", {
        meals: [
          m("breakfast", "Oats porridge with cinnamon & nutmeg", ["oats", "low-fat milk", "cinnamon", "nutmeg", "banana"]),
          m("lunch", "Stewed peas with a small piece of lean meat", ["gungo or red peas", "lean beef (small amount)", "thyme", "garlic", "rice"]),
          m("dinner", "Steamed fish with okra & provisions", ["whole fish or fillet", "okra", "tomato", "onion", "boiled dasheen"]),
        ],
      }),
      day(3, "Day 3", {
        meals: [
          m("breakfast", "Ackee & tomato with whole-grain bread", ["ackee", "tomato", "onion", "whole-grain bread"]),
          m("lunch", "Curry chickpea (channa) with rice", ["canned chickpeas", "curry powder", "onion", "garlic", "brown rice"]),
          m("dinner", "Pepper-pot style greens with baked chicken", ["callaloo or spinach", "baked chicken", "scallion", "thyme"]),
        ],
      }),
      day(4, "Day 4", {
        meals: [
          m("breakfast", "Cornmeal porridge (less sugar)", ["cornmeal", "low-fat milk", "cinnamon", "vanilla"]),
          m("lunch", "Lentil & pumpkin stew with rice", ["lentils", "pumpkin", "onion", "garlic", "rice"]),
          m("dinner", "Baked fish with bammy & steamed veg", ["fish fillet", "bammy", "steamed mixed veg", "lemon"]),
        ],
      }),
      day(5, "Day 5", {
        meals: [
          m("breakfast", "Fruit plate & boiled egg", ["mango or papaya", "banana", "boiled egg"]),
          m("lunch", "Leftover stew + side salad", ["yesterday's stew", "lettuce", "tomato", "lime"]),
          m("dinner", "Stir-fried veg with shrimp & brown rice", ["frozen veg", "shrimp", "garlic", "ginger", "brown rice"]),
        ],
      }),
    ],
  },
  {
    id: "plan-lower-salt",
    slug: "lower-salt-week",
    title: "The Lower-Salt Week",
    kind: "meal",
    description:
      "A gentle week to retrain your taste buds — big flavor from garlic, citrus, and herbs instead of the salt shaker and the bouillon cube. Good if you're watching your blood pressure.",
    lengthLabel: "5 days",
    audience: { goals: ["blood-pressure"], mobility: "any" },
    tags: ["lower-salt", "blood-pressure", "budget"],
    days: [
      day(1, "Day 1", {
        note: "Swap the bouillon cube for low-sodium broth and fresh aromatics.",
        meals: [
          m("breakfast", "Oatmeal with fruit", ["oats", "banana", "cinnamon"]),
          m("lunch", "Garlic-lime chicken & rice", ["chicken", "garlic", "lime", "rice", "pepper"]),
          m("dinner", "Roasted veg & beans", ["frozen veg", "canned beans (rinsed)", "olive oil", "garlic", "herbs"]),
        ],
      }),
      day(2, "Day 2", {
        meals: [
          m("breakfast", "Eggs with peppers & onion", ["eggs", "bell pepper", "onion", "black pepper"]),
          m("lunch", "Lentil & vegetable soup (no-salt-added)", ["lentils", "carrot", "celery", "low-sodium broth", "thyme"]),
          m("dinner", "Baked fish with lemon & herbs", ["fish fillet", "lemon", "parsley", "garlic", "sweet potato"]),
        ],
      }),
      day(3, "Day 3", {
        meals: [
          m("breakfast", "Yogurt with fruit & oats", ["plain Greek yogurt", "fruit", "oats"]),
          m("lunch", "Chickpea & tomato bowl", ["canned chickpeas (rinsed)", "tomato", "cucumber", "olive oil", "lemon"]),
          m("dinner", "Herb-roasted chicken & vegetables", ["chicken (skin off)", "rosemary", "garlic", "frozen veg"]),
        ],
      }),
      day(4, "Day 4", {
        meals: [
          m("breakfast", "Whole-grain toast with avocado", ["whole-grain bread", "avocado", "tomato", "pepper"]),
          m("lunch", "Rice & beans with fresh salsa", ["rice", "canned beans (rinsed)", "tomato", "onion", "lime", "cilantro"]),
          m("dinner", "Turkey patties with steamed veg", ["lean ground turkey", "garlic", "onion", "frozen veg"]),
        ],
      }),
      day(5, "Day 5", {
        meals: [
          m("breakfast", "Fruit & boiled egg", ["fruit", "boiled egg"]),
          m("lunch", "Big salad with tuna", ["canned tuna (no salt added)", "greens", "tomato", "olive oil", "lemon"]),
          m("dinner", "Veg stir-fry with low-sodium soy", ["frozen veg", "garlic", "ginger", "low-sodium soy sauce", "brown rice"]),
        ],
      }),
    ],
  },

  // ============================ EXERCISE PLANS ============================
  {
    id: "plan-walk-block",
    slug: "walk-your-block-4-week",
    title: "Walk Your Block: 4-Week Starter",
    kind: "exercise",
    description:
      "The easiest way to start moving for your heart — no gym, no gear, just your neighborhood. Build from short walks to a steady habit over four weeks.",
    lengthLabel: "4 weeks",
    audience: { goals: ["start", "blood-pressure", "weight"], mobility: "any", level: "beginner" },
    tags: ["no-gym", "beginner", "blood-pressure", "weight"],
    days: [
      day(1, "Week 1 — Get going", {
        note: "Aim for 5 days this week. Walk at a pace where you can still talk.",
        exercises: [
          e("Daily walk", "A 10-minute walk — around the block, to the store and back, wherever feels good.", 10),
          e("Warm up & cool down", "Start slow for a minute, finish slow for a minute. Roll your shoulders.", 2),
        ],
      }),
      day(2, "Week 2 — A little longer", {
        note: "5 days. You should feel slightly warm and breathing a bit harder — but able to talk.",
        exercises: [
          e("Daily walk", "Stretch it to 15 minutes. Or do two 10-minute walks if that's easier.", 15),
          e("Add a hill or stairs", "Once this week, take a route with a small hill or a flight of stairs.", 5),
        ],
      }),
      day(3, "Week 3 — Pick up the pace", {
        note: "5 days. Try walking a touch faster for short stretches.",
        exercises: [
          e("Brisk walk", "20 minutes, with a few 1-minute faster bursts mixed in.", 20),
          e("Walk with someone", "Once this week, walk with a friend, neighbor, or your kids.", 20),
        ],
      }),
      day(4, "Week 4 — Make it a habit", {
        note: "5–6 days. You're building something that lasts.",
        exercises: [
          e("Steady walk", "25–30 minutes at a comfortable brisk pace.", 30),
          e("Find your routine", "Pick a time and route you'll keep doing after this plan ends.", 5),
        ],
      }),
    ],
  },
  {
    id: "plan-home-10min",
    slug: "10-minute-home-workout",
    title: "10-Minute Home Workout",
    kind: "exercise",
    description:
      "Five short routines you can do in your living room with no equipment. Ten minutes is enough to count — do what you can, rest when you need to.",
    lengthLabel: "5 sessions",
    audience: { goals: ["start", "weight"], mobility: "any", level: "beginner" },
    tags: ["no-gym", "beginner", "weight"],
    days: [
      day(1, "Session 1 — Full body easy", {
        exercises: [
          e("Marching in place", "Lift your knees, swing your arms. Keep it light.", 2),
          e("Wall push-ups", "Hands on the wall, lean in and push back. 2 sets of 10.", 3),
          e("Sit-to-stand", "From a sturdy chair, stand up and sit down slowly. 2 sets of 10.", 3),
          e("Standing march cooldown", "Slow marching, deep breaths.", 2),
        ],
      }),
      day(2, "Session 2 — Legs & balance", {
        exercises: [
          e("Marching in place", "Warm up.", 2),
          e("Heel raises", "Rise up on your toes, lower slowly. Hold a counter for balance. 2 sets of 12.", 3),
          e("Side leg lifts", "Hold a chair, lift one leg out to the side. 10 each side.", 3),
          e("Gentle stretch", "Reach for the sky, then fold forward slowly.", 2),
        ],
      }),
      day(3, "Session 3 — Core & arms", {
        exercises: [
          e("March in place", "Warm up.", 2),
          e("Wall push-ups", "2 sets of 12.", 3),
          e("Standing knee lifts", "Bring knee toward opposite elbow. 10 each side.", 3),
          e("Shoulder rolls & stretch", "Cool down.", 2),
        ],
      }),
      day(4, "Session 4 — Keep moving", {
        exercises: [
          e("March in place (faster)", "Pick up the pace a little.", 3),
          e("Sit-to-stand", "3 sets of 10.", 4),
          e("Wall push-ups", "2 sets of 12.", 2),
          e("Stretch", "Cool down slowly.", 1),
        ],
      }),
      day(5, "Session 5 — Put it together", {
        exercises: [
          e("Marching warm-up", "2 minutes.", 2),
          e("Circuit", "Wall push-ups, sit-to-stand, heel raises — 10 each, twice through.", 6),
          e("Stretch & breathe", "Finish calm.", 2),
        ],
      }),
    ],
  },
  {
    id: "plan-chair",
    slug: "chair-exercises-stronger-days",
    title: "Chair Exercises for Stronger Days",
    kind: "exercise",
    description:
      "Seated movements for older adults or anyone with limited mobility — gentle, safe, and good for your heart and strength. All from a sturdy chair.",
    lengthLabel: "5 sessions",
    audience: { goals: ["start"], mobility: "seated", level: "easy" },
    tags: ["no-gym", "seated-friendly", "beginner"],
    days: [
      day(1, "Session 1 — Warm & easy", {
        note: "Use a sturdy chair without wheels. Stop if anything hurts.",
        exercises: [
          e("Seated march", "Lift one knee, then the other, like marching in your seat.", 3, true),
          e("Arm raises", "Raise both arms toward the ceiling and lower slowly. 10 times.", 2, true),
          e("Ankle circles", "Lift one foot, circle the ankle each way. Switch feet.", 2, true),
          e("Deep breaths", "Breathe in for 4, out for 4. Five rounds.", 2, true),
        ],
      }),
      day(2, "Session 2 — Upper body", {
        exercises: [
          e("Seated march", "Warm up.", 2, true),
          e("Shoulder rolls", "Roll shoulders back, then forward. 10 each.", 2, true),
          e("Seated punches", "Punch gently forward, alternating arms.", 3, true),
          e("Reach & stretch", "Reach overhead and to each side.", 2, true),
        ],
      }),
      day(3, "Session 3 — Legs", {
        exercises: [
          e("Seated march", "Warm up.", 2, true),
          e("Knee extensions", "Straighten one leg out, hold, lower. 10 each leg.", 3, true),
          e("Heel & toe taps", "Tap heels then toes on the floor.", 2, true),
          e("Ankle circles", "Cool down.", 2, true),
        ],
      }),
      day(4, "Session 4 — Strength", {
        exercises: [
          e("Seated march", "Warm up.", 2, true),
          e("Sit-to-stand (with support)", "If safe, stand using the armrests and sit slowly. Otherwise lean forward and back.", 3, true),
          e("Arm raises", "2 sets of 10.", 2, true),
          e("Breathing", "Cool down.", 2, true),
        ],
      }),
      day(5, "Session 5 — All together", {
        exercises: [
          e("Seated march", "3 minutes.", 3, true),
          e("Mix", "Arm raises, knee extensions, seated punches — 10 each.", 4, true),
          e("Stretch & breathe", "Finish calm.", 2, true),
        ],
      }),
    ],
  },
];
