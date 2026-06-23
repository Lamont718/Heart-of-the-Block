import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";

/**
 * Server-side locale, read from the cookie the language switcher sets. Using
 * this in a page opts that page into dynamic rendering (so content can be
 * translated per request) — that's intentional for translated content pages.
 * Pages that don't call this stay static.
 */
export function getLocale(): Locale {
  const v = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(v) ? v : DEFAULT_LOCALE;
}
