import type { Metadata } from "next";
import Link from "next/link";
import { PROGRAMS, PROGRAMS_LAST_CHECKED } from "@/data/produce-programs-seed";
import { getLocale } from "@/i18n/server";
import { MFP_CHROME, MFP_PROGRAMS } from "@/i18n/content/money-for-produce";

export const metadata: Metadata = {
  title: "Money for Produce | Heart of the Block",
  description:
    "Real NYC programs that help you afford fruits and vegetables — Health Bucks, free produce boxes, SNAP, WIC and more. Who qualifies, what you get, and how to get it.",
};

export default function MoneyForProducePage() {
  const locale = getLocale();
  const c = MFP_CHROME[locale];
  const tr = locale === "en" ? null : MFP_PROGRAMS[locale];
  const [discLead, discRest] = c.disclaimerBody.split("{date}");

  return (
    <div className="py-12 sm:py-16">
      <div className="container-block">
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

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
          <p>
            <strong>{c.disclaimerLead}</strong>
            {discLead}
            <strong>{PROGRAMS_LAST_CHECKED}</strong>
            {discRest}
          </p>
        </div>

        {/* Program cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {PROGRAMS.map((p) => {
            const f = tr?.[p.id];
            return (
              <section
                key={p.id}
                aria-labelledby={`prog-${p.id}`}
                className="card flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream text-2xl"
                      aria-hidden
                    >
                      {p.emoji}
                    </span>
                    <div>
                      <h2
                        id={`prog-${p.id}`}
                        className="font-display text-lg font-bold text-ink"
                      >
                        {p.name}
                      </h2>
                      <p className="mt-0.5 text-sm font-semibold text-brick-700">
                        {f?.tagline ?? p.tagline}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`pill shrink-0 text-xs ${
                      p.status === "active"
                        ? "bg-teal-100 text-teal"
                        : "bg-gold-100 text-ink"
                    }`}
                  >
                    {p.status === "active" ? c.statusActive : c.statusVerify}
                  </span>
                </div>

                {p.statusNote && (
                  <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-xs text-muted">
                    <span aria-hidden>⚠️ </span>
                    {f?.statusNote ?? p.statusNote}
                  </p>
                )}

                <dl className="mt-4 space-y-3 text-sm">
                  <Row label={c.whatYouGet} value={f?.whatYouGet ?? p.whatYouGet} />
                  <Row
                    label={c.whoQualifies}
                    value={f?.whoQualifies ?? p.whoQualifies}
                  />
                  <Row label={c.howToGet} value={f?.howToGet ?? p.howToGet} />
                </dl>

                <div className="mt-auto pt-5">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full"
                  >
                    {f?.linkLabel ?? p.linkLabel} ↗
                  </a>
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-2xl border border-line bg-surface p-6 text-center">
          <p className="text-muted">{c.footerNote}</p>
          <Link href="/directory" className="btn-primary mt-4 inline-flex">
            {c.footerCta}
          </Link>
          <p className="mt-4 text-xs text-muted">{c.footerDisclaimer}</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}
