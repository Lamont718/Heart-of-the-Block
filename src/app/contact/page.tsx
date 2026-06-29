import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact — get in touch",
  description:
    "Reach Heart of the Block — questions, feedback, partnership ideas, or a request to export or delete your data. We’d love to hear from you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-block max-w-2xl py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-4 text-lg text-muted">
        We’re a small Brooklyn team and we read everything. Whether it’s a
        question, an idea, or something that’s not working — reach out.
      </p>

      {/* Emergency note up top so no one waits on an email in a crisis. */}
      <div className="mt-6 rounded-2xl border border-brick/30 bg-brick-100 p-5 text-ink">
        <p className="font-semibold">
          <span aria-hidden>🚑 </span>This inbox isn’t for emergencies.
        </p>
        <p className="mt-1 text-sm">
          If you think you’re having a medical emergency — chest pain, trouble
          breathing, signs of a stroke — call <strong>911</strong> right away.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <ContactCard
          emoji="✉️"
          title="General questions & feedback"
          email="hello@heartoftheblock.org"
          body="Tips, corrections, something confusing, or just to say hi."
        />
        <ContactCard
          emoji="🤝"
          title="Partnerships & your community"
          email="hello@heartoftheblock.org"
          body="Clinics, churches, schools, and community groups — we’d love to help you bring this to your block."
          subject="Partnership"
        />
        <ContactCard
          emoji="🔒"
          title="Your data & privacy"
          email="privacy@heartoftheblock.org"
          body="Ask us to export or delete your account and its data, or ask anything about how it’s handled."
          subject="Data request"
        />
      </div>

      <p className="mt-8 text-sm text-muted">
        Heart of the Block is education, not medical care — see our{" "}
        <Link href="/disclaimer" className="font-semibold text-brick-700 underline">
          disclaimer
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-semibold text-brick-700 underline">
          privacy policy
        </Link>
        .
      </p>
    </div>
  );
}

function ContactCard({
  emoji,
  title,
  email,
  body,
  subject,
}: {
  emoji: string;
  title: string;
  email: string;
  body: string;
  subject?: string;
}) {
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <span aria-hidden className="text-2xl">
          {emoji}
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
          <p className="mt-1 text-sm text-muted">{body}</p>
          <a
            href={href}
            className="mt-2 inline-block font-semibold text-brick-700 hover:underline"
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
