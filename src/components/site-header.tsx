import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Wordmark } from "./logo";
import { UserMenu } from "./user-menu";
import { MobileNav } from "./mobile-nav";

/** Primary nav. Anchors to homepage sections until the feature pages ship. */
export const NAV_LINKS = [
  { href: "/directory", label: "Where to shop" },
  { href: "/healthy-buys", label: "Healthy buys" },
  { href: "/plans", label: "Plans" },
  { href: "/learn", label: "Learn" },
  { href: "/community", label: "Community" },
];

export function SiteHeader({ user }: { user: User | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur">
      <div className="container-block flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Heart of the Block — home">
          <Wordmark />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink transition hover:bg-brick-100 hover:text-brick-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu email={user.email ?? ""} />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-semibold text-ink hover:text-brick-700 sm:inline-flex sm:px-3 sm:py-2"
              >
                Sign in
              </Link>
              <Link href="/login?mode=signup" className="btn-primary !min-h-[40px] !px-4 !py-2 text-sm">
                Get started
              </Link>
            </>
          )}
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}
