import { NextResponse } from "next/server";
import { lookupProduct } from "@/lib/scanner/off";
import { scoreNutrition } from "@/lib/scanner/scoring";
import { getSwaps } from "@/lib/swaps/swaps";
import { suggestSwapForProduct } from "@/lib/swaps/match";
import type { ScanResponse } from "@/lib/scanner/types";
import type { Swap } from "@/lib/swaps/types";

/**
 * GET /api/product/:barcode
 * Looks up a product on Open Food Facts, scores it with OUR heart-health logic,
 * and (if it rates "limit") attaches a culturally-relevant swap from the same
 * dataset the Food Swap Finder uses — the scan → score → swap loop (SPEC §3a).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ barcode: string }> },
) {
  const { barcode } = await params;
  const clean = (barcode || "").replace(/\D/g, "");
  if (clean.length < 6 || clean.length > 14) {
    return NextResponse.json(
      { found: false, error: "invalid_barcode" },
      { status: 400 },
    );
  }

  let off;
  try {
    off = await lookupProduct(clean);
  } catch {
    return NextResponse.json(
      { found: false, error: "lookup_failed" } satisfies ScanResponse & {
        error: string;
      },
      { status: 502 },
    );
  }

  if (!off.found || !off.nutrition) {
    const body: ScanResponse = { found: false };
    return NextResponse.json(body);
  }

  const score = scoreNutrition(off.nutrition);

  // Magic loop: surface a swap when the item rates "limit".
  let suggestedSwap: Swap | null = null;
  if (score.level === "limit") {
    try {
      const swaps = await getSwaps();
      const productText = [off.name, off.brand, off.categories]
        .filter(Boolean)
        .join(" ");
      suggestedSwap = suggestSwapForProduct(swaps, productText);
    } catch {
      suggestedSwap = null;
    }
  }

  const body: ScanResponse = {
    found: true,
    product: {
      barcode: clean,
      name: off.name ?? "Unnamed product",
      brand: off.brand ?? null,
      imageUrl: off.imageUrl ?? null,
      nutrition: off.nutrition,
      score,
    },
    suggestedSwap,
  };
  return NextResponse.json(body);
}
