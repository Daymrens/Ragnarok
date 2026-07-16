import type { ClassGuide } from "./types";

export const guides: ClassGuide[] = [
  {
    classId: "swordman",
    levelingRoute:
      "Farm low-level fields (Prontera outskirts) with Bash + Magnum Break. Join parties for fastest MVP XP once geared.",
    statPriority: [
      { stat: "VIT", note: "Primary — survivability for tanking MVPs." },
      { stat: "STR", note: "Secondary — melee damage." },
      { stat: "AGI", note: "Tertiary — some ASPD and flee." },
    ],
    statPoints: [
      { stat: "STR", amount: "80+" },
      { stat: "VIT", amount: "80+" },
      { stat: "DEX", amount: "Remaining (hit rate)" },
      { stat: "AGI", amount: "Optional" },
    ],
    skillOrder: [
      { stage: "core", skill: "Bash", note: "Main single-target." },
      { stage: "core", skill: "Provoke", note: "Hold aggro, lower def." },
      { stage: "early", skill: "Magnum Break", note: "AoE + knockback." },
      { stage: "mid", skill: "Endure", note: "Immunity to CC while tanking." },
      { stage: "late", skill: "Cavest", note: "Defensive passive." },
    ],
    skillProgression: {
      early: "Max Bash and Provoke; take Magnum Break for AoE.",
      mid: "Invest Endure and defensive passives for MVP tanking.",
      late: "Round out Cavest and utility for endgame parties.",
    },
    gear: [
      { stage: "Early", suggestion: "Any VIT/DEF gear; focus HP stacking." },
      { stage: "Mid", suggestion: "Shield + armor with damage reduction cards." },
      { stage: "Late", suggestion: "MVP-tank set with elemental resist and HP%." },
    ],
    playstyle:
      "Lead from the front. Provoke the MVP, hold aggro, and let backline DPS free. Reposition with Endure during burst windows.",
    builds: [{ name: "Tank", summary: "VIT/STR bruiser built to survive and hold MVP aggro." }],
  },
  {
    classId: "mage",
    levelingRoute:
      "Soul Strike + Fire Ball AoE grind mobs. Fastest solo leveling in early game; strong in MVP parties for burst.",
    statPriority: [
      { stat: "INT", note: "Primary — matk and SP." },
      { stat: "DEX", note: "Secondary — cast time and hit." },
      { stat: "VIT", note: "Tertiary — a little survival." },
    ],
    statPoints: [
      { stat: "INT", amount: "90+" },
      { stat: "DEX", amount: "60–70" },
      { stat: "VIT", amount: "Remaining (survivability)" },
    ],
    skillOrder: [
      { stage: "core", skill: "Fire Ball", note: "Burst nuke." },
      { stage: "core", skill: "Soul Strike", note: "AoE clear." },
      { stage: "early", skill: "Frost Nova", note: "Hard CC for safety." },
      { stage: "mid", skill: "Energy Coat", note: "Survivability." },
      { stage: "late", skill: "Safety Wall", note: "MVP party utility." },
    ],
    skillProgression: {
      early: "Max Fire Ball and Soul Strike for AoE clear.",
      mid: "Take Energy Coat and Frost Nova for survivability and control.",
      late: "Safety Wall and utility for MVP support.",
    },
    gear: [
      { stage: "Early", suggestion: "Matk staff + INT gear." },
      { stage: "Mid", suggestion: "Elemental rods matched to monster weakness." },
      { stage: "Late", suggestion: "Burst MVP set with cast-time reduction." },
    ],
    playstyle:
      "Kite and nuke. Use elemental matching (check MVP element) for max damage. Keep Energy Coat up in dangerous fights.",
    builds: [{ name: "Burst Mage", summary: "INT/DEX nuke build maximizing single-target and AoE burst." }],
  },
  {
    classId: "archer",
    levelingRoute:
      "Double Strafe farm; Arrow Shower for AoE. ADL build is a premier farmer for steady Zeny income.",
    statPriority: [
      { stat: "AGI", note: "Primary — ASPD and flee." },
      { stat: "DEX", note: "Primary — ranged damage and hit." },
      { stat: "LUK", note: "Secondary — crit for ADL." },
    ],
    statPoints: [
      { stat: "AGI", amount: "High" },
      { stat: "DEX", amount: "High" },
      { stat: "LUK", amount: "Rest (crit)" },
    ],
    skillOrder: [
      { stage: "core", skill: "Double Strafe", note: "Main ranged hit." },
      { stage: "core", skill: "Vulture's Eye", note: "Range + hit." },
      { stage: "early", skill: "Arrow Shower", note: "AoE farming." },
      { stage: "mid", skill: "Ankle Snare", note: "Control/kiting." },
      { stage: "late", skill: "Focused Arrow Strike", note: "Burst single-target." },
    ],
    skillProgression: {
      early: "Max Double Strafe and Vulture's Eye.",
      mid: "Arrow Shower for AoE; Ankle Snare for control.",
      late: "Focused Arrow Strike for burst single-target.",
    },
    gear: [
      { stage: "Early", suggestion: "Bow + AGI/DEX gear." },
      { stage: "Mid", suggestion: "Crit/carrot build pieces for ADL." },
      { stage: "Late", suggestion: "MVP-ranged set with ASPD and crit." },
    ],
    playstyle:
      "Kite at max range. ADL (AGI/DEX/LUK) prioritizes crit and attack speed. Reposition constantly to avoid melee.",
    builds: [{ name: "ADL Hunter", summary: "AGI/DEX/LUK crit-ranged farmer; top Zeny earner." }],
  },
  {
    classId: "acolyte",
    levelingRoute:
      "Heal/buff parties for efficient MVP XP. Slower solo, but always welcomed in groups.",
    statPriority: [
      { stat: "INT", note: "Primary — heal power and SP." },
      { stat: "VIT", note: "Secondary — survivability." },
      { stat: "DEX", note: "Tertiary — cast and hit." },
    ],
    statPoints: [
      { stat: "INT", amount: "80+" },
      { stat: "DEX", amount: "70+" },
      { stat: "VIT/STR", amount: "Remaining" },
    ],
    skillOrder: [
      { stage: "core", skill: "Heal", note: "Keep party alive." },
      { stage: "core", skill: "Blessing", note: "STR/DEX/INT buff." },
      { stage: "early", skill: "Increase AGI", note: "Move/ASPD buff." },
      { stage: "mid", skill: "Holy Light", note: "Undead damage." },
      { stage: "late", skill: "Resurrection", note: "Revive allies." },
    ],
    skillProgression: {
      early: "Max Heal and Blessing; take Increase AGI.",
      mid: "Holy Light for undead; utility buffs.",
      late: "Resurrection for endgame parties.",
    },
    gear: [
      { stage: "Early", suggestion: "INT/VIT gear, rod." },
      { stage: "Mid", suggestion: "Heal-power and SP gear." },
      { stage: "Late", suggestion: "Support MVP set with cast reduction." },
    ],
    playstyle:
      "Stay behind the tank. Pre-buff with Blessing + Increase AGI, then focus heals on the MVP damage dealers.",
    builds: [{ name: "Priest", summary: "INT/VIT healer keeping the MVP party alive." }],
  },
  {
    classId: "thief",
    levelingRoute:
      "Double Attack farming; Crit Assassin reaches 193 ASPD for elite single-target DPS.",
    statPriority: [
      { stat: "AGI", note: "Primary — ASPD toward 193 cap." },
      { stat: "LUK", note: "Primary — crit rate." },
      { stat: "STR", note: "Secondary — melee damage." },
    ],
    statPoints: [
      { stat: "AGI", amount: "High (push 193 ASPD)" },
      { stat: "LUK", amount: "High (crit)" },
      { stat: "STR", amount: "Remaining" },
    ],
    skillOrder: [
      { stage: "core", skill: "Double Attack", note: "Chance to double hit." },
      { stage: "early", skill: "Steal", note: "Utility." },
      { stage: "mid", skill: "Envenom", note: "DoT." },
      { stage: "mid", skill: "Hiding", note: "Reposition/escape." },
      { stage: "late", skill: "Sonic Blow", note: "Burst window." },
    ],
    skillProgression: {
      early: "Max Double Attack; take Steal for utility.",
      mid: "Envenom and Hiding for survivability.",
      late: "Sonic Blow for burst windows.",
    },
    gear: [
      { stage: "Early", suggestion: "Crit/ASPD daggers." },
      { stage: "Mid", suggestion: "Crit-rate and ASPD accessories." },
      { stage: "Late", suggestion: "Crit Assassin set hitting 193 ASPD." },
    ],
    playstyle:
      "Stack AGI/LUK for crit and attack speed. Open with Hiding, burst with Sonic Blow during windows. Glass cannon — avoid tanking.",
    builds: [{ name: "Crit Assassin", summary: "AGI/LUK crit build pushing 193 ASPD for extreme DPS." }],
  },
  {
    classId: "gunslinger",
    levelingRoute:
      "Gatling Fever + Rebellion AoE grind. S-tier leveling and strong early MVP sustained DPS.",
    statPriority: [
      { stat: "DEX", note: "Primary — ranged damage and hit." },
      { stat: "AGI", note: "Secondary — ASPD." },
      { stat: "LUK", note: "Tertiary — crit." },
    ],
    statPoints: [
      { stat: "DEX", amount: "High" },
      { stat: "AGI", amount: "Medium" },
      { stat: "LUK", amount: "Rest" },
    ],
    skillOrder: [
      { stage: "core", skill: "Rebellion", note: "Single-shot burst." },
      { stage: "core", skill: "Tracking", note: "Mark target." },
      { stage: "early", skill: "Gatling Fever", note: "ASPD buff." },
      { stage: "mid", skill: "Desperado", note: "AoE volley." },
      { stage: "late", skill: "Flip the Coin", note: "High-risk burst." },
    ],
    skillProgression: {
      early: "Max Rebellion and Tracking.",
      mid: "Gatling Fever for ASPD; Desperado for AoE.",
      late: "Flip the Coin for high-risk burst.",
    },
    gear: [
      { stage: "Early", suggestion: "Revolver/rifle + DEX gear." },
      { stage: "Mid", suggestion: "ASPD and damage accessories." },
      { stage: "Late", suggestion: "MVP-ranged set with Gatling uptime." },
    ],
    playstyle:
      "Keep Gatling Fever rolling for sustained fire. Track the MVP for bonus damage. Mobile kiting playstyle.",
    builds: [
      { name: "Rebellion Gatling", summary: "DEX/AGI mobile DPS using Gatling Fever for uptime." },
    ],
  },
  {
    classId: "bard",
    levelingRoute:
      "Buff parties for MVP efficiency. Strong in groups; weaker solo but valuable for guild content.",
    statPriority: [
      { stat: "DEX", note: "Primary — buff power and hit." },
      { stat: "AGI", note: "Secondary — ASPD and flee." },
      { stat: "INT", note: "Tertiary — some utility." },
    ],
    statPoints: [
      { stat: "DEX", amount: "High" },
      { stat: "AGI", amount: "Medium" },
      { stat: "INT", amount: "Rest" },
    ],
    skillOrder: [
      { stage: "core", skill: "Battle Chant", note: "Group buff." },
      { stage: "early", skill: "Wand of String", note: "Trap." },
      { stage: "mid", skill: "Unchained Serenade", note: "Group control." },
      { stage: "late", skill: "Service for You", note: "Periodic buffs." },
    ],
    skillProgression: {
      early: "Wand of String; Battle Chant.",
      mid: "Unchained Serenade for group control.",
      late: "Service for You for periodic buffs.",
    },
    gear: [
      { stage: "Early", suggestion: "Instrument + DEX gear." },
      { stage: "Mid", suggestion: "Buff-duration and survivability." },
      { stage: "Late", suggestion: "Support group set." },
    ],
    playstyle:
      "Stay near the party and maintain songs. Bards buff physical, Dancers buff ranged — pick based on group comp.",
    builds: [{ name: "Buffer", summary: "DEX support keeping party songs and buffs active." }],
  },
  {
    classId: "druid",
    levelingRoute:
      "Thorn Whip + Summon Sprout for safe solo farming. New class — experiment with Wild Shape hybrid builds.",
    statPriority: [
      { stat: "INT", note: "Primary — summon/burst power." },
      { stat: "AGI", note: "Secondary — ASPD and mobility." },
      { stat: "VIT", note: "Tertiary — hybrid survivability." },
    ],
    statPoints: [
      { stat: "INT", amount: "High" },
      { stat: "AGI", amount: "Medium" },
      { stat: "VIT", amount: "Rest" },
    ],
    skillOrder: [
      { stage: "core", skill: "Thorn Whip", note: "Ranged nature strike." },
      { stage: "core", skill: "Summon Sprout", note: "Tank minion." },
      { stage: "mid", skill: "Wild Shape", note: "Beast form." },
      { stage: "mid", skill: "Entangle", note: "AoE root." },
      { stage: "late", skill: "Verdant Blessing", note: "Group sustain." },
    ],
    skillProgression: {
      early: "Max Thorn Whip and Summon Sprout.",
      mid: "Wild Shape and Entangle for control.",
      late: "Verdant Blessing for group sustain.",
    },
    gear: [
      { stage: "Early", suggestion: "INT/AGI gear, nature focus." },
      { stage: "Mid", suggestion: "Summon-damage and ASPD." },
      { stage: "Late", suggestion: "Hybrid MVP set (provisional — tune as meta settles)." },
    ],
    playstyle:
      "Hybrid controller. Summon a minion to tank, root with Entangle, then nuke. Wild Shape shifts you between ranged and beast melee.",
    builds: [{ name: "Summoner", summary: "INT hybrid using summons + control; meta still forming." }],
  },
];

export function getGuide(classId: string) {
  return guides.find((g) => g.classId === classId);
}
