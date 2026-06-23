import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/i18n/server";
import { ABC_CONTENT } from "@/i18n/content/abcs";

export const metadata: Metadata = {
  title: "The ABCs of Life | Heart of the Block",
  description:
    "Three numbers worth knowing for your heart — A1C (blood sugar), Blood pressure, and Cholesterol. Plain-language guideposts, and where to track yours.",
};

const TONE: Record<"good" | "okay" | "limit", string> = {
  good: "bg-teal-100 text-teal",
  okay: "bg-gold-100 text-ink",
  limit: "bg-brick-100 text-brick-700",
};

export default function ABCsPage() {
  const c = ABC_CONTENT[getLocale()];

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

        {/* Origin credit */}
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
          <p>
            <span aria-hidden>🎙️ </span>
            {c.creditBefore}
            <strong className="text-ink">{c.creditEmph}</strong>
            {c.creditAfter}
          </p>
        </div>

        {/* A / B / C cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {c.cards.map((abc) => (
            <section key={abc.letter} className="card flex flex-col">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brick text-2xl font-extrabold text-white">
                  {abc.letter}
                </span>
                <h2 className="font-display text-xl font-bold text-ink">
                  {abc.name}
                </h2>
              </div>

              <p className="mt-3 text-sm text-muted">{abc.what}</p>

              <ul className="mt-4 space-y-2">
                {abc.rows.map((r) => (
                  <li
                    key={r.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm font-semibold text-ink">
                      {r.label}
                    </span>
                    <span
                      className={`pill whitespace-nowrap text-xs ${TONE[r.tone]}`}
                    >
                      {r.range}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-muted">{abc.note}</p>

              <div className="mt-auto pt-5">
                <Link href={abc.trackHref} className="btn-primary w-full">
                  {abc.trackLabel}
                </Link>
                <Link
                  href={abc.readHref}
                  className="mt-2 block text-center text-sm font-semibold text-brick-700 hover:underline"
                >
                  {abc.readLabel} →
                </Link>
              </div>
            </section>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
          <p>
            {c.disclaimerBefore}
            <strong>{c.disclaimerEmph}</strong>
            {c.disclaimerAfter}
            <strong>911</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
