import type { Monster } from "./types";

// Field/dungeon mobs + MVPs. HP/levels are seeded from classic RO baselines and
// launch coverage, flagged `estimate` until verified in-game.
export const monsters: Monster[] = [
  // --- Common field mobs ---
  { id: "poring", name: "Poring", region: "Prontera Fields", element: "Neutral", race: "Formless", size: "Small", level: 1, hp: 50, drops: ["Apple", "Garlet"] },
  { id: "lunatic", name: "Lunatic", region: "Prontera Fields", element: "Wind", race: "Plant", size: "Small", level: 4, hp: 120, drops: ["Stem", "Fly Wing"] },
  { id: "willow", name: "Willow", region: "Prontera Fields", element: "Earth", race: "Plant", size: "Medium", level: 12, hp: 600, drops: ["Wooden Block"], estimate: true },
  { id: "fabre", name: "Fabre", region: "Payon Forest", element: "Earth", race: "Insect", size: "Small", level: 8, hp: 300, drops: ["Fabre Horn"] },
  { id: "spore", name: "Spore", region: "Geffen Fields", element: "Poison", race: "Plant", size: "Small", level: 10, hp: 350, drops: ["Red Herb"] },
  { id: "poison_spore", name: "Poison Spore", region: "Geffen Fields", element: "Poison", race: "Plant", size: "Small", level: 14, hp: 480, drops: ["Poison Spore"], estimate: true },
  { id: "yoyo", name: "Yoyo", region: "Al de Baran", element: "Neutral", race: "Formless", size: "Small", level: 20, hp: 900, drops: ["Yoyo's Earring"], estimate: true },
  { id: "kobold", name: "Kobold", region: "Mjolnir Field", element: "Earth", race: "Brute", size: "Medium", level: 24, hp: 1200, drops: ["Kobold Spot"], estimate: true },
  { id: "dragonfly", name: "Dragon Fly", region: "Mjolnir Field", element: "Wind", race: "Insect", size: "Medium", level: 30, hp: 2000, drops: ["Dragon Fly Wing"], estimate: true },

  // --- MVPs (subset; full list also in mvps.ts) ---
  { id: "mvp_orchero", name: "Orc Hero", region: "Orc Village", element: "Fire", race: "Brute", size: "Large", level: 98, hp: 320000, drops: ["Orc Hero Card"], isMvp: true, estimate: true },
  { id: "mvp_doppel", name: "Doppelganger", region: "Geffen Dungeon F3", element: "Shadow", race: "Demon", size: "Medium", level: 72, hp: 249000, drops: ["Doppelganger Card"], isMvp: true, estimate: true },
  { id: "mvp_moonlight", name: "Moonlight Flower", region: "Pyramid", element: "Shadow", race: "Demon", size: "Medium", level: 98, hp: 300000, drops: ["Moonlight Flower Card"], isMvp: true, estimate: true },
  { id: "mvp_edal", name: "Eddga", region: "Payon Cave", element: "Earth", race: "Brute", size: "Large", level: 93, hp: 280000, drops: ["Eddga Card"], isMvp: true, estimate: true },
  { id: "mvp_stormy", name: "Stormy Knight", region: "Abyss Lakes", element: "Wind", race: "Human", size: "Large", level: 98, hp: 310000, drops: ["Stormy Knight Card"], isMvp: true, estimate: true },
];

export function getMonster(id: string) {
  return monsters.find((m) => m.id === id);
}
