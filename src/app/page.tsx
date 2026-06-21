import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-100 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-brick-100 blur-3xl"
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

          {/* Hero card stack */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="card -rotate-2">
              <p className="text-sm font-semibold text-muted">Food Swap</p>
              <p className="mt-1 font-display text-xl font-bold text-ink">
                Oxtail, made heart-smart
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="pill bg-teal-100 text-teal">
                  ↓ saturated fat
                </span>
                <span className="pill bg-gold-100 text-ink">same flavor</span>
              </div>
            </div>
            <div className="card absolute -bottom-8 -right-2 w-56 rotate-3">
              <p className="text-sm font-semibold text-muted">Scanned</p>
              <p className="mt-1 font-display text-lg font-bold text-ink">
                Aisle read
              </p>
              <span className="pill mt-2 bg-good/15 text-good">Good choice</span>
            </div>
          </div>
        </div>
      </section>

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
            />
            <FeatureCard
              emoji="📷"
              title="Barcode Scanner"
              body="Scan a product in the aisle and get a plain-language heart read on the spot — then a better swap."
            />
            <FeatureCard
              emoji="📈"
              title="Numbers Tracker"
              body="Log cholesterol, blood pressure, and weight over time. Simple trends, no clutter."
            />
            <FeatureCard
              emoji="❤️"
              title="Heart-risk check"
              body="A clear picture of where you stand — always pointed back to a conversation with your doctor."
            />
            <FeatureCard
              emoji="👟"
              title="Activity check-ins"
              body="Log today’s walk or home workout. Build a streak. Keep yourself honest."
            />
            <FeatureCard
              emoji="🎯"
              title="Weight goals"
              body="Set a target, log your weight, watch the trend line. Encouraging — never a calorie diary."
            />
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
            className="card block transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="grid h-56 place-items-center rounded-xl bg-gradient-to-br from-teal-100 to-gold-100 text-center">
              <div>
                <p className="font-display text-lg font-bold text-ink">
                  🗺️ Map of healthy spots
                </p>
                <p className="mt-1 text-sm text-muted">
                  Tap to explore markets, grocers & farmers markets near you.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------- Learn ---------- */}
      <section id="learn" className="scroll-mt-20 bg-surface py-16">
        <div className="container-block">
          <SectionHeading
            eyebrow="Learn"
            title="Your favorites, made to love you back"
            sub="Short, plain-language reads grounded in what Brooklyn actually cooks — oxtail, fried chicken, rice and peas — done heart-smart. With audio read-aloud."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {["Cholesterol, plainly", "Salt without the struggle", "Move on your terms"].map(
              (t) => (
                <div key={t} className="card">
                  <div className="mb-3 h-28 rounded-xl bg-gradient-to-br from-brick-100 to-gold-100" />
                  <h3 className="font-display text-lg font-bold text-ink">{t}</h3>
                  <p className="mt-1 text-sm text-muted">Coming soon.</p>
                </div>
              ),
            )}
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
                  href="/login?mode=signup"
                  className="btn mt-6 bg-white text-brick-700 hover:bg-cream"
                >
                  Join the block
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
}: {
  emoji: string;
  title: string;
  body: string;
}) {
  return (
    <div className="card transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="text-3xl" aria-hidden>
        {emoji}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
