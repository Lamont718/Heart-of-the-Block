import type { Nutrition } from "./types";

/**
 * Open Food Facts lookup + normalization. Free, open, no API key (SPEC §3a).
 * We pull only the fields we need, prefer per-serving values, and fall back to
 * per-100g. Cached for a day to avoid repeat lookups.
 */
const FIELDS = [
  "product_name",
  "brands",
  "image_front_small_url",
  "serving_size",
  "categories",
  "nutriments",
].join(",");

export interface OffResult {
  found: boolean;
  name?: string;
  brand?: string | null;
  imageUrl?: string | null;
  nutrition?: Nutrition;
  categories?: string;
}

const num = (v: unknown): number | null => {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return typeof n === "number" && !Number.isNaN(n) ? n : null;
};

export async function lookupProduct(barcode: string): Promise<OffResult> {
  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(
    barcode,
  )}.json?fields=${FIELDS}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "HeartOfTheBlock/1.0 (Brooklyn heart-health; contact via heartoftheblock.org)",
    },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return { found: false };

  const data = (await res.json()) as {
    status?: number;
    product?: {
      product_name?: string;
      brands?: string;
      image_front_small_url?: string;
      serving_size?: string;
      categories?: string;
      nutriments?: Record<string, unknown>;
    };
  };

  if (data.status !== 1 || !data.product) return { found: false };
  const p = data.product;
  const nutr = p.nutriments ?? {};

  // Prefer per-serving values; fall back to per-100g.
  const hasServing =
    !!p.serving_size &&
    ["saturated-fat_serving", "sodium_serving", "sugars_serving", "fiber_serving"].some(
      (k) => num(nutr[k]) != null,
    );
  const suf = hasServing ? "_serving" : "_100g";

  const satFatG = num(nutr[`saturated-fat${suf}`]);
  // Sodium in OFF is grams; convert to mg. Fall back to salt/2.5.
  let sodiumG = num(nutr[`sodium${suf}`]);
  if (sodiumG == null) {
    const saltG = num(nutr[`salt${suf}`]);
    if (saltG != null) sodiumG = saltG / 2.5;
  }
  const sodiumMg = sodiumG != null ? Math.round(sodiumG * 1000) : null;
  const sugarG = num(nutr[`sugars${suf}`]);
  const fiberG = num(nutr[`fiber${suf}`]);
  const transFatG = num(nutr[`trans-fat${suf}`]);

  const nutrition: Nutrition = {
    satFatG,
    sodiumMg,
    sugarG,
    fiberG,
    transFatG,
    basis: hasServing ? "serving" : "100g",
    servingSize: p.serving_size ?? null,
  };

  return {
    found: true,
    name: p.product_name?.trim() || "Unnamed product",
    brand: p.brands?.split(",")[0]?.trim() || null,
    imageUrl: p.image_front_small_url ?? null,
    nutrition,
    categories: p.categories,
  };
}
