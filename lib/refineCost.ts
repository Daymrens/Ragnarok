import { stepData, REFINE_CAP } from "./data/refine";

export interface RefineCost {
  from: number;
  to: number;
  /** expected number of attempts to complete every step once */
  attempts: number;
  /** expected total zeny */
  zeny: number;
  /** expected total ore */
  ore: number;
  /** per-step breakdown */
  steps: { level: number; rate: number; attempts: number; zeny: number; ore: number }[];
}

/**
 * Expected cost to refine from level `from` to `to` (inclusive of the step to `to`).
 * Safe refine does not destroy gear, but each failed step must be re-attempted.
 * Expected attempts for one step = 1 / successRate. All figures are (est.).
 */
export function estimateRefineCost(from: number, to: number): RefineCost {
  const f = Math.max(0, Math.min(REFINE_CAP, Math.floor(from)));
  const t = Math.max(f + 1, Math.min(REFINE_CAP, Math.floor(to)));

  const steps: RefineCost["steps"] = [];
  let totalAttempts = 0;
  let totalZeny = 0;
  let totalOre = 0;

  for (let lvl = f + 1; lvl <= t; lvl++) {
    const d = stepData(lvl);
    const attempts = d.rate > 0 ? 1 / d.rate : Infinity;
    const zeny = attempts * d.zeny;
    const ore = attempts * d.ore;
    steps.push({ level: lvl, rate: d.rate, attempts, zeny: Math.round(zeny), ore: Math.round(ore) });
    totalAttempts += attempts;
    totalZeny += zeny;
    totalOre += ore;
  }

  return {
    from: f,
    to: t,
    attempts: Math.round(totalAttempts * 10) / 10,
    zeny: Math.round(totalZeny),
    ore: Math.round(totalOre),
    steps,
  };
}
