import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FirstRunModal } from "@/components/first-run-modal";
import { LanguageProvider } from "@/i18n/provider";
import { LanguageNotice } from "@/components/language-notice";
import { getUser } from "@/lib/supabase/auth";
import { JsonLd } from "@/components/json-ld";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/i18n/config";

const SITE_URL = "https://heartoftheblock.org";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Heart of the Block",
  url: SITE_URL,
  description:
    "A Brooklyn heart-health platform. Understand your numbers, make real food swaps, scan products, and find healthy places to shop near you.",
  areaServed: { "@type": "Place", name: "Brooklyn, New York" },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Heart of the Block",
  url: SITE_URL,
  inLanguage: ["en", "es", "ht"],
};

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heartoftheblock.org"),
  title: {
    default: "Heart of the Block — Brooklyn heart health, the way you live",
    template: "%s · Heart of the Block",
  },
  description:
    "A Brooklyn heart-health platform. Understand your numbers, make real food swaps, scan products in the store, and find genuinely healthy places to shop near you.",
  applicationName: "Heart of the Block",
  keywords: [
    "Brooklyn",
    "heart health",
    "healthy food",
    "food swaps",
    "blood pressure",
    "cholesterol",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Heart of the Block",
    description:
      "Brooklyn heart health, the way you live. Real tools, real food, real places near you.",
    type: "website",
    siteName: "Heart of the Block",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heart of the Block",
    description:
      "Brooklyn heart health, the way you live. Real tools, real food, real places near you.",
  },
  appleWebApp: {
    capable: true,
    title: "Heart of the Block",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#c23a22",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();

  // Read the saved locale on the server so the very first HTML carries the
  // right `lang` (screen-reader pronunciation) and renders in the saved
  // language with no flash-of-English. The provider keeps it in sync after.
  const cookieLocale = cookies().get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd data={orgSchema} />
        <JsonLd data={siteSchema} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brick focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <LanguageProvider initialLocale={locale}>
          <SiteHeader user={user} />
          <LanguageNotice />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </LanguageProvider>
        <FirstRunModal />
      </body>
    </html>
  );
}
