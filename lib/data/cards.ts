import type { Card } from "./types";

// Notable cards. `source` links to the monster/MVP that drops it.
export const cards: Card[] = [
  { id: "orc_hero", name: "Orc Hero Card", slot: "Weapon", effect: "+20% damage vs Boss-class monsters.", source: "Orc Hero" },
  { id: "doppel", name: "Doppelganger Card", slot: "Armor", effect: "+15% max HP.", source: "Doppelganger" },
  { id: "moonlight", name: "Moonlight Flower Card", slot: "Shield", effect: "Chance to cast Level 5 Sparta on hit.", source: "Moonlight Flower" },
  { id: "eddga", name: "Eddga Card", slot: "Footgear", effect: "+10% movement speed; +5% flee.", source: "Eddga" },
  { id: "stormy", name: "Stormy Knight Card", slot: "Garment", effect: "Reduces wind damage taken by 20%.", source: "Stormy Knight" },
  { id: "ifrit", name: "Ifrit Card", slot: "Weapon", effect: "Ignores normal monster defense when attacking.", source: "Ifrit" },
  { id: "kiel", name: "Kiel D-01 Card", slot: "Headgear", effect: "Reduces after-cast delay by 30%.", source: "Kiel D-01" },
  { id: "maya", name: "Maya Card", slot: "Shield", effect: "Reflects single-target magic to caster (50% chance).", source: "Maya" },
  { id: "goldenbug", name: "Golden Thief Bug Card", slot: "Armor", effect: "Nullifies most enemy magic; immune to status.", source: "Golden Thief Bug" },
  { id: "lordknight", name: "Lord Knight Seyren Card", slot: "Headgear", effect: "Small chance to auto-cast Coma on hit.", source: "Lord Knight Seyren" },
];

