export interface LevelingStep {
  levelRange: string;
  zone: string;
  region: string;
  monsters: string[]; // monster ids referencing monsters.ts
  notes?: string;
  estimate?: boolean;
}

// Leveling / zone route reference for Ragnarok: The New World.
// Zones and monster picks are seeded from classic RO leveling routes and launch
// coverage; flagged `estimate: true` until ROW-specific level curves are verified.
export const leveling: LevelingStep[] = [
  { levelRange: "1–10", zone: "Prontera South Field", region: "Prontera", monsters: ["poring", "lunatic"], notes: "Tutorial zone, safe starter farm.", estimate: true },
  { levelRange: "10–20", zone: "Payon Forest", region: "Payon", monsters: ["fabre"], notes: "Intro to taming spots.", estimate: true },
  { levelRange: "20–30", zone: "Geffen Fields", region: "Geffen", monsters: ["spore", "poison_spore"], notes: "Spell-fodder mobs for Mage AoE.", estimate: true },
  { levelRange: "30–45", zone: "Al de Baran", region: "Al de Baran", monsters: ["yoyo"], notes: "ASPD/pet-farm zone.", estimate: true },
  { levelRange: "45–60", zone: "Mjolnir Field", region: "Mjolnir", monsters: ["kobold", "dragonfly"], notes: "Mid-game grind, cards drop.", estimate: true },
  { levelRange: "60–75", zone: "Orc Dungeon / Orc Village", region: "Orc", monsters: [], notes: "Pre-MVP gear farming.", estimate: true },
  { levelRange: "75–90", zone: "Pyramid / Payon Cave", region: "Pyramid", monsters: [], notes: "Undead exp + MVP warmups.", estimate: true },
  { levelRange: "90+", zone: "Abyss Lakes / Rachel Sanctuary", region: "Endgame", monsters: [], notes: "Endgame MVP rotation.", estimate: true },
];

export function getLevelingFor(level: number): LevelingStep | undefined {
  return leveling.find((s) => {
    const [lo, hi] = s.levelRange.split("–").map((n) => parseInt(n, 10));
    return level >= lo && level <= hi;
  });
}
