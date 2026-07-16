import { elementMultiplier, ELEMENTS } from "@/lib/data/elements";
import type { Element } from "@/lib/data/types";

export interface DamageInput {
  atk: number;
  /** refine level 0..15 */
  refine: number;
  /** attacker element */
  element: Element;
  /** defender element */
  targetElement: Element;
  /** target defense (flat reduction) */
  targetDef: number;
}

export interface DamageEstimate {
  min: number;
  max: number;
  avg: number;
}

// Refine multiplier table (estimate). Maps refine level -> ATK scaling.
// Tuned loosely; ROW's exact refine ATK formula is not public.
const REFINE_MULT: Record<number, number> = {
  0: 1.0, 1: 1.03, 2: 1.06, 3: 1.1, 4: 1.14, 5: 1.18,
  6: 1.23, 7: 1.28, 8: 1.34, 9: 1.4, 10: 1.47, 11: 1.54,
  12: 1.61, 13: 1.69, 14: 1.78, 15: 1.88,
};

const DEF_FACTOR = 0.55; // share of targetDef subtracted (estimate)
const VARIANCE = 0.12; // +/- 12% swing for min/max (estimate)

/**
 * Simplified, APPROXIMATE damage model for ROW. NOT verified against live
 * combat logs — exact in-game formulas are unpublished. Use for relative
 * comparison only.
 *
 *   base = atk * refineMult(refine) * elementMult(attacker, target)
 *   afterDef = max(1, base - targetDef * DEF_FACTOR)
 *   min/max = afterDef * (1 -/+ VARIANCE)
 */
export function estimateDamage(input: DamageInput): DamageEstimate {
  const atk = Math.max(0, input.atk);
  const refine = Math.max(0, Math.min(15, Math.floor(input.refine)));
  const refineMult = REFINE_MULT[refine] ?? 1;
  const elemMult = elementMultiplier(input.element, input.targetElement);
  const base = atk * refineMult * elemMult;
  const afterDef = Math.max(1, base - input.targetDef * DEF_FACTOR);
  const min = Math.round(afterDef * (1 - VARIANCE));
  const max = Math.round(afterDef * (1 + VARIANCE));
  return { min, max, avg: Math.round((min + max) / 2) };
}

export function elementOptions(): Element[] {
  return ELEMENTS;
}
