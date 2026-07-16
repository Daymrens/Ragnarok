import type { MVP } from "./types";

// Respawn windows are seeded from classic RO baselines and launch coverage.
// Most are flagged `estimate: true` until ROW-specific timers are verified in-game.
export const mvps: MVP[] = [
  { id: "orchero", name: "Orc Hero", map: "Gefenia / Orc Village", element: "Fire", level: 98, respawnMin: 60, respawnMax: 120, drops: ["Orc Hero Card", "Zeny"], estimate: true },
  { id: "orclord", name: "Orc Lord", map: "Orc Dungeon", element: "Wind", level: 98, respawnMin: 60, respawnMax: 120, drops: ["Orc Lord Card"], estimate: true },
  { id: "doppel", name: "Doppelganger", map: "Geffen Dungeon F3 / Endless Tower", element: "Shadow", level: 72, respawnMin: 120, respawnMax: 130, drops: ["Doppelganger Card"], estimate: true },
  { id: "dracula", name: "Dracula", map: "Payon Forest", element: "Shadow", level: 85, respawnMin: 120, respawnMax: 130, drops: ["Dracula Card"], estimate: true },
  { id: "edda", name: "Eddga", map: "Payon Cave", element: "Earth", level: 93, respawnMin: 60, respawnMax: 120, drops: ["Eddga Card"], estimate: true },
  { id: "moonlight", name: "Moonlight Flower", map: "Pyramid", element: "Shadow", level: 98, respawnMin: 60, respawnMax: 120, drops: ["Moonlight Flower Card"], estimate: true },
  { id: "phalcon", name: "Phreeoni", map: "Prontera Fields", element: "Wind", level: 95, respawnMin: 60, respawnMax: 120, drops: ["Phreeoni Card"], estimate: true },
  { id: "turtle", name: "Turtle General", map: "Turtle Island", element: "Water", level: 92, respawnMin: 12, respawnMax: 60, drops: ["Turtle General Card"], estimate: true },
  { id: "ktul", name: "Ktullanux", map: "Ice Dungeon", element: "Water", level: 98, respawnMin: 1440, respawnMax: 1440, drops: ["Ktullanux Card"], estimate: true },
  { id: "ifrit", name: "Ifrit", map: "Thor Volcano", element: "Fire", level: 98, respawnMin: 360, respawnMax: 360, drops: ["Ifrit Card"], estimate: true },
  { id: "mistress", name: "Mistress", map: "Bongeun Temple", element: "Fire", level: 95, respawnMin: 60, respawnMax: 120, drops: ["Mistress Card"], estimate: true },
  { id: "stormy", name: "Stormy Knight", map: "Abyss Lakes", element: "Wind", level: 98, respawnMin: 60, respawnMax: 120, drops: ["Stormy Knight Card"], estimate: true },
  { id: "osiris", name: "Osiris", map: "Pyramid", element: "Undead", level: 98, respawnMin: 60, respawnMax: 120, drops: ["Osiris Card"], estimate: true },
  { id: "goldenbug", name: "Golden Thief Bug", map: "Ghost Palace", element: "Earth", level: 98, respawnMin: 30, respawnMax: 60, drops: ["Golden Thief Bug Card"], estimate: true },
  { id: "ardanight", name: "Gloom Under Night", map: "Nifflheim", element: "Shadow", level: 99, respawnMin: 1440, respawnMax: 1440, drops: ["Gloom Under Night Card"], estimate: true },
  { id: "atros", name: "Atroce", map: "Rachel Sanctuary", element: "Shadow", level: 99, respawnMin: 1440, respawnMax: 1440, drops: ["Atroce Card"], estimate: true },
];

export function getMVP(id: string) {
  return mvps.find((m) => m.id === id);
}
