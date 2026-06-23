"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/provider";

export function UserMenu({ email }: { email: string }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initial = (email[0] ?? "?").toUpperCase();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-brick font-bold text-white"
        title={email}
      >
        {initial}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl border border-line bg-surface p-2 shadow-card"
        >
          <p className="truncate px-3 py-2 text-sm text-muted" title={email}>
            {email}
          </p>
          <Link
            href="/account"
            role="menuitem"
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink hover:bg-cream"
            onClick={() => setOpen(false)}
          >
            {t.auth.myAccount}
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              role="menuitem"
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-brick-700 hover:bg-brick-100"
            >
              {t.auth.signOut}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
