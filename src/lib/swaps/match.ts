import type { Swap } from "./types";

/**
 * Rank swaps against a free-text query. Simple, fast, no AI (that's a phase-2
 * upgrade per SPEC §5). Scores by where the match lands:
 *   original_food startsWith > original_food includes > keyword > swap/reason.
 */
export function matchSwaps(swaps: Swap[], rawQuery: string): Swap[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];

  const scored: { swap: Swap; score: number }[] = [];
  for (const swap of swaps) {
    const orig = swap.original_food.toLowerCase();
    let score = 0;

    if (orig.startsWith(q)) score = 100;
    else if (orig.includes(q)) score = 80;
    else if ((swap.keywords ?? []).some((k) => k.toLowerCase().includes(q)))
      score = 60;
    else if (swap.swap_food.toLowerCase().includes(q)) score = 30;
    else if (swap.reason.toLowerCase().includes(q)) score = 20;
    else if (swap.cultural_tags.some((t) => t.toLowerCase().includes(q)))
      score = 10;

    if (score > 0) scored.push({ swap, score });
  }

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      a.swap.original_food.localeCompare(b.swap.original_food),
  );
  return scored.map((x) => x.swap);
}

/**
 * Product → swap (the scanner's magic loop). Unlike matchSwaps (which treats
 * the query as one term), this scans a longer product text (name + brand +
 * categories) for any swap's keyword and returns the best (longest, most
 * specific) match — so a Coca-Cola whose category is "Sodas" finds the soda swap.
 */
export function suggestSwapForProduct(
  swaps: Swap[],
  productText: string,
): Swap | null {
  const hay = ` ${productText.toLowerCase()} `;
  let best: { swap: Swap; len: number } | null = null;

  for (const swap of swaps) {
    const terms = [
      swap.original_food.toLowerCase(),
      ...(swap.keywords ?? []).map((k) => k.toLowerCase()),
    ].filter((t) => t.length >= 4);

    for (const t of terms) {
      if (hay.includes(t) && (!best || t.length > best.len)) {
        best = { swap, len: t.length };
      }
    }
  }
  return best?.swap ?? null;
}
