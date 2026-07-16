// Editable refine economy tables for ROW's safe (no gear-loss) refine system.
// Values are ESTIMATES pending community verification — tune as real numbers surface.
// Source into logic (lib/refineCost.ts), never hardcode in components.

export interface RefineStepData {
  /** success rate at this step (0..1) */
  rate: number;
  /** zeny per attempt */
  zeny: number;
  /** refine ore consumed per attempt */
  ore: number;
}

// Index by target level (1..15). rate = chance the single step succeeds.
export const REFINE_TABLE: Record<number, RefineStepData> = {
  1: { rate: 1.0, zeny: 500, ore: 1 },
  2: { rate: 1.0, zeny: 800, ore: 1 },
  3: { rate: 0.95, zeny: 1200, ore: 2 },
  4: { rate: 0.9, zeny: 1800, ore: 2 },
  5: { rate: 0.8, zeny: 2600, ore: 3 },
  6: { rate: 0.7, zeny: 3600, ore: 4 },
  7: { rate: 0.6, zeny: 5000, ore: 5 },
  8: { rate: 0.5, zeny: 7000, ore: 6 },
  9: { rate: 0.4, zeny: 9500, ore: 8 },
  10: { rate: 0.32, zeny: 13000, ore: 10 },
  11: { rate: 0.25, zeny: 18000, ore: 13 },
  12: { rate: 0.18, zeny: 25000, ore: 16 },
  13: { rate: 0.13, zeny: 34000, ore: 20 },
  14: { rate: 0.09, zeny: 46000, ore: 25 },
  15: { rate: 0.06, zeny: 62000, ore: 32 },
};

export const REFINE_CAP = 15;

export function stepData(level: number): RefineStepData {
  return REFINE_TABLE[Math.max(1, Math.min(REFINE_CAP, Math.floor(level)))] ?? {
    rate: 1,
    zeny: 0,
    ore: 0,
  };
}
