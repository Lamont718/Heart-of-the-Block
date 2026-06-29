/** @type {import('next').NextConfig} */

// Content-Security-Policy. Next injects inline bootstrap/streaming scripts and
// React/Tailwind inject inline styles, so script/style need 'unsafe-inline'
// (a nonce-based policy would need middleware — a larger change). Even so, this
// blocks loading scripts/frames/objects from other origins and locks base-uri
// and form-action. Allowlisted external origins:
//   img-src  — Open Food Facts product photos, CARTO map tiles
//   connect-src — Supabase REST + realtime (wss)
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://*.openfoodfacts.org https://*.basemaps.cartocdn.com",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.openfoodfacts.org",
].join("; ");

const securityHeaders = [
  // Don't leak that we're on Next; cut MIME-sniffing and referrer leakage.
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: csp },
  // Only this site may use the camera (barcode scanner) and location
  // (find-near-me directory); everything else is off.
  {
    key: "Permissions-Policy",
    value: "camera=(self), geolocation=(self), microphone=()",
  },
  // Force HTTPS for two years (the site is HTTPS-only on Vercel).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Let next/image auto-serve AVIF/WebP (smaller than the source JPGs).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
