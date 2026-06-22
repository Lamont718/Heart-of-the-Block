import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FirstRunModal } from "@/components/first-run-modal";
import { getUser } from "@/lib/supabase/auth";

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
  openGraph: {
    title: "Heart of the Block",
    description:
      "Brooklyn heart health, the way you live. Real tools, real food, real places near you.",
    type: "website",
    siteName: "Heart of the Block",
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

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brick focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader user={user} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FirstRunModal />
      </body>
    </html>
  );
}
