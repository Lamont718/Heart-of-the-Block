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
