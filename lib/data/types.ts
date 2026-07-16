export type Element =
  | "Neutral"
  | "Fire"
  | "Water"
  | "Wind"
  | "Earth"
  | "Holy"
  | "Shadow"
  | "Ghost"
  | "Poison"
  | "Undead";

export type Role = "Melee" | "Ranged" | "Magic" | "Support" | "Hybrid";

export type Race =
  | "Formless"
  | "Undead"
  | "Brute"
  | "Plant"
  | "Insect"
  | "Fish"
  | "Demon"
  | "Human"
  | "Angel"
  | "Dragon";

export type Size = "Small" | "Medium" | "Large";

export type GearSlot =
  | "Weapon"
  | "Armor"
  | "Garment"
  | "Footgear"
  | "Shield"
  | "Headgear"
  | "Accessory";

export type CardSlot = GearSlot;

export interface Skill {
  name: string;
  type: "Active" | "Passive" | "Buff";
  description: string;
  /** short note on when it becomes a priority */
  priority?: "early" | "mid" | "late" | "core";
}

export interface GameClass {
  id: string;
  name: string;
  role: Role;
  tier: "S" | "A" | "B" | "C" | "D";
  blurb: string;
  baseStats: Record<string, number>;
  skills: Skill[];
}

export interface ClassGuide {
  classId: string;
  levelingRoute: string;
  statPriority: { stat: string; note: string }[];
  statPoints: { stat: string; amount: string }[];
  skillOrder: { stage: "core" | "early" | "mid" | "late"; skill: string; note: string }[];
  skillProgression: { early: string; mid: string; late: string };
  gear: { stage: string; suggestion: string }[];
  playstyle: string;
  builds: { name: string; summary: string }[];
}

export interface Monster {
  id: string;
  name: string;
  region: string;
  element: Element;
  race: Race;
  size: Size;
  level: number;
  hp: number;
  drops: string[];
  isMvp?: boolean;
  estimate?: boolean;
  /** optional portrait url (local /public or remote). falls back to a generated sigil */
  image?: string;
}

export interface Card {
  id: string;
  name: string;
  slot: CardSlot;
  effect: string;
  source: string; // monster/MVP name
}

export interface Gear {
  id: string;
  name: string;
  slot: GearSlot;
  stats: string;
  refineNote?: string;
}

export interface GameEvent {
  id: string;
  name: string;
  start: string; // ISO date
  end: string; // ISO date
  rewards: string;
  type: "login" | "mvp" | "collab" | "launch" | "season";
}

export interface ElementMatchup {
  attacker: Element;
  defender: Element;
  multiplier: number; // 0.5, 1, 1.5, 2, etc.
}

export interface LifeSkill {
  id: string;
  name: string;
  description: string;
  outputs: string[];
  /** recommended early-game priority flag */
  priority?: boolean;
  /** what feeds this skill / what it feeds */
  feeds?: string[];
}

export interface CraftStation {
  id: string;
  name: string;
  purpose: string;
  towns: string[];
}

export interface MaterialSource {
  id: string;
  name: string;
  detail: string;
}

export interface CraftMaterial {
  id: string;
  name: string;
  source: "Life Skill" | "MVP Drop" | "Shop" | "Vending" | "Quest" | "Time Corridor";
  /** which life skill or system produces it, if any */
  from?: string;
  region?: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic";
}

export interface Recipe {
  id: string;
  name: string;
  category: "Potion" | "Food" | "Gear Material" | "Ingot" | "Misc";
  skill: string; // life skill id
  station: string; // station id
  level: number;
  /** ingredient id -> qty */
  ingredients: { material: string; qty: number }[];
  /** life energy cost per craft */
  energy: number;
  result: string;
  estimate?: boolean;
}

export interface RefineTier {
  plus: number;
  /** success rate at this step (estimate) */
  rate: string;
  /** zeny / material cost per attempt */
  cost: string;
  note?: string;
}

export interface UpgradeSystem {
  id: string;
  name: string;
  description: string;
  materials: string;
  unlock?: string;
}

export interface Chest {
  id: string;
  region: string;
  name: string;
  type: "chest" | "treasure-map" | "viewpoint";
  hint: string;
  coord?: string;
  source?: string;
  tbd?: boolean; // location not yet verified
}

export interface PlayerGuideSection {
  id: string;
  title: string;
  body: string;
}

export interface MVP {
  id: string;
  name: string;
  map: string;
  element: Element;
  level: number;
  /** respawn window in minutes */
  respawnMin: number;
  respawnMax: number;
  drops: string[];
  /** true if the window is an estimate pending verification */
  estimate?: boolean;
  notes?: string;
  /** optional portrait url (local /public or remote). falls back to a generated sigil */
  image?: string;
  /** short flavor/role line shown on the detail page */
  role?: string;
  /** recommended party composition notes */
  party?: string;
}

export interface RedeemCode {
  code: string;
  rewards: string;
  expires?: string;
  active: boolean;
}

export interface Build {
  id: string;
  name: string;
  classId: string;
  stats: Record<string, number>;
  skills: string[];
  notes?: string;
}

export type PetType = "Pet" | "Mount";
export type CaptureMethod =
  | "Taming item"
  | "Event egg"
  | "Login calendar"
  | "MVP tame"
  | "Shop";

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  source: string; // monster / event / shop name
  capture: CaptureMethod;
  bonus: string; // passive stat / effect summary
  size: "Small" | "Medium" | "Large";
  notes?: string;
  estimate?: boolean;
  /** optional portrait url (local /public or remote). falls back to a generated sigil */
  image?: string;
}
