import type { GameClass } from "./types";

export const classes: GameClass[] = [
  {
    id: "swordman",
    name: "Swordman",
    role: "Melee",
    tier: "A",
    blurb:
      "Frontline tanky bruiser. High HP and defense, excels at soaking MVP damage and leading parties.",
    baseStats: { STR: 5, AGI: 2, VIT: 5, INT: 1, DEX: 2, LUK: 1 },
    skills: [
      { name: "Bash", type: "Active", description: "Single-target melee strike with bonus damage.", priority: "core" },
      { name: "Magnum Break", type: "Active", description: "AoE fire attack that knocks back and lowers enemy defense.", priority: "early" },
      { name: "Provoke", type: "Buff", description: "Draws enemy aggro and reduces their defense.", priority: "core" },
      { name: "Endure", type: "Buff", description: "Temporary immunity to knockback and stun.", priority: "mid" },
      { name: "Cavest", type: "Passive", description: "Increases physical defense when HP is high.", priority: "late" },
    ],
  },
  {
    id: "mage",
    name: "Mage",
    role: "Magic",
    tier: "S",
    blurb:
      "Top-tier leveling and early MVP damage. Burst AoE nuker with strong elemental coverage.",
    baseStats: { STR: 1, AGI: 2, VIT: 2, INT: 5, DEX: 3, LUK: 1 },
    skills: [
      { name: "Fire Ball", type: "Active", description: "Long-range fire projectile, strong single-target burst.", priority: "core" },
      { name: "Soul Strike", type: "Active", description: "Hits multiple targets with shadow damage.", priority: "early" },
      { name: "Energy Coat", type: "Buff", description: "Converts HP to reduced damage taken at cost of HP.", priority: "mid" },
      { name: "Frost Diver", type: "Active", description: "AoE water attack that can freeze.", priority: "mid" },
      { name: "Safety Wall", type: "Buff", description: "Creates a wall that blocks enemy attacks.", priority: "late" },
    ],
  },
  {
    id: "archer",
    name: "Archer",
    role: "Ranged",
    tier: "A",
    blurb:
      "Consistent ranged DPS. Strong kiting and trapping; ADL build is a classic farmer.",
    baseStats: { STR: 2, AGI: 4, VIT: 2, INT: 1, DEX: 5, LUK: 2 },
    skills: [
      { name: "Double Strafe", type: "Active", description: "Fires two arrows for ranged physical damage.", priority: "core" },
      { name: "Arrow Shower", type: "Active", description: "AoE arrow rain over a target area.", priority: "early" },
      { name: "Ankle Snare", type: "Active", description: "Traps enemies in place.", priority: "mid" },
      { name: "Vulture's Eye", type: "Passive", description: "Increases ranged attack range and hit.", priority: "core" },
      { name: "Focused Arrow Strike", type: "Active", description: "High single-target damage charged shot.", priority: "late" },
    ],
  },
  {
    id: "acolyte",
    name: "Acolyte",
    role: "Support",
    tier: "B",
    blurb:
      "Healer and buffer. Essential for sustained MVP parties and survivability.",
    baseStats: { STR: 1, AGI: 2, VIT: 3, INT: 4, DEX: 2, LUK: 1 },
    skills: [
      { name: "Heal", type: "Active", description: "Restores HP to target ally.", priority: "core" },
      { name: "Blessing", type: "Buff", description: "Boosts STR, DEX, and INT of allies.", priority: "core" },
      { name: "Increase AGI", type: "Buff", description: "Raises movement and attack speed of allies.", priority: "early" },
      { name: "Holy Light", type: "Active", description: "Ranged holy damage; effective vs undead.", priority: "mid" },
      { name: "Resurrection", type: "Active", description: "Revives a fallen ally.", priority: "late" },
    ],
  },
  {
    id: "thief",
    name: "Thief",
    role: "Melee",
    tier: "A",
    blurb:
      "Crit and ASPD specialist. Assassin crit builds hit the 193 ASPD cap for extreme DPS.",
    baseStats: { STR: 3, AGI: 5, VIT: 2, INT: 1, DEX: 3, LUK: 4 },
    skills: [
      { name: "Double Attack", type: "Passive", description: "Chance to strike twice with melee attacks.", priority: "core" },
      { name: "Steal", type: "Active", description: "Attempts to steal items from enemies.", priority: "early" },
      { name: "Envenom", type: "Active", description: "Coats weapon with poison damage.", priority: "mid" },
      { name: "Hiding", type: "Buff", description: "Becomes invisible to enemies.", priority: "mid" },
      { name: "Sonic Blow", type: "Active", description: "Burst of rapid melee hits on a single target.", priority: "late" },
    ],
  },
  {
    id: "gunslinger",
    name: "Gunslinger",
    role: "Ranged",
    tier: "S",
    blurb:
      "S-tier leveling and early MVP. High sustained ranged DPS with AoE options.",
    baseStats: { STR: 2, AGI: 4, VIT: 2, INT: 2, DEX: 5, LUK: 3 },
    skills: [
      { name: "Gatling Fever", type: "Buff", description: "Greatly boosts ranged attack speed for a duration.", priority: "core" },
      { name: "Rebellion", type: "Active", description: "Powerful single-shot rifle attack.", priority: "core" },
      { name: "Tracking", type: "Buff", description: "Marks a target, increasing damage dealt to it.", priority: "early" },
      { name: "Desperado", type: "Active", description: "Rapid multi-shot pistol volley.", priority: "mid" },
      { name: "Flip the Coin", type: "Buff", description: "Random buff or debuff gamble for big upside.", priority: "late" },
    ],
  },
  {
    id: "bard",
    name: "Bard / Dancer",
    role: "Support",
    tier: "B",
    blurb:
      "Performance buffer. Bards buff physical parties, Dancers buff ranged; strong in groups.",
    baseStats: { STR: 1, AGI: 3, VIT: 2, INT: 3, DEX: 4, LUK: 2 },
    skills: [
      { name: "Wand of String", type: "Active", description: "Traps enemies with a sound string.", priority: "early" },
      { name: "Battle Chant", type: "Buff", description: "Group buff raising attack or defense.", priority: "core" },
      { name: "Unchained Serenade", type: "Buff", description: "Area buff reducing enemy capabilities.", priority: "mid" },
      { name: "Service for You", type: "Active", description: "Plays a song that periodically buffs allies.", priority: "late" },
    ],
  },
  {
    id: "druid",
    name: "Druid",
    role: "Hybrid",
    tier: "A",
    blurb:
      "New launch class. Shapeshifting hybrid that blends summoning, control, and sustain.",
    baseStats: { STR: 2, AGI: 3, VIT: 3, INT: 4, DEX: 3, LUK: 2 },
    skills: [
      { name: "Thorn Whip", type: "Active", description: "Ranged nature strike that roots lightly.", priority: "core" },
      { name: "Summon Sprout", type: "Active", description: "Summons a plant minion to fight alongside you.", priority: "core" },
      { name: "Wild Shape", type: "Buff", description: "Shapeshifts into a beast form, altering stats and skills.", priority: "mid" },
      { name: "Entangle", type: "Active", description: "AoE root that holds enemies in place.", priority: "mid" },
      { name: "Verdant Blessing", type: "Buff", description: "Group regen and elemental resist aura.", priority: "late" },
    ],
  },
];

export function getClass(id: string) {
  return classes.find((c) => c.id === id);
}
