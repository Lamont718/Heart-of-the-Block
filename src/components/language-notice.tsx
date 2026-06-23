"use client";

import { useT } from "@/i18n/provider";

/**
 * Shown only when a non-English locale is active: tells visitors that some
 * content is still in English while we translate it (with native review).
 */
export function LanguageNotice() {
  const { locale, t } = useT();
  if (locale === "en") return null;
  return (
    <div className="border-b border-gold/30 bg-gold-100 text-ink">
      <div className="container-block py-2 text-center text-sm">
        <span aria-hidden>🌐 </span>
        {t.notice}
      </div>
    </div>
  );
}
