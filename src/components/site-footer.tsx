import Link from "next/link";
import { Wordmark } from "./logo";
import { DisclaimerBanner } from "./disclaimer-banner";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-block py-12">
        {/* Persistent medical-safety disclaimer (SPEC §6) */}
        <DisclaimerBanner variant="footer" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm text-muted">
              Brooklyn heart health, the way you live. Made of the community, not
              outside it.
            </p>
          </div>

          <FooterCol
            title="The tools"
            links={[
              { href: "/swaps", label: "Food Swap Finder" },
              { href: "/scan", label: "Barcode Scanner" },
              { href: "/tracker", label: "Numbers Tracker" },
              { href: "/#tools", label: "Heart-risk check" },
            ]}
          />
          <FooterCol
            title="Explore"
            links={[
              { href: "/directory", label: "Where to shop" },
              { href: "/plans", label: "Guided plans" },
              { href: "/learn", label: "Learn" },
              { href: "/#community", label: "Community" },
            ]}
          />
          <FooterCol
            title="About"
            links={[
              { href: "/disclaimer", label: "Medical disclaimer" },
              { href: "/privacy", label: "Privacy" },
              { href: "/login", label: "Sign in" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Heart of the Block. A Brooklyn
            community project.
          </p>
          <p>
            If this is an emergency, call <strong className="text-ink">911</strong>.
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
          <li key={l.label}>
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
