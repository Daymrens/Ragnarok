import type { PlayerGuideSection } from "./types";

// General player guide content (curated from launch coverage + classic RO basics).
export const playerGuide: PlayerGuideSection[] = [
  {
    id: "stat_points",
    title: "Stat Points (STR / AGI / VIT / INT / DEX / LUK)",
    body:
      "Every class shares six primary stats. With Job Freedom you can respec freely, so invest for the content you're doing now.\n" +
      "• STR — physical ATK, carry weight, weapon damage.\n" +
      "• AGI — ASPD, flee, small ATK; key for crit/attack-speed builds (cap 193 ASPD).\n" +
      "• VIT — max HP, defense, status resist; essential for tanks and survivability.\n" +
      "• INT — MATK, SP pool, heal power; mandatory for Mage/Priest/Acolyte.\n" +
      "• DEX — hit rate, ranged/casting, min ATK; key for Archer/Gunslinger.\n" +
      "• LUK — CRIT, perfect dodge, drop rate; pairs with AGI for crit builds.\n" +
      "Soft caps vary by class; most builds put the bulk into 2–3 stats. See each class guide for concrete allocations.",
  },
  {
    id: "skill_system",
    title: "Skills & Free Resets",
    body:
      "Skills are learned with skill points earned on level-up. ROW grants FREE stat and skill resets anytime, so you can experiment with builds without rerolling. Mix-and-match skills across classic and new formulas — there is no single 'meta' build. Use the Build Calculator to plan, then reset freely in-game.",
  },
  {
    id: "leveling",
    title: "Leveling Pace",
    body:
      "Levels 1–25: do Main Story Quests only, don't grind field mobs. After that, Mage and Archer/Hunter are the fastest F2P farmers; Priest shines in parties. Offline Auto-Hunt keeps you farming while away (lower drop rates, but free EXP).",
  },
  {
    id: "stamina",
    title: "Two Stamina Pools",
    body:
      "Combat Stamina (dungeons/MVPs) and Life Stamina (gathering/crafting) are separate and refill independently. Daily priority: Time Corridor ×3 → MVP hunts → Guild Orders → then AFK/Offline Auto-Hunt once Combat Stamina is empty. Server reset is 5:00 AM.",
  },
  {
    id: "economy",
    title: "Economy: Stalls, Auctions & Merchant",
    body:
      "Player-run stalls and real-time auctions return. The Merchant class holds an exclusive on vending stalls. F2P players earn Zeny mainly via Life Stamina materials, Time Corridor drops, and smart stall pricing. Sell high-demand materials into first-week gear demand.",
  },
  {
    id: "pets",
    title: "Pets",
    body:
      "The pet system unlocks early. Tamed pets provide passive bonuses and companionship. Some monsters can be turned into pets via the capture system.",
  },
  {
    id: "romance",
    title: "Romance & Marriage",
    body:
      "No gender restrictions on couples. Benefits: dual teleport, shared Memory Album, daily couple rewards (passive income), joint private home, and server-wide blessings on vows. Daily couple rewards need both partners online within the reset window.",
  },
  {
    id: "f2p_p2w",
    title: "F2P vs P2W (Honest Read)",
    body:
      "ROW's F2P QoL is better than classic RO: offline farming, free resets, and safe refine to +15 all lower the mandatory spend floor. Top-end Guild Wars / competitive PvP is where the gear gap shows — Starstone spending speeds up late-game refinement. F2P players reach the same power, just slower. Don't over-invest in PvP gear before the Druid meta stabilizes.",
  },
];

export function getGuideSection(id: string) {
  return playerGuide.find((s) => s.id === id);
}
