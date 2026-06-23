"use client";

import Link from "next/link";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { NAV_LINKS } from "./site-header";
import { LanguageSwitcher } from "./language-switcher";
import { useT } from "@/i18n/provider";

export function MobileNav({ user }: { user: User | null }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? t.menu.close : t.menu.open}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-ink"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-30 bg-ink/20"
          />
          <nav
            aria-label="Mobile"
            className="fixed inset-x-0 top-16 z-40 border-b border-line bg-cream p-4 shadow-card"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-brick-100"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
              <hr className="my-2 border-line" />
              <div className="px-1 pb-1">
                <LanguageSwitcher className="w-full [&>select]:w-full" />
              </div>
              <hr className="my-2 border-line" />
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-brick-100"
                  >
                    {t.auth.myAccount}
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="w-full rounded-xl px-4 py-3 text-left text-base font-semibold text-brick-700 hover:bg-brick-100"
                    >
                      {t.auth.signOut}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="btn-secondary w-full"
                  >
                    {t.auth.signIn}
                  </Link>
                  <Link
                    href="/login?mode=signup"
                    onClick={() => setOpen(false)}
                    className="btn-primary mt-2 w-full"
                  >
                    {t.auth.getStarted}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
