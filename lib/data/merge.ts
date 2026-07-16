// Merge helpers for generated data.
//
// `npm run scrape` and `npm run ingest-roworlddb` write best-effort JSON to
// lib/data/generated/*.json. These helpers combine generated rows into the
// curated arrays WITHOUT overwriting hand-authored data — a generated row is
// only kept when no curated entry with the same name exists. Curated data in
// lib/data/*.ts remains the source of truth. The generated dir is optional;
// when absent, curated arrays pass through.
//
// Loading is Node-only (fs) and runs during `next build`/SSG — never on the
// client. A generated row is only advisory; review before treating it as truth.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type {
  Monster,
  Gear,
  Card,
  GearSlot,
  CardSlot,
  Element,
  Race,
  Size,
} from "./types";

const GENERATED_DIR = new URL("./generated/", import.meta.url);

function loadGenerated<T>(file: string): T | null {
  try {
    const path = fileURLToPath(new URL(file, GENERATED_DIR));
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return null;
  }
}

function normName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

interface GeneratedMonster {
  name: string;
  region?: string;
  level?: string;
  element?: string;
}

export function mergeMonsters(
  curated: Monster[],
  generated: GeneratedMonster[] = []
): Monster[] {
  const existing = new Set(curated.map((m) => m.id));
  const extras: Monster[] = generated
    .filter((g) => g.name && !existing.has(slug(g.name)))
    .map((g) => ({
      id: slug(g.name),
      name: g.name,
      region: g.region ?? "Unknown",
      element: (g.element as Monster["element"]) ?? "Neutral",
      race: "Formless",
      size: "Small",
      level: Number(g.level) || 1,
      hp: 0,
      drops: [],
      estimate: true,
    }));
  return [...curated, ...extras];
}

// --- RoworldDB (npm run ingest-roworlddb) ----------------------------------

interface RwMonster {
  id: string;
  name: string;
  level: number;
  type: string;
  race: string;
  element: string;
  size: string;
  isHandbook: boolean;
  image: string;
  isMvp: boolean;
}

/** Append RoworldDB monsters not already present in the curated list. */
export function mergeRoworldMonsters(curated: Monster[]): Monster[] {
  const data = loadGenerated<{ monsters: RwMonster[] }>(
    "roworlddb_monsters.json"
  );
  if (!data?.monsters?.length) return curated;
  const have = new Set(curated.map((m) => normName(m.name)));
  const extras: Monster[] = data.monsters
    .filter((m) => m.name && !have.has(normName(m.name)))
    .map((m) => ({
      id: `rw_${m.id}`,
      name: m.name,
      region: "Unknown",
      element: (cap(m.element) as Element) ?? "Neutral",
      race: (cap(m.race) as Race) ?? "Formless",
      size: (cap(m.size) as Size) ?? "Small",
      level: m.level || 1,
      hp: 0,
      drops: [],
      isMvp: m.isMvp || undefined,
      estimate: true,
      image: m.image || undefined,
    }));
  return [...curated, ...extras];
}

interface RwGear {
  id: string;
  name: string;
  desc: string;
  itemType: number | string;
  openLevel: number;
  stats: { attr: string; value: number }[];
}

const GEAR_SLOT_BY_TYPE: Record<string, GearSlot> = {
  "201": "Weapon",
  "202": "Armor",
  "203": "Garment",
  "204": "Footgear",
  "205": "Shield",
  "206": "Headgear",
  "207": "Accessory",
};

/** Append RoworldDB gear not already present in the curated list. */
export function mergeRoworldGear(curated: Gear[]): Gear[] {
  const data = loadGenerated<{ items: RwGear[] }>(
    "roworlddb_equipment.json"
  );
  if (!data?.items?.length) return curated;
  const have = new Set(curated.map((g) => normName(g.name)));
  const extras: Gear[] = data.items
    .filter((g) => g.name && !have.has(normName(g.name)))
    .map((g) => ({
      id: `rw_${g.id}`,
      name: g.name,
      slot: GEAR_SLOT_BY_TYPE[String(g.itemType)] ?? "Accessory",
      stats: g.stats.map((s) => `${s.attr} +${s.value}`).join(", "),
      refineNote: "Safe refine to +15.",
    }));
  return [...curated, ...extras];
}

interface RwCard {
  id: string;
  name: string;
  slot: string;
  effect: string;
}

/** Append RoworldDB cards not already present in the curated list. */
export function mergeRoworldCards(curated: Card[]): Card[] {
  const data = loadGenerated<{ cards: RwCard[] }>("roworlddb_cards.json");
  if (!data?.cards?.length) return curated;
  const have = new Set(curated.map((c) => normName(c.name)));
  const extras: Card[] = data.cards
    .filter((c) => c.name && !have.has(normName(c.name)))
    .map((c) => ({
      id: `rw_${c.id}`,
      name: c.name,
      slot: (cap(c.slot) as CardSlot) ?? "Accessory",
      effect: c.effect,
      source: "",
    }));
  return [...curated, ...extras];
}

function cap(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
