"use client";

import Link from "next/link";
import { Wordmark } from "./logo";
import { DisclaimerBanner } from "./disclaimer-banner";
import { useT } from "@/i18n/provider";

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-block py-12">
        {/* Persistent medical-safety disclaimer (SPEC §6) */}
        <DisclaimerBanner variant="footer" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm text-muted">{t.footer.tagline}</p>
          </div>

          <FooterCol
            title={t.footer.toolsTitle}
            links={[
              { href: "/swaps", label: t.footer.swaps },
              { href: "/scan", label: t.footer.scanner },
              { href: "/tracker", label: t.footer.tracker },
              { href: "/heart-risk", label: t.footer.heartRisk },
            ]}
          />
          <FooterCol
            title={t.footer.exploreTitle}
            links={[
              { href: "/directory", label: t.nav.shop },
              { href: "/get-screened", label: t.footer.getScreened },
              { href: "/plans", label: t.footer.guidedPlans },
              { href: "/learn", label: t.nav.learn },
              { href: "/community", label: t.nav.community },
            ]}
          />
          <FooterCol
            title={t.footer.aboutTitle}
            links={[
              { href: "/about", label: t.footer.about },
              { href: "/contact", label: t.footer.contact },
              { href: "/disclaimer", label: t.footer.disclaimerLink },
              { href: "/privacy", label: t.footer.privacy },
              { href: "/login", label: t.auth.signIn },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p>
            {t.footer.emergencyPre}{" "}
            <strong className="text-ink">911</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-muted transition hover:text-brick-700"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
