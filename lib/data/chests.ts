import type { Chest } from "./types";

// Exploration collectibles. Exact in-game coordinates are not fully public yet,
// so most entries are a region framework marked `tbd: true` (community sourced).
// Verify in-game / via the wiki's exploration page before relying on hints.
export const chests: Chest[] = [
  // Prontera
  { id: "pr_1", region: "Prontera", name: "South Gate Chest", type: "chest", hint: "Near the south gate plaza.", tbd: true },
  { id: "pr_2", region: "Prontera", name: "Cathedral Viewpoint", type: "viewpoint", hint: "Rooftop overlook of the cathedral.", tbd: true },
  // Payon
  { id: "pay_1", region: "Payon", name: "Payon Cave Entrance Chest", type: "chest", hint: "Just inside Payon Cave.", tbd: true },
  { id: "pay_2", region: "Payon", name: "Forest Treasure Map", type: "treasure-map", hint: "Dropped by field mobs around Payon Forest.", tbd: true },
  // Geffen
  { id: "gef_1", region: "Geffen", name: "Geffen Dungeon Chest", type: "chest", hint: "Lower floors of Geffen Dungeon.", tbd: true },
  { id: "gef_2", region: "Geffen", name: "Wizard Tower Viewpoint", type: "viewpoint", hint: "Top of the magic tower.", tbd: true },
  // Al de Baran
  { id: "adb_1", region: "Al de Baran", name: "Clock Tower Chest", type: "chest", hint: "Mid-floor of the Clock Tower.", tbd: true },
  { id: "adb_2", region: "Al de Baran", name: "City Viewpoint", type: "viewpoint", hint: "Bridge overlook.", tbd: true },
  // Mjolnir
  { id: "mjo_1", region: "Mjolnir Field", name: "Wind Field Chest", type: "chest", hint: "Open plains north of Mjolnir.", tbd: true },
  // Izlude / Beach
  { id: "iz_1", region: "Izlude", name: "Pier Chest", type: "chest", hint: "End of the pier.", tbd: true },
];

export function chestRegions(): string[] {
  return Array.from(new Set(chests.map((c) => c.region))).sort();
}
