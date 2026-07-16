import type { Element } from "./types";

// ROW element matchup multipliers (attacker element vs defender element).
// 1.0 = neutral. Values follow classic RO conventions adapted for ROW.
// Adjust as real in-game numbers surface.
export const ELEMENTS: Element[] = [
  "Neutral",
  "Fire",
  "Water",
  "Wind",
  "Earth",
  "Holy",
  "Shadow",
  "Ghost",
  "Poison",
  "Undead",
];

// multiplier[attacker][defender]
const MATRIX: Record<Element, Record<Element, number>> = {
  Neutral: neutralRow(),
  Fire: row("Fire", { Earth: 1.5, Wind: 0.5, Water: 0.5, Fire: 0.75 }),
  Water: row("Water", { Fire: 1.5, Earth: 0.5, Wind: 1, Water: 0.75 }),
  Wind: row("Wind", { Water: 1.5, Earth: 1, Fire: 1, Wind: 0.75 }),
  Earth: row("Earth", { Wind: 1.5, Water: 1, Fire: 1, Earth: 0.75 }),
  Holy: row("Holy", { Undead: 1.75, Shadow: 1.25, Ghost: 0.75, Holy: 0.75 }),
  Shadow: row("Shadow", { Holy: 0.75, Shadow: 0.75, Ghost: 0.5, Undead: 1 }),
  Ghost: row("Ghost", { Undead: 0.5, Shadow: 1.25, Holy: 1.25, Ghost: 0.25 }),
  Poison: row("Poison", { Poison: 0.75 }),
  Undead: row("Undead", { Holy: 0.75 }),
};

function neutralRow(): Record<Element, number> {
  return ELEMENTS.reduce(
    (acc, e) => ((acc[e] = 1), acc),
    {} as Record<Element, number>
  );
}

function row(
  _self: Element,
  overrides: Partial<Record<Element, number>>
): Record<Element, number> {
  const base = neutralRow();
  for (const k of Object.keys(overrides) as Element[]) {
    base[k] = overrides[k]!;
  }
  return base;
}

export function elementMultiplier(attacker: Element, defender: Element): number {
  return MATRIX[attacker]?.[defender] ?? 1;
}

export function multiplierLabel(m: number): string {
  if (m >= 1.75) return "Massive";
  if (m >= 1.25) return "Strong";
  if (m > 1) return "Good";
  if (m === 1) return "Neutral";
  if (m <= 0.5) return "Resist";
  return "Weak";
}
