export const REFINE_MAX = 15;

export interface RefineResult {
  target: number;
  steps: { level: number; stones: number; total: number }[];
  totalStones: number;
}

// Estimated safe-refine stones per level. Costs ramp up; tune as real numbers surface.
const STONES_PER_LEVEL: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6,
  9: 8, 10: 10, 11: 13, 12: 16, 13: 20, 14: 25, 15: 32,
};

/**
 * Estimates safe-refine stone cost from +0 to a target level (<=15).
 * Safe refine does not destroy the item, but consumes stones per attempt.
 */
export function calculateRefine(target: number): RefineResult {
  const t = Math.max(1, Math.min(REFINE_MAX, Math.floor(target)));
  const steps: RefineResult["steps"] = [];
  let total = 0;
  for (let lvl = 1; lvl <= t; lvl++) {
    const stones = STONES_PER_LEVEL[lvl] ?? 0;
    total += stones;
    steps.push({ level: lvl, stones, total });
  }
  return { target: t, steps, totalStones: total };
}
