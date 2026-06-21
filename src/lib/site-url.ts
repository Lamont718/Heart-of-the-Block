import { headers } from "next/headers";

/**
 * Absolute origin for the current request, used for auth email redirect links.
 * Prefers an explicit env (set this in production), falls back to request
 * headers, then localhost for dev.
 */
export async function getSiteUrl(): Promise<string> {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
    if (host) return `${proto}://${host}`;
  } catch {
    /* not in a request scope */
  }
  return "http://localhost:3000";
}
