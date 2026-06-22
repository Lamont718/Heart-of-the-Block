import type { Metadata } from "next";
import { getSwaps } from "@/lib/swaps/swaps";
import { SwapFinder } from "@/components/swaps/swap-finder";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

export const metadata: Metadata = {
  title: "Food Swap Finder — your favorites, made to love you back",
  description:
    "Tell us what you eat and get realistic, culturally-rooted food swaps with the why — Caribbean, soul food, and everyday staples done heart-smart.",
};

export const revalidate = 3600;

export default async function SwapsPage() {
  const swaps = await getSwaps();

  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Food Swap Finder
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Your favorites, made to love you back
        </h1>
        <p className="mt-2 text-muted">
          No shame, no giving up the food you love. Tell us what you eat and
          we’ll show you a realistic swap — and exactly why it’s easier on your
          heart.
        </p>
      </header>

      <div className="mt-6">
        <SwapFinder swaps={swaps} />
      </div>

      <div className="mt-8">
        <DisclaimerBanner variant="inline" />
      </div>
    </div>
  );
}
