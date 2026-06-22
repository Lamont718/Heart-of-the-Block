import type { Metadata } from "next";
import Link from "next/link";
import { PROGRAMS, PROGRAMS_LAST_CHECKED } from "@/data/produce-programs-seed";

export const metadata: Metadata = {
  title: "Money for Produce | Heart of the Block",
  description:
    "Real NYC programs that help you afford fruits and vegetables — Health Bucks, free produce boxes, SNAP, WIC and more. Who qualifies, what you get, and how to get it.",
};

export default function MoneyForProducePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container-block">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
            Eat well for less
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Money for produce
          </h1>
          <p className="mt-3 text-lg text-muted">
            Eating healthy shouldn’t cost more. New York runs real programs that
            put money toward fruits and vegetables — and a lot of people who
            qualify never hear about them. Here’s what’s out there and how to get it.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
          <p>
            <strong>Heads up:</strong> benefit programs and amounts change. We link
            to each program’s <strong>official source</strong> — always confirm the
            details there. Last checked <strong>{PROGRAMS_LAST_CHECKED}</strong>.
            Programs marked <span className="font-semibold">“Confirm it’s running”</span>{" "}
            are worth a quick call before you count on them.
          </p>
        </div>

        {/* Program cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {PROGRAMS.map((p) => (
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
                      {p.tagline}
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
                  {p.status === "active" ? "Available" : "Confirm it’s running"}
                </span>
              </div>

              {p.statusNote && (
                <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-xs text-muted">
                  <span aria-hidden>⚠️ </span>
                  {p.statusNote}
                </p>
              )}

              <dl className="mt-4 space-y-3 text-sm">
                <Row label="What you get" value={p.whatYouGet} />
                <Row label="Who qualifies" value={p.whoQualifies} />
                <Row label="How to get it" value={p.howToGet} />
              </dl>

              <div className="mt-auto pt-5">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full"
                >
                  {p.linkLabel} ↗
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-2xl border border-line bg-surface p-6 text-center">
          <p className="text-muted">
            Most of these work at farmers markets. Find ones near you on the map.
          </p>
          <Link href="/directory" className="btn-primary mt-4 inline-flex">
            Find markets near you
          </Link>
          <p className="mt-4 text-xs text-muted">
            Heart of the Block isn’t affiliated with these programs — we just point
            the way. This is information, not benefits or medical advice.
          </p>
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
