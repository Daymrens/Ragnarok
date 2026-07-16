// Server-only accessors for RoworldDB-augmented reference data.
//
// `npm run ingest-roworlddb` writes normalized JSON to lib/data/generated/*.json.
// These helpers merge that best-effort data into the curated arrays WITHOUT
// overwriting hand-authored rows — a generated row is kept only when no curated
// entry with the same name exists. Curated data in lib/data/*.ts is authoritative.
//
// This module uses node:fs and is therefore server-only. It is imported by
// server components / pages, never by client components.

import "server-only";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { monsters as curatedMonsters } from "./monsters";
import { gear as curatedGear } from "./gear";
import { cards as curatedCards } from "./cards";
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

function loadGenerated<T>(file: string): T | null {
  try {
    const full = path.join(process.cwd(), "lib", "data", "generated", file);
    if (!existsSync(full)) return null;
    return JSON.parse(readFileSync(full, "utf8")) as T;
  } catch {
    return null;
  }
}

function normName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function cap(s: unknown): string {
  const str = String(s ?? "");
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

interface RwMonster {
  id: string;
  name: string;
  level: number;
  race: string;
  element: string;
  size: string;
  isMvp: boolean;
  image: string;
}

interface RwGear {
  id: string;
  name: string;
  itemType: number | string;
  image: string;
  stats: { attr: string; value: number }[];
}

interface RwCard {
  id: string;
  name: string;
  slot: string;
  effect: string;
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

/** Curated monsters enriched with RoworldDB images/data + non-duplicate extras. */
export function getMergedMonsters(): Monster[] {
  const data = loadGenerated<{ monsters: RwMonster[] }>(
    "roworlddb_monsters.json"
  );
  if (!data?.monsters?.length) return curatedMonsters;

  const byName = new Map<string, RwMonster>();
  for (const m of data.monsters) {
    if (m.name) byName.set(normName(m.name), m);
  }

  const enriched: Monster[] = curatedMonsters.map((c) => {
    const rw = byName.get(normName(c.name));
    if (!rw) return c;
    return {
      ...c,
      // prefer RoworldDB image; keep curated fields unless they are placeholders
      image: rw.image || c.image,
      level: c.level > 0 ? c.level : rw.level || c.level,
      element: c.element === "Neutral" && rw.element ? (cap(rw.element) as Element) : c.element,
      race: c.race === "Formless" && rw.race ? (cap(rw.race) as Race) : c.race,
      size: c.size === "Small" && rw.size ? (cap(rw.size) as Size) : c.size,
    };
  });

  const have = new Set(curatedMonsters.map((m) => normName(m.name)));
  const seen = new Set<string>();
  const extras: Monster[] = [];
  for (const m of data.monsters) {
    const key = normName(m.name);
    if (!m.name || have.has(key) || seen.has(key)) continue;
    seen.add(key);
    extras.push({
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
    });
  }
  return [...enriched, ...extras];
}

/** Look up a single monster by id across curated + RoworldDB data. */
export function getMergedMonster(id: string): Monster | undefined {
  return getMergedMonsters().find((m) => m.id === id);
}

/** Look up a single gear piece by id across curated + RoworldDB data. */
export function getMergedGearItem(id: string): Gear | undefined {
  return getMergedGear().find((g) => g.id === id);
}

/** Look up a single card by id across curated + RoworldDB data. */
export function getMergedCard(id: string): Card | undefined {
  return getMergedCards().find((c) => c.id === id);
}

/** Curated gear enriched with RoworldDB images + non-duplicate equipment. */
export function getMergedGear(): Gear[] {
  const data = loadGenerated<{ items: RwGear[] }>("roworlddb_equipment.json");
  if (!data?.items?.length) return curatedGear;

  const byName = new Map<string, RwGear>();
  for (const g of data.items) {
    if (g.name) byName.set(normName(g.name), g);
  }

  const enriched: Gear[] = curatedGear.map((c) => {
    const rw = byName.get(normName(c.name));
    return rw?.image ? { ...c, image: rw.image } : c;
  });

  const have = new Set(curatedGear.map((g) => normName(g.name)));
  const seen = new Set<string>();
  const extras: Gear[] = [];
  for (const g of data.items) {
    const key = normName(g.name);
    if (!g.name || have.has(key) || seen.has(key)) continue;
    seen.add(key);
    extras.push({
      id: `rw_${g.id}`,
      name: g.name,
      slot: GEAR_SLOT_BY_TYPE[String(g.itemType)] ?? "Accessory",
      stats: g.stats.map((s) => `${s.attr} +${s.value}`).join(", "),
      refineNote: "Safe refine to +15.",
      image: g.image || undefined,
    });
  }
  return [...enriched, ...extras];
}

/** Curated cards + non-duplicate RoworldDB cards. */
export function getMergedCards(): Card[] {
  const data = loadGenerated<{ cards: RwCard[] }>("roworlddb_cards.json");
  if (!data?.cards?.length) return curatedCards;
  const have = new Set(curatedCards.map((c) => normName(c.name)));
  const seen = new Set<string>();
  const extras: Card[] = [];
  for (const c of data.cards) {
    const key = normName(c.name);
    if (!c.name || have.has(key) || seen.has(key)) continue;
    seen.add(key);
    extras.push({
      id: `rw_${c.id}`,
      name: c.name,
      slot: (cap(c.slot) as CardSlot) ?? "Accessory",
      effect: c.effect,
      source: "",
    });
  }
  return [...curatedCards, ...extras];
}
