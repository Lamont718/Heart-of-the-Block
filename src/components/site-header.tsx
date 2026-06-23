"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Wordmark } from "./logo";
import { UserMenu } from "./user-menu";
import { MobileNav } from "./mobile-nav";
import { LanguageSwitcher } from "./language-switcher";
import { useT } from "@/i18n/provider";
import type { Dict } from "@/i18n/dictionaries";

/** Primary nav. `key` maps into the nav dictionary so labels translate. */
export const NAV_LINKS: { href: string; key: keyof Dict["nav"] }[] = [
  { href: "/abcs", key: "abcs" },
  { href: "/directory", key: "shop" },
  { href: "/healthy-buys", key: "healthyBuys" },
  { href: "/money-for-produce", key: "eatForLess" },
  { href: "/plans", key: "plans" },
  { href: "/learn", key: "learn" },
  { href: "/community", key: "community" },
];

export function SiteHeader({ user }: { user: User | null }) {
  const { t } = useT();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur">
      <div className="container-block flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Heart of the Block — home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold text-ink transition hover:bg-brick-100 hover:text-brick-700"
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          {user ? (
            <UserMenu email={user.email ?? ""} />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-semibold text-ink hover:text-brick-700 sm:inline-flex sm:px-3 sm:py-2"
              >
                {t.auth.signIn}
              </Link>
              <Link
                href="/login?mode=signup"
                className="btn-primary !min-h-[40px] !px-4 !py-2 text-sm"
              >
                {t.auth.getStarted}
              </Link>
            </>
          )}
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}
