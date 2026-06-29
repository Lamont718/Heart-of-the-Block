import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/articles/articles";
import { ArticleCard } from "@/components/articles/article-card";

export default async function Home() {
  const featured = (await getArticles()).slice(0, 3);
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gold/25 via-cream to-brick/15">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-gold/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brick/20 blur-3xl"
        />
        {/* soft fade into the white Tools section below */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream"
        />
        <div className="container-block relative grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="pill bg-brick-100 text-brick-700">
              Made in Brooklyn, for Brooklyn
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
              Heart health,{" "}
              <span className="text-brick-700">the way you live.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Understand your numbers, swap the foods you love for ones that love
              you back, scan products right in the aisle, and find genuinely
              healthy places to shop near you. No shame, no jargon — just real
              tools for real life on the block.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login?mode=signup" className="btn-primary">
                Get started — it’s free
              </Link>
              <Link href="#tools" className="btn-secondary">
                See what’s inside
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              Education, not medical advice. Always talk to your doctor.
            </p>
          </div>

          {/* Hero image + floating product hint */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-line shadow-card">
              <Image
                src="/images/hero-block.jpg"
                alt="A Brooklyn neighbor smiling on her block"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="card absolute -bottom-6 -left-4 w-52 rotate-[-3deg]">
              <p className="text-sm font-semibold text-muted">Food Swap</p>
              <p className="mt-1 font-display text-lg font-bold text-ink">
                Oxtail, made heart-smart
              </p>
              <span className="pill mt-2 bg-teal-100 text-teal">
                ↓ saturated fat
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural signature motif — kente/quilt strip (see docs/VISUAL-REFERENCES.md) */}
      <div className="weave-band" aria-hidden />

      {/* ---------- Tools ---------- */}
      <section id="tools" className="scroll-mt-20 bg-surface py-16">
        <div className="container-block">
          <SectionHeading
            eyebrow="The tools"
            title="Things you’ll actually use in the moment"
            sub="Not another “eat better, exercise more” lecture. Practical tools built for the store, the kitchen, and the day you’re actually having."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              emoji="🔎"
              title="Food Swap Finder"
              body="Tell us what you eat — we give you realistic, culturally-rooted swaps with the why. Shareable result cards."
              href="/swaps"
            />
            <FeatureCard
              emoji="📷"
              title="Barcode Scanner"
              body="Scan a product in the aisle and get a plain-language heart read on the spot — then a better swap."
              href="/scan"
            />
            <FeatureCard
              emoji="📈"
              title="Numbers Tracker"
              body="Log cholesterol, blood pressure, and weight over time. Simple trends, no clutter."
              href="/tracker"
            />
            <FeatureCard
              emoji="❤️"
              title="Heart-risk check"
              body="A clear picture of where you stand — always pointed back to a conversation with your doctor."
              href="/heart-risk"
            />
            <FeatureCard
              emoji="👟"
              title="Activity check-ins"
              body="Log today’s walk or home workout. Build a streak. Keep yourself honest."
              href="/community"
            />
            <FeatureCard
              emoji="🎯"
              title="Weight goals"
              body="Set a target, log your weight, watch the trend line. Encouraging — never a calorie diary."
              href="/tracker?metric=weight"
            />
          </div>
        </div>
      </section>

      {/* ---------- The ABCs of Life ---------- */}
      <section className="scroll-mt-20 py-16">
        <div className="container-block">
          <div className="card grid gap-6 overflow-hidden bg-ink text-white lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-gold">
                Know your numbers
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                The ABCs of Life
              </h2>
              <p className="mt-3 max-w-md text-white/85">
                Three numbers worth getting ahead of — born from a Father&apos;s
                Day talk with two Brooklyn health pros right here on the block.
                Learn what they mean, then track yours.
              </p>
              <Link
                href="/abcs"
                className="btn mt-6 bg-white text-ink hover:bg-cream"
              >
                Learn the ABCs
              </Link>
            </div>
            <ul className="grid gap-3">
              {[
                { l: "A", n: "A1C", d: "your blood sugar over ~3 months" },
                { l: "B", n: "Blood pressure", d: "the quiet one — usually no symptoms" },
                { l: "C", n: "Cholesterol", d: "the good (HDL) and the bad (LDL)" },
              ].map((x) => (
                <li
                  key={x.l}
                  className="flex items-center gap-4 rounded-xl bg-white/10 p-3"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brick font-display text-lg font-extrabold text-white">
                    {x.l}
                  </span>
                  <div>
                    <p className="font-semibold">{x.n}</p>
                    <p className="text-sm text-white/75">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Directory ---------- */}
      <section id="directory" className="scroll-mt-20 py-16">
        <div className="container-block grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Where to shop"
              title="Find genuinely healthy places near you"
              sub="A map and list of Brooklyn markets, grocers, and farmers markets with real fresh produce — not corner stores, not “make do.” Filter by open now, distance, and what’s good there."
              align="left"
            />
            <Link href="/directory" className="btn-primary mt-6 inline-flex">
              Browse the directory
            </Link>
          </div>
          <Link
            href="/directory"
            className="group block overflow-hidden rounded-2xl border border-line shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="relative h-64">
              <Image
                src="/images/market.jpg"
                alt="A neighborhood market in Brooklyn"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-display text-lg font-bold">
                  Markets, grocers & farmers markets
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Tap to explore healthy spots near you →
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------- Healthy buys ---------- */}
      <section className="scroll-mt-20 bg-surface py-16">
        <div className="container-block">
          <div className="card grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
                Shop smart
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
                Healthy staples &amp; what they cost
              </h2>
              <p className="mt-3 text-muted">
                Eating heart-smart on a budget is real. See what to grab at BJ&apos;s,
                Aldi, ShopRite, Key Food, C-Town and Trader Joe&apos;s — and roughly
                what the good stuff costs — so you walk in with a plan.
              </p>
              <Link href="/healthy-buys" className="btn-primary mt-6 inline-flex">
                See the staples &amp; prices
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {[
                { e: "🍚", n: "Brown rice", p: "~$2–9" },
                { e: "🫘", n: "Beans", p: "~$1–2" },
                { e: "🐟", n: "Canned fish", p: "~$1.50–3" },
                { e: "🥦", n: "Frozen veg", p: "~$1.50" },
                { e: "🥣", n: "Oats", p: "~$3–4" },
                { e: "🍌", n: "Bananas", p: "~$0.50/lb" },
              ].map((i) => (
                <li
                  key={i.n}
                  className="flex items-center gap-3 rounded-xl border border-line bg-cream px-3 py-2.5"
                >
                  <span className="text-2xl" aria-hidden>
                    {i.e}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {i.n}
                    </p>
                    <p className="text-xs text-muted">{i.p}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Money for produce ---------- */}
      <section className="scroll-mt-20 py-16">
        <div className="container-block">
          <div className="card overflow-hidden bg-teal text-white">
            <div className="grid gap-6 p-2 sm:p-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-teal-100">
                  Eat well for less
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                  There’s money for produce — most people just don’t know it
                </h2>
                <p className="mt-3 max-w-lg text-white/90">
                  Health Bucks, free produce boxes, SNAP, WIC — real NYC programs
                  that put cash toward fruits and vegetables. We show you who
                  qualifies and how to get it.
                </p>
                <Link
                  href="/money-for-produce"
                  className="btn mt-6 bg-white text-teal hover:bg-cream"
                >
                  See what you qualify for
                </Link>
              </div>
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {[
                  "🎟️ $2 back per $5 at markets",
                  "📦 Free produce boxes",
                  "🛒 SNAP",
                  "🍎 WIC",
                ].map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Learn ---------- */}
      <section id="learn" className="scroll-mt-20 py-16">
        <div className="container-block">
          <SectionHeading
            eyebrow="Learn"
            title="Your favorites, made to love you back"
            sub="Short, plain-language reads grounded in what Brooklyn actually cooks — oxtail, fried chicken, rice and peas — done heart-smart. With audio read-aloud."
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-card">
            <div className="relative h-44 sm:h-56">
              <Image
                src="/images/cooking.jpg"
                alt="Hands preparing a home-cooked meal"
                fill
                sizes="(max-width: 768px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {featured.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/recipes" className="btn-primary">
              Browse heart-smart recipes
            </Link>
            <Link href="/learn" className="btn-secondary">
              Read more
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Community ---------- */}
      <section id="community" className="scroll-mt-20 py-16">
        <div className="container-block">
          <div className="card overflow-hidden bg-brick text-white">
            <div className="grid gap-6 p-2 sm:p-6 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-extrabold">
                  Better together, block by block
                </h2>
                <p className="mt-3 max-w-md text-white/90">
                  Check in daily, keep a streak, join small challenges with
                  neighbors. The part that makes it stick.
                </p>
                <Link
                  href="/community"
                  className="btn mt-6 bg-white text-brick-700 hover:bg-cream"
                >
                  Start your streak
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {["🔥 7-day streak", "🚶 Walk club", "🥗 Produce challenge"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"
                    >
                      {chip}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-muted">{sub}</p>}
    </div>
  );
}

function FeatureCard({
  emoji,
  title,
  body,
  href,
}: {
  emoji: string;
  title: string;
  body: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="text-3xl" aria-hidden>
        {emoji}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-ink">
        {title}
        {href && <span className="ml-1 text-brick" aria-hidden>→</span>}
      </h3>
      <p className="mt-1 text-sm text-muted">{body}</p>
      {!href && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Coming soon
        </p>
      )}
    </>
  );
  const cls =
    "card block transition hover:-translate-y-0.5 hover:shadow-lift";
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={`${cls} opacity-90`}>{inner}</div>
  );
}
