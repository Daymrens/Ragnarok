import type { Pet } from "./types";

// Pets & Mounts reference for Ragnarok: The New World.
// Capture methods and bonuses are seeded from classic RO + launch coverage and
// flagged `estimate: true` until ROW-specific data is verified in-game.
export const pets: Pet[] = [
  { id: "poring", name: "Poring", type: "Pet", source: "Poring (Prontera Fields)", capture: "Taming item", bonus: "Auto-loot chance + small HP regen", size: "Small", estimate: true },
  { id: "lunatic", name: "Lunatic", type: "Pet", source: "Lunatic (Prontera Fields)", capture: "Taming item", bonus: "SP regen on hit", size: "Small", estimate: true },
  { id: "fabre", name: "Fabre", type: "Pet", source: "Fabre (Payon Forest)", capture: "Taming item", bonus: "FLEE +2", size: "Small", estimate: true },
  { id: "spore", name: "Spore", type: "Pet", source: "Spore (Geffen Fields)", capture: "Taming item", bonus: "Poison resist", size: "Small", estimate: true },
  { id: "yoyo", name: "Yoyo", type: "Pet", source: "Yoyo (Al de Baran)", capture: "Taming item", bonus: "Movement speed + small ASPD", size: "Small", estimate: true },
  { id: "pick_yoyo", name: "Pick-Yoyo", type: "Pet", source: "Egg (event)", capture: "Event egg", bonus: "Zeny drop rate +5%", size: "Small", estimate: true },
  { id: "angeling", name: "Angeling", type: "Pet", source: "Egg (login calendar)", capture: "Login calendar", bonus: "Holy resist + small MATK", size: "Medium", estimate: true },
  { id: "deviruchi", name: "Deviruchi", type: "Pet", source: "Egg (event)", capture: "Event egg", bonus: "EXP gain +3%", size: "Small", estimate: true },
  { id: "baby_angeling", name: "Baby Angeling", type: "Pet", source: "Egg (event)", capture: "Event egg", bonus: "Heal-over-time in combat", size: "Small", estimate: true },
  { id: "mount_orchero", name: "Orc Hero Mount", type: "Mount", source: "Orc Hero (MVP tame)", capture: "MVP tame", bonus: "Mounted move speed + intimidate aura", size: "Large", estimate: true },
  { id: "mount_moonlight", name: "Moonlight Flower Mount", type: "Mount", source: "Moonlight Flower (MVP tame)", capture: "MVP tame", bonus: "Mounted move speed + shadow trail", size: "Large", estimate: true },
  { id: "mount_eddga", name: "Eddga Mount", type: "Mount", source: "Eddga (MVP tame)", capture: "MVP tame", bonus: "Mounted move speed + earth stomp", size: "Large", estimate: true },
  { id: "paradise_pet", name: "Paradise Dance Pet", type: "Pet", source: "Paradise Shop (Dance coins)", capture: "Shop", bonus: "Dance-coin earning bonus", size: "Small", estimate: true },
];

export function getPet(id: string) {
  return pets.find((p) => p.id === id);
}
