import type {
  LifeSkill,
  CraftStation,
  MaterialSource,
  CraftMaterial,
  Recipe,
  RefineTier,
  UpgradeSystem,
} from "./types";

// Life skills run on a separate Life Energy pool (1,000/day at launch) from Combat Stamina.
// All rates/costs below are launch-window estimates and flagged accordingly.
export const DAILY_LIFE_ENERGY = 1000;

export const lifeSkills: LifeSkill[] = [
  {
    id: "gathering",
    name: "Gathering",
    description: "Collect herbs, plants and crystals scattered across the open world. Feeds Alchemy & Cooking.",
    outputs: ["Herb", "Crystal", "Plant Fiber"],
    priority: true,
    feeds: ["alchemy", "cooking"],
  },
  {
    id: "fishing",
    name: "Fishing",
    description: "Catch fish and rare essence at fishing spots with rod + bait. Feeds Cooking & Alchemy.",
    outputs: ["Fish", "Rare Catch", "Essence"],
    priority: true,
    feeds: ["cooking", "alchemy"],
  },
  {
    id: "mining",
    name: "Mining",
    description: "Extract ores/minerals at nodes. Feeds Smelting & gear crafting.",
    outputs: ["Iron Ore", "Silver Ore", "Starstone"],
    priority: true,
    feeds: ["smelting"],
  },
  {
    id: "smelting",
    name: "Smelting",
    description: "Refine raw ores into ingots used for weapon/armor crafting and upgrades.",
    outputs: ["Ingot", "Refine Ore"],
    priority: true,
    feeds: ["blacksmith"],
  },
  {
    id: "alchemy",
    name: "Alchemy",
    description: "Brew HP/SP recovery and combat buff potions at an Alchemy station.",
    outputs: ["Potion", "Elixir", "Buff Vial"],
    feeds: [],
  },
  {
    id: "cooking",
    name: "Cooking",
    description: "Cook meals that grant temporary stat buffs (20-min, non-stacking).",
    outputs: ["Meal Buff", "Stat Food"],
    feeds: [],
  },
];

// Crafting/enhancement stations found in towns (or your Homestead).
export const stations: CraftStation[] = [
  { id: "blacksmith", name: "Blacksmith Station", purpose: "Forge/upgrade weapons & armor.", towns: ["Prontera", "Geffen", "Payon"] },
  { id: "alchemy_st", name: "Alchemy Station", purpose: "Brew potions & elixirs.", towns: ["Al de Baran", "Prontera"] },
  { id: "cooking_st", name: "Cooking Station", purpose: "Prepare food buffs.", towns: ["Prontera", "Payon"] },
  { id: "refine_npc", name: "Refine NPC", purpose: "Safe refine gear up to +15 (no break).", towns: ["Every major town"] },
  { id: "enchant_npc", name: "Enchant NPC", purpose: "Add enchantments (needs Meteorite Dust/Fragments).", towns: ["Prontera"] },
  { id: "homestead", name: "Homestead Workbench", purpose: "Personal crafting station, unlocks at Base Lv 37.", towns: ["Homestead"] },
];

// Where crafting/upgrade materials come from.
export const materialSources: MaterialSource[] = [
  { id: "time_corridor", name: "Time Corridor (Daily ×3)", detail: "Backbone of gear progression — equipment materials drop here. Use Hard Mode after unlocking." },
  { id: "life_energy", name: "Life Energy Gathering", detail: `Mine/gather to the ${DAILY_LIFE_ENERGY}/day cap; main F2P material income.` },
  { id: "fishing", name: "Fishing Spots", detail: "Fish used in cooking recipes and some alchemy." },
  { id: "quest", name: "Quest Rewards", detail: "Important crafting materials often from story/event quests." },
  { id: "npc", name: "Town NPC Merchants", detail: "Basic materials for sale with Zeny." },
  { id: "mvp", name: "MVP / Mini Boss Drops", detail: "Rare materials + cards for high-end crafting and enchant fodder." },
  { id: "vending", name: "Player Stalls / Auction", detail: "Buy or sell surplus materials; watch first-week demand spikes." },
];

// Curated material catalog (estimates flagged on recipes, not here).
export const materials: CraftMaterial[] = [
  { id: "iron_ore", name: "Iron Ore", source: "Life Skill", from: "Mining", rarity: "Common" },
  { id: "silver_ore", name: "Silver Ore", source: "Life Skill", from: "Mining", rarity: "Uncommon" },
  { id: "starstone", name: "Starstone", source: "Life Skill", from: "Mining", rarity: "Rare" },
  { id: "herb", name: "Herb", source: "Life Skill", from: "Gathering", rarity: "Common" },
  { id: "crystal", name: "Crystal", source: "Life Skill", from: "Gathering", rarity: "Uncommon" },
  { id: "plant_fiber", name: "Plant Fiber", source: "Life Skill", from: "Gathering", rarity: "Common" },
  { id: "fish", name: "Fish", source: "Life Skill", from: "Fishing", rarity: "Common" },
  { id: "rare_catch", name: "Rare Catch", source: "Life Skill", from: "Fishing", rarity: "Rare" },
  { id: "ingot", name: "Iron Ingot", source: "Life Skill", from: "Smelting", rarity: "Common" },
  { id: "refine_ore", name: "Refine Ore", source: "Life Skill", from: "Smelting", rarity: "Uncommon" },
  { id: "red_potion", name: "Red Potion", source: "Shop", rarity: "Common" },
  { id: "cooking_oil", name: "Cooking Oil", source: "Shop", rarity: "Common" },
  { id: "meteorite_dust", name: "Meteorite Dust", source: "MVP Drop", rarity: "Rare" },
  { id: "meteorite_fragment", name: "Meteorite Fragment", source: "MVP Drop", rarity: "Epic" },
  { id: "gear_material", name: "Gear Material", source: "Time Corridor", rarity: "Rare" },
  { id: "mvp_material", name: "MVP Material", source: "MVP Drop", rarity: "Epic" },
];

