import type { Metadata } from "next";
import { getListings } from "@/lib/directory/listings";
import { DirectoryExplorer } from "@/components/directory/directory-explorer";

export const metadata: Metadata = {
  title: "Where to shop — healthy spots in Brooklyn",
  description:
    "A map and list of genuinely healthy places to shop in Brooklyn — markets, grocers, and farmers markets with real fresh produce. Filter by open now, distance, and category.",
};

// Listings change rarely; revalidate hourly so DB edits show without a redeploy.
export const revalidate = 3600;

export default async function DirectoryPage() {
  const { listings, usingPlaceholders } = await getListings();

  return (
    <div className="container-block py-8 sm:py-10">
      <header className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-brick-700">
          Where to shop
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Healthy spots near you
        </h1>
        <p className="mt-2 text-muted">
          Real markets, grocers, and farmers markets with fresh produce — the
          places worth the trip. Filter by what’s open, what’s close, and what’s
          good there.
        </p>
      </header>

      {usingPlaceholders && (
        <div
          role="note"
          className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/40 bg-gold-100 p-4 text-sm text-ink"
        >
          <span aria-hidden className="text-lg">
            🚧
          </span>
          <p>
            <strong className="font-semibold">Sample data shown.</strong> These
            are placeholders pinned to neighborhood centers so you can see how
            the directory works — not real listings. The verified Brooklyn list
            goes here next. (See <code>SETUP.md</code> → directory seeding.)
          </p>
        </div>
      )}

      <div className="mt-6">
        <DirectoryExplorer listings={listings} />
      </div>
    </div>
  );
}
