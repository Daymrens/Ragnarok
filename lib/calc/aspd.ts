export const ASPD_CAP = 193;

export interface AspdInput {
  baseAspd: number; // weapon/class base attack speed (lower = faster in classic RO)
  agi: number;
  dex: number;
  buffs: {
    increaseAgi: boolean; // +20% ASPD roughly
    gatlingFever: boolean; // gunslinger big ASPD boost
    foodPotion: boolean; // minor ASPD food
  };
}

/**
 * Estimates displayed ASPD (0-193 cap) from stats and buffs.
 * Model is an approximation of ROW's ASPD system; tune as real formulas surface.
 * - Lower baseAspd = faster. We convert to a 0..193 scale where higher is better.
 */
export function calculateAspd(input: AspdInput): { aspd: number; capped: boolean } {
  // Convert base attack-speed delay into a base rate contribution.
  const baseRate = Math.max(0, 200 - input.baseAspd * 2); // example mapping
  const statRate = input.agi * 0.8 + input.dex * 0.3;
  let rate = baseRate + statRate;

  if (input.buffs.increaseAgi) rate *= 1.2;
  if (input.buffs.foodPotion) rate += 10;
  if (input.buffs.gatlingFever) rate += 45;

  const aspd = Math.min(ASPD_CAP, Math.round(rate));
  return { aspd, capped: aspd >= ASPD_CAP };
}

export function aspdLabel(aspd: number): string {
  if (aspd >= ASPD_CAP) return "Capped (193)";
  if (aspd >= 175) return "Very Fast";
  if (aspd >= 150) return "Fast";
  if (aspd >= 120) return "Moderate";
  return "Slow";
}
