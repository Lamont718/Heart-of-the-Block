import type { Metadata } from "next";
import { Scanner } from "@/components/scanner/scanner";
import { DisclaimerBanner } from "@/components/disclaimer-banner";

export const metadata: Metadata = {
  title: "Barcode Scanner — a heart read, right in the aisle",
  description:
    "Scan a product's barcode and get an instant, plain-language heart-health read — then a better swap. Powered by Open Food Facts.",
};

export default function ScanPage() {
  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Barcode Scanner
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          A heart read, right in the aisle
        </h1>
        <p className="mt-2 text-muted">
          Standing in the store? Scan the barcode and we’ll tell you what’s good
          and what to watch — in plain language — then point you to a swap that
          loves you back.
        </p>
      </header>

      <div className="mx-auto mt-6 max-w-xl">
        <Scanner />
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <DisclaimerBanner variant="inline" />
        <p className="mt-3 text-center text-xs text-muted">
          Product data from Open Food Facts, a free community database. Coverage
          and accuracy vary, especially for small local brands.
        </p>
      </div>
    </div>
  );
}
