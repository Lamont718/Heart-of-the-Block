import type { Article, TopicTag } from "@/lib/articles/types";

/**
 * Starter educational content (SPEC Pillar 1). Short, plain-language, culturally
 * grounded in what Brooklyn actually cooks — practical, never clinical. Every
 * article ends pointing back to a doctor (SPEC §6). Lamont can approve/extend;
 * target is 10–15 to start. Bodies are markdown.
 */
const a = (
  id: string,
  title: string,
  slug: string,
  excerpt: string,
  topic_tags: TopicTag[],
  body: string,
): Article => ({
  id,
  title,
  slug,
  excerpt,
  topic_tags,
  reading_level: "easy",
  published: true,
  body: body.trim(),
});

export const ARTICLES_SEED: Article[] = [
  a(
    "art-oxtail",
    "Oxtail, the heart-smart way",
    "oxtail-heart-smart",
    "You don't have to give up oxtail. You just have to cook it a little smarter.",
    ["cooking", "fats", "caribbean"],
    `
Oxtail is rich, slow-cooked love. The thing to know is that most of what makes it heavy for your heart is the **saturated fat** that cooks out of the meat and sits in the gravy.

Here's how to keep the flavor and lose some of that fat:

- **Skim the top.** After it braises, let it sit a few minutes and spoon off the fat that rises. You simmered all that flavor *into* the meat already — you're only removing grease.
- **Trim before you brown.** Cut off the big chunks of hard fat. The meat still falls off the bone.
- **Stretch it with vegetables.** Carrots, butter beans, spinners, and extra onion mean a smaller portion of meat still fills the plate.
- **Go easy on the browning sugar and salt.** Let the spice — pimento, thyme, scallion, garlic — carry it.

None of this changes what oxtail *is*. It just lets you eat the food you love a little more often.

*This is general cooking guidance, not medical advice. For what's right for your heart, talk with your doctor.*
`,
  ),
  a(
    "art-fried-chicken",
    "Fried chicken, without frying it all away",
    "fried-chicken-lighter",
    "Crispy, seasoned, golden — and a lot less of the fat that comes from the deep fryer.",
    ["cooking", "fats", "soul-food"],
    `
Nobody's coming for your fried chicken. But the deep fryer adds a lot of fat that your heart would rather skip. Good news: you can get crispy without it.

- **Oven-fry it.** Season and bread your chicken like always, then bake on a rack at 425°F so the air crisps it all the way around.
- **Air-fry it.** Same crunch, a fraction of the oil. A small air fryer pays for itself fast.
- **Take the skin off some pieces.** That's where a lot of the saturated fat lives. Leave it on the piece you love most and skip it on the rest.
- **Season hard.** Garlic, paprika, black pepper, a little cayenne — flavor means you won't miss anything.

Same Sunday chicken. Easier on the heart.

*General cooking guidance, not medical advice. Your doctor can help with what's right for you.*
`,
  ),
  a(
    "art-salt",
    "The salt conversation (without losing flavor)",
    "salt-without-losing-flavor",
    "Salt isn't the enemy — too much of it, day after day, is what raises blood pressure.",
    ["sodium", "blood-pressure", "cooking"],
    `
Salt makes food taste like home. The catch is that eating a lot of it, every day, can push your **blood pressure** up — and high blood pressure is hard on your heart because you often can't feel it.

You don't have to cook bland. You have to build flavor other ways too:

- **Lean on aromatics.** Garlic, onion, scallion, ginger, thyme, and pepper do a lot of the work salt used to.
- **Add acid at the end.** A squeeze of lime or a splash of vinegar makes food taste fuller, so you reach for less salt.
- **Watch the hidden stuff.** Bouillon cubes, adobo, sazón, soy sauce, and canned goods are where most of the salt sneaks in. Use less, or look for low-sodium versions.
- **Rinse canned beans and veg.** A quick rinse washes off a good chunk of the sodium.

Your taste buds adjust in a couple of weeks. Give it time.

*Educational only — not a diagnosis. If you're watching your blood pressure, work with your doctor.*
`,
  ),
  a(
    "art-cholesterol",
    "Cholesterol, plain and simple",
    "cholesterol-plain-and-simple",
    "What those numbers mean, in regular words — and the everyday foods that help.",
    ["cholesterol", "heart-basics"],
    `
Cholesterol gets talked about like it's one thing. It's really a few numbers:

- **LDL** is the one people call "bad" — too much can build up in your arteries.
- **HDL** is the "good" one — it helps clear the other kind out.
- **Total** is the big-picture number your doctor looks at alongside the rest.

What helps, day to day:

- **More fiber** — oats, beans, peas, fruit, and vegetables. Fiber actually helps carry cholesterol out.
- **Better fats** — olive or canola oil instead of lard or butter; fish, nuts, and avocado.
- **Less of the deep-fried and heavily processed stuff** — not never, just less.
- **Moving your body** — even regular walking nudges the good number up.

You can't feel your cholesterol, so the only way to know your numbers is a simple blood test.

*This explains the basics — it isn't a diagnosis. Ask your doctor what your numbers mean for you.*
`,
  ),
  a(
    "art-blood-pressure",
    "Blood pressure: the quiet one",
    "blood-pressure-the-quiet-one",
    "It usually has no symptoms — which is exactly why it's worth keeping an eye on.",
    ["blood-pressure", "heart-basics"],
    `
Blood pressure is the force of your blood pushing against your artery walls. When it stays high for a long time, it quietly wears on your heart and arteries. Most people feel completely fine — that's what makes it sneaky.

A reading has two numbers, like **120/80**: the top (when your heart beats) over the bottom (when it rests).

Small habits that help over time:

- **Move most days** — a brisk walk counts.
- **Ease up on salt** — see *The salt conversation*.
- **Go easy on alcohol**, and don't smoke.
- **Sleep and stress matter too** — they're part of the picture.

The only way to know your blood pressure is to measure it. Many pharmacies have a free machine, and you can log your readings right here in the **Numbers Tracker**.

*Educational only. We don't diagnose — bring your readings to your doctor.*
`,
  ),
  a(
    "art-sugary-drinks",
    "Sweet drinks and your heart",
    "sweet-drinks-and-your-heart",
    "Sodas, juice drinks, and sweet tea add up fast — here's how to cut back without going thirsty.",
    ["sugar", "heart-basics"],
    `
Sugary drinks are one of the easiest places to cut back, because they're almost all sugar and they don't fill you up. Day after day, all that sugar is hard on your heart and your weight.

You don't have to drink plain water forever:

- **Cut it with seltzer.** Half juice, half sparkling water still tastes sweet.
- **Make your own.** Water with lime, cucumber, mint, or a few frozen berries.
- **Lighten the sweet tea.** Go half-sweet, then less, with lemon and mint to fill it out.
- **Read the bottle.** "Juice drink" and "punch" are mostly added sugar. Real 100% juice is better, but keep the glass small.

Try swapping just one sweet drink a day to start. Small changes hold.

*General guidance, not medical advice — especially if you manage diabetes. Talk with your doctor.*
`,
  ),
  a(
    "art-rice-and-peas",
    "Rice and peas, a little lighter",
    "rice-and-peas-lighter",
    "Keep the Sunday staple — just give it more fiber and a touch less coconut fat.",
    ["cooking", "fiber", "caribbean"],
    `
Rice and peas is non-negotiable for a lot of us. You can keep it on the table and still do your heart a favor.

- **Try brown rice — or half and half.** Brown rice has more **fiber**, which is good for your heart and keeps you full. Starting half brown, half white makes the change easy to live with.
- **Lighten the coconut milk.** Use light coconut milk, or just less of the full-fat kind. The peas, thyme, and pimento still carry the flavor.
- **Don't drown it in salt.** Let the coconut, garlic, and scallion do the talking.
- **Mind the portion.** Fill half the plate with vegetables or salad and you'll naturally take a little less rice.

Same plate, same Sunday. A bit kinder to your heart.

*Cooking guidance, not medical advice. Ask your doctor about what's right for you.*
`,
  ),
  a(
    "art-greens",
    "Greens that love you back",
    "greens-that-love-you-back",
    "Collards and callaloo are already good for you — it's the salt pork and the salt that need watching.",
    ["cooking", "sodium", "soul-food"],
    `
Greens are one of the best things on the plate — full of fiber and good stuff for your heart. What you cook them *with* is what to watch.

- **Smoked turkey instead of ham hock or salt pork.** You still get that smoky depth with less saturated fat and salt.
- **Or skip the meat and smoke the pot.** A little smoked paprika and garlic does a lot.
- **Build flavor with onion, garlic, pepper, and a splash of vinegar** so you need less salt.
- **Go easy pouring the pot liquor over rice** — that's where a lot of the salt ends up.

Callaloo, collards, kale, mustard greens — all of them love you back when you season them right.

*General cooking guidance, not a diagnosis. Your doctor knows your full picture.*
`,
  ),
  a(
    "art-move",
    "Move on your terms",
    "move-on-your-terms",
    "No gym, no special clothes — just your neighborhood and a little time.",
    ["movement", "heart-basics"],
    `
Moving your body is one of the best things you can do for your heart, and it doesn't take a gym membership.

- **Walk.** A brisk 20–30 minute walk most days adds up. Prospect Park, the waterfront, or just around the block.
- **Make it social.** Walk with a neighbor, a friend, or your kids. You'll keep it up if it's a hangout.
- **Take the stairs** when you can. Get off the train a stop early.
- **Sit down for chair exercises** if standing is hard — moving while seated still counts.

You don't have to do it all at once. Three 10-minute walks are as good as one 30-minute one.

Start where you are. Something is always better than nothing.

*General guidance. If you have a heart condition or haven't moved much lately, check with your doctor before starting.*
`,
  ),
  a(
    "art-read-label",
    "Read a food label in 20 seconds",
    "read-a-food-label",
    "Four numbers tell you most of what your heart needs to know.",
    ["heart-basics", "sodium", "sugar"],
    `
You don't need to study the whole label. For your heart, glance at four things — and check the **serving size** first, because everything's measured per serving.

- **Saturated fat** — lower is better. A few grams here and there is fine; double digits per serving adds up.
- **Sodium** — under ~140 mg per serving is low; several hundred is a lot, especially across a day.
- **Sugar** — the less added sugar, the better. Watch drinks and snacks.
- **Fiber** — here, *more* is better. A few grams means the food is working for you.

Want a shortcut? Use the **Barcode Scanner** in the store — scan a product and we'll read those numbers for you in plain language, then point you to a swap.

*This helps you read labels — it isn't medical advice. Your doctor can tailor it to you.*
`,
  ),
  a(
    "art-fiber",
    "Fiber: the quiet hero",
    "fiber-the-quiet-hero",
    "The cheap, everyday thing that helps your cholesterol and keeps you full.",
    ["fiber", "cholesterol"],
    `
Fiber doesn't get talked about much, but it's one of the most heart-friendly things you can eat — and it's usually cheap.

What it does: it helps carry cholesterol out of your body, keeps you full so you snack less, and steadies your blood sugar.

Where to find it (all bodega- and budget-friendly):

- **Beans and peas** — black-eyed peas, kidney beans, lentils, chickpeas.
- **Oats** — a bowl of oatmeal is a great start to the day.
- **Whole grains** — brown rice, whole-grain bread and pasta.
- **Fruit and vegetables** — skins on when you can.

Add it slowly and drink water with it, so your stomach has time to adjust.

*General nutrition info, not a diagnosis. Ask your doctor or a dietitian for a plan that fits you.*
`,
  ),
  a(
    "art-diabetes-heart",
    "Diabetes and your heart",
    "diabetes-and-your-heart",
    "They're closely linked — caring for one helps the other.",
    ["sugar", "heart-basics"],
    `
Diabetes and heart health are tied together. High blood sugar over time can damage blood vessels, which makes heart trouble more likely. The good news is that the same everyday habits help both.

- **Watch the sweet drinks and quick sugars** — they spike your blood sugar fastest. See *Sweet drinks and your heart*.
- **Lean on fiber** — beans, oats, vegetables — to steady things out.
- **Pair carbs with protein or veg** instead of eating them alone.
- **Keep moving** — even a walk after meals helps your body handle sugar.

If you have diabetes or it runs in your family, regular check-ups matter — a lot of this is manageable when you stay on top of it.

*This is general education, not a treatment plan. Diabetes care should be guided by your doctor.*
`,
  ),
  a(
    "art-advocate",
    "Be your own best advocate",
    "be-your-own-advocate",
    "No one knows your body better than you. If something doesn't feel right, say so — and keep saying it.",
    ["advocacy", "heart-basics"],
    `
The single most important thing you can bring to the doctor's office isn't your insurance card. It's your voice.

In our community, too many people get rushed through, talked over, or quietly dismissed — sometimes because of who they are, not what they came in for. The fix isn't to stop going. It's to go in ready, and to speak up.

**Know your numbers before you walk in.** The ABCs — your **A1C**, **blood pressure**, and **cholesterol** — are yours. When you know them, you can ask real questions instead of just nodding along. (You can log all three right here and bring the trends with you.)

**Ask until you understand.** "What does that number mean for me?" "What are my options?" "What happens if we wait?" A good provider will slow down and answer. You're not being difficult — you're being involved.

**If it doesn't feel right, it isn't.** You live in your body every day; you know when something's off. If you're in pain and you feel brushed aside, say it plainly: "I need this looked at." Don't let anyone hand you a diagnosis of "you're fine" that your own body is arguing with.

**You're allowed to change providers.** If your doctor leaves you more scared than informed — or never really looks at *you* — find another one. A second opinion isn't an insult. It's your right, and sometimes it's what catches the thing the first person missed.

**Prevention beats extraction.** It's easier to stay ahead of high blood pressure, high sugar, and high cholesterol than to fix the damage later. Screenings, check-ups, and small habits now are you advocating for the older you.

You deserve a provider who gives you their time and takes you seriously. Keep asking until you find one.

*This is encouragement and education, not medical advice. If something feels seriously wrong, don't wait — in an emergency call 911.*
`,
  ),
];
