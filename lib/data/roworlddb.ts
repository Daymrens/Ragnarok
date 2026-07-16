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

/** Curated monsters + non-duplicate RoworldDB monsters (flagged estimate). */
export function getMergedMonsters(): Monster[] {
  const data = loadGenerated<{ monsters: RwMonster[] }>(
    "roworlddb_monsters.json"
  );
  if (!data?.monsters?.length) return curatedMonsters;
  const have = new Set(curatedMonsters.map((m) => normName(m.name)));
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
  return [...curatedMonsters, ...extras];
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

/** Curated gear + non-duplicate RoworldDB equipment (flagged estimate). */
export function getMergedGear(): Gear[] {
  const data = loadGenerated<{ items: RwGear[] }>("roworlddb_equipment.json");
  if (!data?.items?.length) return curatedGear;
  const have = new Set(curatedGear.map((g) => normName(g.name)));
  const extras: Gear[] = data.items
    .filter((g) => g.name && !have.has(normName(g.name)))
    .map((g) => ({
      id: `rw_${g.id}`,
      name: g.name,
      slot: GEAR_SLOT_BY_TYPE[String(g.itemType)] ?? "Accessory",
      stats: g.stats.map((s) => `${s.attr} +${s.value}`).join(", "),
      refineNote: "Safe refine to +15.",
      image: g.image || undefined,
    }));
  return [...curatedGear, ...extras];
}

/** Curated cards + non-duplicate RoworldDB cards. */
export function getMergedCards(): Card[] {
  const data = loadGenerated<{ cards: RwCard[] }>("roworlddb_cards.json");
  if (!data?.cards?.length) return curatedCards;
  const have = new Set(curatedCards.map((c) => normName(c.name)));
  const extras: Card[] = data.cards
    .filter((c) => c.name && !have.has(normName(c.name)))
    .map((c) => ({
      id: `rw_${c.id}`,
      name: c.name,
      slot: (cap(c.slot) as CardSlot) ?? "Accessory",
      effect: c.effect,
      source: "",
    }));
  return [...curatedCards, ...extras];
}
