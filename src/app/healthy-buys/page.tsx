import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { STORES, PRICES_LAST_CHECKED } from "@/data/store-staples-seed";
import { getLocale } from "@/i18n/server";
import { HB_CHROME, HB_STORES } from "@/i18n/content/healthy-buys";

export const metadata: Metadata = {
  title: "Healthy staples & what they cost | Heart of the Block",
  description:
    "What to grab at the stores around Brooklyn — BJ's, Aldi, ShopRite, Key Food, C-Town, Trader Joe's — and roughly what the heart-smart basics cost.",
};

export default function HealthyBuysPage() {
  const locale = getLocale();
  const c = HB_CHROME[locale];
  const tr = locale === "en" ? null : HB_STORES[locale];
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

        {/* Real food banner */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-card">
          <div className="relative h-44 sm:h-60">
            <Image
              src="/images/market.jpg"
              alt="A neighborhood market in Brooklyn"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Price disclaimer */}
        <div className="mt-6 rounded-xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink">
          <p>
            <strong>{c.disclaimerLead}</strong>
            {discLead}
            <strong>{PRICES_LAST_CHECKED}</strong>
            {discRest}
          </p>
        </div>

        {/* Store cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {STORES.map((store) => {
            const st = tr?.[store.id];
            return (
              <section
                key={store.id}
                aria-labelledby={`store-${store.id}`}
                className="card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2
                      id={`store-${store.id}`}
                      className="font-display text-xl font-bold text-ink"
                    >
                      {store.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {st?.blurb ?? store.blurb}
                    </p>
                  </div>
                  <span className="pill shrink-0 bg-teal-100 text-teal">
                    {st?.kind ?? store.kind}
                  </span>
                </div>

                {store.note && (
                  <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-xs text-muted">
                    <span aria-hidden>💡 </span>
                    {st?.note ?? store.note}
                  </p>
                )}

                <ul className="mt-4 divide-y divide-line">
                  {store.staples.map((s, i) => (
                    <li key={s.name} className="flex items-center gap-3 py-3">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cream text-2xl"
                        aria-hidden
                      >
                        {s.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink">
                          {st?.staples[i]?.name ?? s.name}
                        </p>
                        <p className="text-sm text-muted">
                          {st?.staples[i]?.why ?? s.why}
                        </p>
                      </div>
                      <span className="pill shrink-0 whitespace-nowrap bg-gold-100 text-ink">
                        ~{s.price}
                      </span>
                    </li>
                  ))}
                </ul>
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
