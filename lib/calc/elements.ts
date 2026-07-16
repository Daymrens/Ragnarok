import { elementMultiplier } from "../data/elements";
import type { Element } from "../data/types";

export function isEffective(attacker: Element, defender: Element): boolean {
  return elementMultiplier(attacker, defender) > 1;
}

export function multiplierClass(m: number): string {
  if (m >= 1.25) return "text-crimson font-semibold";
  if (m > 1) return "text-gold-soft";
  if (m === 1) return "text-foreground/70";
  if (m <= 0.5) return "text-sky";
  return "text-sage";
}
