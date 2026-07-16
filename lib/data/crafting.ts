import type { LifeSkill, CraftStation, MaterialSource } from "./types";

// Life skills run on a separate Life Stamina pool from Combat Stamina.
export const lifeSkills: LifeSkill[] = [
  { id: "mining", name: "Mining", description: "Gather ores/minerals at nodes; feeds smelting & crafting.", outputs: ["Iron Ore", "Silver Ore", "Starstone"] },
  { id: "fishing", name: "Fishing", description: "Catch fish with rod + bait; feeds cooking & alchemy.", outputs: ["Fish", "Rare Catch"] },
  { id: "gathering", name: "Gathering", description: "Collect herbs/plants in the open world; feeds alchemy & cooking.", outputs: ["Herb", "Crystal"] },
  { id: "alchemy", name: "Alchemy", description: "Brew potions/elixirs at an Alchemy station.", outputs: ["Potion", "Elixir"] },
  { id: "cooking", name: "Cooking", description: "Cook meals that grant temporary stat buffs.", outputs: ["Meal Buff"] },
  { id: "smelting", name: "Smelting", description: "Refine raw ores into ingots for crafting/upgrades.", outputs: ["Ingot", "Refine Ore"] },
];

// Crafting/enhancement stations found in towns.
export const stations: CraftStation[] = [
  { id: "blacksmith", name: "Blacksmith Station", purpose: "Forge/upgrade weapons & armor.", towns: ["Prontera", "Geffen", "Payon"] },
  { id: "alchemy_st", name: "Alchemy Station", purpose: "Brew potions & elixirs.", towns: ["Al de Baran", "Prontera"] },
  { id: "cooking_st", name: "Cooking Station", purpose: "Prepare food buffs.", towns: ["Prontera", "Payon"] },
  { id: "refine_npc", name: "Refine NPC", purpose: "Safe refine gear up to +15.", towns: ["Every major town"] },
  { id: "enchant_npc", name: "Enchant NPC", purpose: "Add enchantments (needs Meteorite Dust/Fragments).", towns: ["Prontera"] },
];

// Where crafting/upgrade materials come from.
export const materialSources: MaterialSource[] = [
  { id: "time_corridor", name: "Time Corridor (Daily ×3)", detail: "Backbone of gear progression — equipment materials drop here." },
  { id: "gather", name: "Life Stamina Gathering", detail: "Mine/gather to daily cap; main F2P material income." },
  { id: "fishing", name: "Fishing Spots", detail: "Fish used in cooking recipes and some alchemy." },
  { id: "quest", name: "Quest Rewards", detail: "Important crafting materials often from story/event quests." },
  { id: "npc", name: "Town NPC Merchants", detail: "Basic materials for sale." },
  { id: "mvp", name: "MVP / Mini Boss Drops", detail: "Rare materials + cards for high-end crafting." },
];

// Suggested daily Life Stamina routing (F2P-friendly).
export const lifeRoutine: string[] = [
  "Spend Life Stamina on mining or gathering to daily cap.",
  "Cook a meal buff before combat sessions for free stats.",
  "Smelt ores into ingots to feed weapon/armor crafting.",
  "Sell surplus materials at player stalls / auction for Zeny.",
  "Hold high-demand materials ahead of first-week gear demand.",
];
