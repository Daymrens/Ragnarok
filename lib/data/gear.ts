import type { Gear } from "./types";

// Representative equipment pieces. Stats are illustrative; refine up to +15 safe.
export const gear: Gear[] = [
  { id: "cat ears", name: "Cat Ears", slot: "Headgear", stats: "SP +20, INT +2", refineNote: "Safe refine to +15." },
  { id: "crew neck", name: "Crew Neck", slot: "Headgear", stats: "MDEF +3, VIT +1" },
  { id: "haedik", name: "Haedik", slot: "Headgear", stats: "AGI +2, ASPD +1" },
  { id: "sword m", name: "Main Sword", slot: "Weapon", stats: "ATK +85, STR +3", refineNote: "Refine adds ATK per level to +15." },
  { id: "rod m", name: "Main Rod", slot: "Weapon", stats: "MATK +90, INT +3", refineNote: "Refine adds MATK per level to +15." },
  { id: "bow m", name: "Main Bow", slot: "Weapon", stats: "ATK +70, DEX +3" },
  { id: "gun m", name: "Main Revolver", slot: "Weapon", stats: "ATK +75, DEX +2" },
  { id: "armor v", name: "VIT Mail", slot: "Armor", stats: "DEF +40, VIT +4", refineNote: "Refine adds DEF/HP%" },
  { id: "armor i", name: "INT Robe", slot: "Armor", stats: "MDEF +20, INT +3" },
  { id: "garment", name: "Guard Garment", slot: "Garment", stats: "DEF +15, +5% resist" },
  { id: "boots a", name: "AGI Boots", slot: "Footgear", stats: "Move +5%, ASPD +1", refineNote: "Refine adds move speed" },
  { id: "shield", name: "Knight Shield", slot: "Shield", stats: "DEF +30, VIT +2" },
  { id: "ring", name: "Attack Ring", slot: "Accessory", stats: "ATK +10, CRIT +3" },
  { id: "brooch", name: "Mage Brooch", slot: "Accessory", stats: "MATK +12, INT +2" },
];

export function getGear(id: string) {
  return gear.find((g) => g.id === id);
}
