"use client";

/**
 * Saved-scan storage. Signed-in users keep saved products in the
 * `scanned_items` table so they follow them across devices; everyone else
 * uses localStorage. Same async API either way (`remote = signedIn &&
 * isSupabaseConfigured`). We store enough to render the saved list (name,
 * brand, score) plus the full nutrition/reasons when synced.
 */

import { createClient } from "@/lib/supabase/client";
import type { ScannedProduct, ScoreLevel } from "./types";

const SAVED_KEY = "hotb.scanner.saved.v1";
const MIGRATED_KEY = "hotb.scanner.savedMigratedToAccount.v1";

export type SavedScan = {
  barcode: string;
  name: string;
  brand: string | null;
  level: ScoreLevel | null;
};

function readLocal(): SavedScan[] {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]") as unknown[];
    // Tolerate the old format (a bare array of barcode strings).
    return raw.map((item) =>
      typeof item === "string"
        ? { barcode: item, name: item, brand: null, level: null }
        : (item as SavedScan),
    );
  } catch {
    return [];
  }
}

function writeLocal(scans: SavedScan[]) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(scans));
  } catch {
    /* storage full / blocked */
  }
}

function productToSaved(p: ScannedProduct): SavedScan {
  return {
    barcode: p.barcode,
    name: p.name,
    brand: p.brand,
    level: p.score.level,
  };
}

export async function loadSavedScans(remote: boolean): Promise<SavedScan[]> {
  if (!remote) return readLocal();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("scanned_items")
    .select("barcode_upc, product_name, brand, score, scanned_at")
    .order("scanned_at", { ascending: false });
  if (error) throw error;
  const rows = data as {
    barcode_upc: string;
    product_name: string | null;
    brand: string | null;
    score: ScoreLevel | null;
  }[];
  // One entry per product (most-recent wins).
  const seen = new Set<string>();
  const out: SavedScan[] = [];
  for (const r of rows) {
    if (seen.has(r.barcode_upc)) continue;
    seen.add(r.barcode_upc);
    out.push({
      barcode: r.barcode_upc,
      name: r.product_name ?? r.barcode_upc,
      brand: r.brand,
      level: r.score,
    });
  }
  return out;
}

export async function saveScan(
  product: ScannedProduct,
  remote: boolean,
): Promise<void> {
  if (!remote) {
    const list = readLocal().filter((s) => s.barcode !== product.barcode);
    writeLocal([productToSaved(product), ...list]);
    return;
  }
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  // Keep one row per product for this user.
  await supabase
    .from("scanned_items")
    .delete()
    .eq("barcode_upc", product.barcode);
  const { error } = await supabase.from("scanned_items").insert({
    user_id: user.id,
    barcode_upc: product.barcode,
    product_name: product.name,
    brand: product.brand,
    nutrition: product.nutrition,
    score: product.score.level,
    score_reasons: product.score.reasons.map((r) => r.text),
  });
  if (error) throw error;
}

export async function removeSavedScan(
  barcode: string,
  remote: boolean,
): Promise<void> {
  if (!remote) {
    writeLocal(readLocal().filter((s) => s.barcode !== barcode));
    return;
  }
  const supabase = createClient();
  const { error } = await supabase
    .from("scanned_items")
    .delete()
    .eq("barcode_upc", barcode);
  if (error) throw error;
}

/**
 * One-time lift of locally-saved scans into a freshly signed-in account. Only
 * seeds an empty account so it can't duplicate scans synced elsewhere.
 */
export async function migrateLocalSavedScans(): Promise<void> {
  try {
    if (localStorage.getItem(MIGRATED_KEY)) return;
    const local = readLocal();
    if (local.length === 0) {
      localStorage.setItem(MIGRATED_KEY, "1");
      return;
    }
    const supabase = createClient();
    const { count } = await supabase
      .from("scanned_items")
      .select("id", { count: "exact", head: true });
    if (!count) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("scanned_items").insert(
          local.map((s) => ({
            user_id: user.id,
            barcode_upc: s.barcode,
            product_name: s.name,
            brand: s.brand,
            score: s.level,
          })),
        );
      }
    }
    localStorage.setItem(MIGRATED_KEY, "1");
  } catch {
    /* leave flag unset to retry next visit */
  }
}
