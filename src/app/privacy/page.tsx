import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Heart of the Block collects, uses, stores, and protects your information — in plain language.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "June 28, 2026";

export default function PrivacyPage() {
  return (
    <div className="container-block max-w-2xl py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: {UPDATED}</p>

      <p className="mt-5 rounded-2xl bg-gold-100 p-5 text-base font-semibold text-ink">
        Short version: your health numbers are yours. They’re stored privately,
        tied only to your account, never sold, and never shown to anyone else
        unless you choose to. You can export or delete everything at any time.
      </p>

      <div className="mt-8 space-y-6 text-ink">
        <Section title="Who we are">
          Heart of the Block is a free, community heart-health tool made in
          Brooklyn. This policy explains what information we handle when you use
          the site at heartoftheblock.org, and the choices you have. It works
          alongside our{" "}
          <Link href="/disclaimer" className="font-semibold text-brick-700 underline">
            medical disclaimer
          </Link>
          .
        </Section>

        <Section title="What you can use without an account">
          Most of the site works without signing in. The Food Swap Finder,
          barcode scanner, heart-risk check, ABCs, recipes, directory, and the
          Numbers Tracker all run right in your browser. When you’re signed out,
          anything you enter into these tools stays on your own device (in your
          browser’s local storage) and is never sent to us.
        </Section>

        <Section title="What we collect when you make an account">
          An account lets you save your progress across devices. When you sign
          up and use it, we store:
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Account basics</strong> — your email address, and the
              optional display name and neighborhood you choose to add.
            </li>
            <li>
              <strong>Health logs you create</strong> — blood pressure,
              cholesterol, blood sugar (A1C), and weight readings you enter in
              the tracker.
            </li>
            <li>
              <strong>Activity</strong> — your daily check-ins and streaks, plan
              progress, saved scans, and favorite food swaps.
            </li>
            <li>
              <strong>Leaderboard (only if you opt in)</strong> — if you join the
              block leaderboard, your display name, neighborhood, points, and
              streak are shown to other signed-in neighbors. Your actual health
              numbers are never shown — only points and streaks.
            </li>
          </ul>
        </Section>

        <Section title="How we use your information">
          We use what you give us only to run the features you’re using: to power
          your trends and streaks, keep your saved items, sign you in securely,
          and send account emails like confirmation and password resets. That’s
          it. We don’t build advertising profiles and we don’t use your health
          information for any purpose other than showing it back to you.
        </Section>

        <Section title="What we never do">
          <ul className="list-disc space-y-1 pl-5">
            <li>We never sell or rent your information.</li>
            <li>We don’t run ads or ad trackers.</li>
            <li>
              We never share your health numbers with other users, employers,
              insurers, or advertisers.
            </li>
          </ul>
        </Section>

        <Section title="How it’s stored and protected">
          Account data is stored in our database provider, Supabase, and is
          protected with row-level security — a rule enforced by the database so
          that only your own account can read your rows. The site is served over
          an encrypted (HTTPS) connection. No system is perfectly secure, but we
          treat your health information as sensitive and limit who and what can
          reach it.
        </Section>

        <Section title="The services we rely on">
          We keep our list of outside services small, and we only use ones needed
          to run the site:
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Supabase</strong> — secure database and sign-in.
            </li>
            <li>
              <strong>Vercel</strong> — hosting that serves the website.
            </li>
            <li>
              <strong>Open Food Facts</strong> — when you scan a barcode, the
              product’s code is sent to this open public database to look up that
              product. No account or health information is sent.
            </li>
          </ul>
          These providers process data on our behalf to deliver the service; they
          aren’t permitted to use it for their own purposes.
        </Section>

        <Section title="Your choices and rights">
          You’re in control of your information:
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>See and edit</strong> your numbers and profile any time
              from the tracker and{" "}
              <Link href="/account" className="font-semibold text-brick-700 underline">
                your account
              </Link>
              .
            </li>
            <li>
              <strong>Export or delete</strong> your account and all its data —
              email us and we’ll take care of it promptly.
            </li>
            <li>
              <strong>Leave the leaderboard</strong> at any time, which removes
              your row from it.
            </li>
          </ul>
        </Section>

        <Section title="Keeping data only as long as needed">
          We keep your information while your account is active. If you ask us to
          delete your account, we remove your logs and profile from our database.
          Backups are rotated on a normal schedule and then cleared.
        </Section>

        <Section title="Children">
          Heart of the Block is meant for adults managing their heart health.
          It’s not directed at children under 13, and we don’t knowingly collect
          information from them.
        </Section>

        <Section title="Changes to this policy">
          If we change how we handle your information, we’ll update this page and
          the “last updated” date above. Meaningful changes will be made clear.
        </Section>

        <Section title="Contact us">
          Questions, or want your data exported or deleted? Email{" "}
          <a
            href="mailto:privacy@heartoftheblock.org"
            className="font-semibold text-brick-700 underline"
          >
            privacy@heartoftheblock.org
          </a>{" "}
          and we’ll help.
        </Section>
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
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      <div className="mt-2 leading-relaxed text-muted">{children}</div>
    </section>
  );
}
