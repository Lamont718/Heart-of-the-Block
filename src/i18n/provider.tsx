"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  type Locale,
} from "./config";
import { dictionaries, type Dict } from "./dictionaries";

type Ctx = { locale: Locale; t: Dict; setLocale: (l: Locale) => void };

const LanguageContext = createContext<Ctx | null>(null);

function readCookieLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const m = document.cookie.match(/(?:^|;\s*)hotb_locale=([^;]+)/);
  return isLocale(m?.[1]) ? (m![1] as Locale) : DEFAULT_LOCALE;
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  // The server reads the locale cookie and passes it in, so the server HTML and
  // the first client render agree (no hydration mismatch) AND there's no
  // flash-of-English. We still re-check the cookie after mount as a safety net.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const saved = readCookieLocale();
    if (saved !== locale) setLocaleState(saved);
    // Run once on mount to reconcile with the actual cookie.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    setLocaleState(l);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: dictionaries[locale], setLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useT(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within a LanguageProvider");
  return ctx;
}
