import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/i18n/server";
import { GET_SCREENED } from "@/i18n/content/get-screened";

export const metadata: Metadata = {
  title: "Where to check your numbers | Heart of the Block",
  description:
    "Free and low-cost places around NYC to check your blood pressure, blood sugar, and cholesterol — pharmacies, NYC Care, community health centers, and screening fairs.",
};

export default function GetScreenedPage() {
  const c = GET_SCREENED[getLocale()];

  return (
    <div className="py-12 sm:py-16">
      <div className="container-block max-w-4xl">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
            {c.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {c.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{c.intro}</p>
        </div>

        {/* Resource cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {c.resources.map((r) => (
            <section key={r.title} className="card flex flex-col">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-2xl"
                  aria-hidden
                >
                  {r.emoji}
                </span>
                <h2 className="mt-1 font-display text-lg font-bold text-ink">
                  {r.title}
                </h2>
              </div>
              <p className="mt-3 text-sm text-muted">{r.body}</p>
              {r.link && (
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-brick-700 hover:underline"
                >
                  {r.linkLabel} ↗
                </a>
              )}
            </section>
          ))}
        </div>

        {/* Tracker CTA */}
        <div className="mt-8 rounded-2xl border border-teal/30 bg-teal-100 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              {c.trackTitle}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted">{c.trackBody}</p>
          </div>
          <Link
            href="/tracker"
            className="btn mt-4 shrink-0 bg-teal text-white hover:opacity-90 sm:mt-0"
          >
            {c.trackButton}
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
          {c.disclaimer}
        </p>
      </div>
    </div>
  );
}
