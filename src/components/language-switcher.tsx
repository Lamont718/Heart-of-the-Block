"use client";

import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";
import { useT } from "@/i18n/provider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useT();
  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <span className="sr-only">{t.switcher.label}</span>
      <span aria-hidden className="pointer-events-none absolute left-2 text-sm">
        🌐
      </span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="h-10 cursor-pointer rounded-lg border border-line bg-surface pl-7 pr-2 text-sm font-semibold text-ink"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
