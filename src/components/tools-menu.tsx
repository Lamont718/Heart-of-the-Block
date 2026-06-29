"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/provider";

/** The three interactive tools, surfaced together since none are in the
 *  primary nav on their own. Labels reuse the footer tool names. */
export function toolsLinks(t: ReturnType<typeof useT>["t"]) {
  return [
    { href: "/scan", emoji: "📷", label: t.footer.scanner },
    { href: "/tracker", emoji: "📈", label: t.footer.tracker },
    { href: "/swaps", emoji: "🔎", label: t.footer.swaps },
    { href: "/heart-risk", emoji: "❤️", label: t.footer.heartRisk },
  ];
}

/** Desktop-only dropdown. The mobile nav renders the same links inline. */
export function ToolsMenu() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const items = toolsLinks(t);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-ink transition hover:bg-brick-100 hover:text-brick-700"
      >
        {t.nav.tools}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-1 w-56 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-lift"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-brick-100 hover:text-brick-700"
            >
              <span aria-hidden className="text-lg">
                {item.emoji}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