// Recipes (launch-window estimates). ingredients reference materials by id.
export const recipes: Recipe[] = [
  {
    id: "red_potion_brew",
    name: "HP Recovery Potion",
    category: "Potion",
    skill: "alchemy",
    station: "alchemy_st",
    level: 1,
    ingredients: [{ material: "herb", qty: 3 }, { material: "red_potion", qty: 1 }],
    energy: 10,
    result: "Restores a chunk of HP — core survival craft.",
    estimate: true,
  },
  {
    id: "buff_vial",
    name: "Combat Buff Vial",
    category: "Potion",
    skill: "alchemy",
    station: "alchemy_st",
    level: 5,
    ingredients: [{ material: "crystal", qty: 2 }, { material: "rare_catch", qty: 1 }],
    energy: 25,
    result: "Temporary ATK/DEF boost for MVP and dungeon runs.",
    estimate: true,
  },
  {
    id: "str_food",
    name: "STR Meal",
    category: "Food",
    skill: "cooking",
    station: "cooking_st",
    level: 1,
    ingredients: [{ material: "fish", qty: 2 }, { material: "cooking_oil", qty: 1 }],
    energy: 15,
    result: "+STR food buff (20 min, non-stacking).",
    estimate: true,
  },
  {
    id: "int_food",
    name: "INT Herbal Tea",
    category: "Food",
    skill: "cooking",
    station: "cooking_st",
    level: 3,
    ingredients: [{ material: "herb", qty: 3 }, { material: "red_potion", qty: 1 }],
    energy: 15,
    result: "+INT food buff (20 min, non-stacking).",
    estimate: true,
  },
  {
    id: "iron_ingot",
    name: "Iron Ingot",
    category: "Ingot",
    skill: "smelting",
    station: "blacksmith",
    level: 1,
    ingredients: [{ material: "iron_ore", qty: 5 }],
    energy: 10,
    result: "Base ingot for weapon/armor forging.",
  },
  {
    id: "refine_ore_smith",
    name: "Refine Ore",
    category: "Gear Material",
    skill: "smelting",
    station: "blacksmith",
    level: 5,
    ingredients: [{ material: "silver_ore", qty: 3 }, { material: "starstone", qty: 1 }],
    energy: 20,
    result: "Used in safe refinement and high-tier crafting.",
    estimate: true,
  },
  {
    id: "gear_forge",
    name: "Forged Gear Piece",
    category: "Gear Material",
    skill: "mining",
    station: "blacksmith",
    level: 8,
    ingredients: [{ material: "ingot", qty: 4 }, { material: "gear_material", qty: 2 }],
    energy: 30,
    result: "Crafted equipment base for refinement/enchant.",
    estimate: true,
  },
];

// Safe refinement: ROW lets you refine to +15 without gear destruction (launch feature).
// Rates/costs are estimates pending official tables.
export const refineTiers: RefineTier[] = [
  { plus: 1, rate: "100%", cost: "Low Zeny", note: "Always safe." },
  { plus: 4, rate: "High", cost: "Low Zeny + Ore" },
  { plus: 7, rate: "Medium", cost: "Moderate Ore" },
  { plus: 9, rate: "Medium-Low", cost: "Refine Ore", note: "Consider protection." },
  { plus: 12, rate: "Low", cost: "Refine Ore + Starstone" },
  { plus: 15, rate: "Very Low", cost: "High Refine Ore", note: "Safe cap — no break." },
];

export const SAFE_REFINE_CAP = 15;

// Layered gear-upgrade systems beyond base refine.
export const upgradeSystems: UpgradeSystem[] = [
  {
    id: "card",
    name: "Cards",
    description: "Inlay monster cards into gear sockets for stat bonuses and special effects.",
    materials: "Cards from monster/MVP drops",
    unlock: "Available from Novice Village (~Base 5).",
  },
  {
    id: "enchant",
    name: "Enchants",
    description: "Add enchantments to gear at the Enchant NPC for additional affixes.",
    materials: "Meteorite Dust / Meteorite Fragment",
  },
  {
    id: "rune",
    name: "Rune Engine",
    description: "Socket runes for deeper stat customization on your gear.",
    materials: "Rune shards (endgame)",
    unlock: "Mid/late game.",
  },
  {
    id: "fusion",
    name: "Card Fusion",
    description: "Fuse cards to create stronger combined effects.",
    materials: "Duplicate / matched cards",
  },
  {
    id: "relic",
    name: "Relic",
    description: "Equip relics for powerful passive bonuses.",
    materials: "Relic fragments (endgame)",
    unlock: "Endgame.",
  },
];

// Suggested daily Life Energy routing (F2P-friendly).
export const lifeRoutine: string[] = [
  `Spend Life Energy on Gathering, Fishing, Mining & Smelting to the ${DAILY_LIFE_ENERGY}/day cap.`,
  "Cook a meal buff before combat sessions for free stats (non-stacking, 20 min).",
  "Smelt ores into ingots to feed weapon/armor crafting.",
  "Brew HP/SP potions so you stop buying them from shops.",
  "Sell surplus materials at player stalls / auction for Zeny.",
  "Hold high-demand materials ahead of first-week gear demand spikes.",
];
