import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About — heart health, the way you live",
  description:
    "Heart of the Block is a free heart-health tool made in Brooklyn, for Brooklyn — born from a Father's Day talk with two neighborhood health pros. No shame, no jargon, just real tools for real life.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-block max-w-2xl py-12">
      <p className="pill bg-brick-100 text-brick-700">
        Made in Brooklyn, for Brooklyn
      </p>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        About Heart of the Block
      </h1>
      <p className="mt-4 text-lg text-muted">
        We’re a free, community heart-health tool — built for real life on the
        block, not a doctor’s office or a wellness brand.
      </p>

      <div className="mt-10 space-y-8 text-ink">
        <Section title="How it started">
          It started with a Father’s Day talk on the block — two Brooklyn health
          pros, a few neighbors, and an honest conversation about the numbers
          that quietly shape our lives: blood pressure, blood sugar, cholesterol.
          The kind of talk where you realize how many people around you are
          carrying this, and how little of it is ever explained in plain words.
          Heart of the Block grew out of that: take what those conversations get
          right, and put it in everyone’s pocket.
        </Section>

        <Section title="What we believe">
          <ul className="mt-1 list-disc space-y-2 pl-5 text-muted">
            <li>
              <strong className="text-ink">No shame, no jargon.</strong> Your
              health isn’t a report card. We explain things the way a good
              neighbor would.
            </li>
            <li>
              <strong className="text-ink">Meet people where they live.</strong>{" "}
              Real food, real budgets, real stores. Oxtail and rice and peas done
              heart-smart — not “just eat better.”
            </li>
            <li>
              <strong className="text-ink">Know your numbers.</strong> You can’t
              act on what you can’t see. We make the numbers plain and point you
              back to your doctor — never around them.
            </li>
            <li>
              <strong className="text-ink">Your data is yours.</strong> Anything
              you log is private to you. We don’t sell it, ever. See our{" "}
              <Link href="/privacy" className="font-semibold text-brick-700 underline">
                privacy policy
              </Link>
              .
            </li>
          </ul>
        </Section>

        <Section title="What’s inside">
          <p className="text-muted">
            Practical tools for the moments that actually matter — the store, the
            kitchen, the day you’re having:
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            <ToolLink href="/swaps" emoji="🔎" label="Food Swap Finder" />
            <ToolLink href="/scan" emoji="📷" label="Barcode Scanner" />
            <ToolLink href="/tracker" emoji="📈" label="Numbers Tracker" />
            <ToolLink href="/heart-risk" emoji="❤️" label="Heart-risk check" />
            <ToolLink href="/abcs" emoji="🔤" label="The ABCs of Life" />
            <ToolLink href="/directory" emoji="🗺️" label="Where to shop" />
            <ToolLink href="/get-screened" emoji="🩺" label="Get screened" />
            <ToolLink href="/money-for-produce" emoji="🎟️" label="Money for produce" />
          </ul>
        </Section>

        <Section title="A word on what this is">
          Heart of the Block is education, not medical advice — a picture to think
          about and bring to your doctor, never a diagnosis. Please read our{" "}
          <Link href="/disclaimer" className="font-semibold text-brick-700 underline">
            medical disclaimer
          </Link>
          . In an emergency, call <strong>911</strong>.
        </Section>

        <div className="rounded-2xl bg-cream p-6">
          <h2 className="font-display text-lg font-bold text-ink">
            Want to bring this to your block?
          </h2>
          <p className="mt-2 text-muted">
            Clinics, churches, schools, and community groups are welcome to use
            and share Heart of the Block. We’d love to hear from you.
          </p>
          <Link href="/contact" className="btn-primary mt-4 inline-flex">
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-2 leading-relaxed">{children}</div>
    </section>
  );
}

function ToolLink({
  href,
  emoji,
  label,
}: {
  href: string;
  emoji: string;
  label: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-lift"
      >
        <span aria-hidden className="text-lg">
          {emoji}
        </span>
        {label}
      </Link>
    </li>
  );
}
