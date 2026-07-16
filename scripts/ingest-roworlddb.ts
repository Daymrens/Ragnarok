import { writeFile, mkdir } from "node:fs/promises";

/**
 * CLI: npm run ingest-roworlddb
 *
 * Fetches best-effort reference data from RoworldDB (the fan DB for Ragnarok:
 * The New World / SEA) and writes normalized JSON to lib/data/generated/.
 *
 * RoworldDB serves locale-specific static JSON. The convention is
 *   /sea/<section>/data/<section>_en-US.json
 * with a couple of exceptions (cards, handbook). All data is fetched at
 * build-time here in Node — never client-side, never wired live.
 *
 * Curated hand-edited data in lib/data/*.ts remains the source of truth.
 * Review the generated output and merge manually before committing.
 */

const LOCALE = "en-US";
const BASE = "https://roworlddb.com/sea";

const SOURCES = {
  equipment: `${BASE}/equipment/data/equipment_${LOCALE}.json`,
  monsters: `${BASE}/monster-album/data/monster_album_${LOCALE}.json`,
  cards: `${BASE}/card-simulator/data/handbook_cards_${LOCALE}.json`,
  refine: `${BASE}/refine-simulator/data/refine_${LOCALE}.json`,
} as const;

type Json = Record<string, unknown>;

async function fetchJson(url: string): Promise<Json> {
  const res = await fetch(url, {
    headers: { "user-agent": "RagnaSys ingest (static reference tool)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return (await res.json()) as Json;
}

// --- Equipment -------------------------------------------------------------

interface RawItem {
  id: number | string;
  name: string;
  desc?: string;
  icon?: string;
  quality?: number | string;
  itemType?: number | string;
  itemSubtype?: number | string;
  openLevel?: number;
  jobAll?: number;
  jobLimits?: number[];
  stats?: [number, number][];
  buffs?: unknown[];
  fixedAffixes?: unknown[];
  refinePerLevel?: unknown[];
  suits?: unknown[];
}

function normalizeEquipment(raw: Json) {
  const items = (raw.items as RawItem[]) ?? [];
  const attributes = (raw.attributes as Json) ?? {};
  const attrName = (id: number) =>
    (attributes[String(id)] as Json | undefined)?.name ?? `attr_${id}`;

  const out = items.map((it) => ({
    id: String(it.id),
    name: it.name,
    desc: it.desc ?? "",
    icon: it.icon ?? "",
    quality: it.quality,
    itemType: it.itemType,
    itemSubtype: it.itemSubtype,
    openLevel: it.openLevel ?? 0,
    jobAll: it.jobAll ?? 0,
    jobLimits: it.jobLimits ?? [],
    stats: (it.stats ?? []).map(([attrId, value]) => ({
      attr: attrName(attrId),
      value,
    })),
    hasBuffs: (it.buffs?.length ?? 0) > 0,
    hasAffixes: (it.fixedAffixes?.length ?? 0) > 0,
    hasSuits: (it.suits?.length ?? 0) > 0,
  }));

  return {
    meta: {
      source: "RoworldDB",
      locale: LOCALE,
      fetchedAt: new Date().toISOString(),
      count: out.length,
      attributes: Object.keys(attributes).length,
    },
    items: out,
  };
}

// --- Monsters --------------------------------------------------------------

interface RawMonster {
  id: number | string;
  name: string;
  level?: number;
  type?: string;
  race?: string;
  element?: string | number;
  body?: string;
  stats?: Json;
  is_handbook?: number;
  image?: string;
  drop_rate_entries?: unknown[];
  mvp_drop_rate_entries?: unknown[];
}

function normalizeMonsters(raw: Json) {
  const monsters = (raw.monsters as RawMonster[]) ?? [];
  const out = monsters.map((m) => ({
    id: String(m.id),
    name: m.name,
    level: m.level ?? 0,
    type: m.type ?? "",
    race: m.race ?? "",
    element: String(m.element ?? "Neutral"),
    size: m.body ?? "",
    isHandbook: (m.is_handbook ?? 0) === 1,
    image: m.image ?? "",
    hasDrops: (m.drop_rate_entries?.length ?? 0) > 0,
    isMvp: (m.mvp_drop_rate_entries?.length ?? 0) > 0,
  }));

  return {
    meta: {
      source: "RoworldDB",
      locale: LOCALE,
      fetchedAt: new Date().toISOString(),
      count: out.length,
    },
    monsters: out,
  };
}

// --- Cards -----------------------------------------------------------------

interface RawCard {
  id: number | string;
  name: string;
  quality?: number | string;
  card_type_id?: number;
  card_type_name?: string;
  effect?: string;
  effect_extra?: string;
  mini_icon?: string;
  item_icon?: string;
  obtain_source_tables?: unknown[];
  has_mvp_source?: number;
}

function normalizeCards(raw: Json) {
  const cards = (raw.cards as RawCard[]) ?? [];
  const out = cards.map((c) => ({
    id: String(c.id),
    name: c.name,
    quality: c.quality,
    slot: c.card_type_name ?? "",
    slotId: c.card_type_id,
    effect: [c.effect, c.effect_extra].filter(Boolean).join(" "),
    miniIcon: c.mini_icon ?? "",
    itemIcon: c.item_icon ?? "",
    hasMvpSource: (c.has_mvp_source ?? 0) === 1,
  }));

  return {
    meta: {
      source: "RoworldDB",
      locale: LOCALE,
      fetchedAt: new Date().toISOString(),
      count: out.length,
    },
    cards: out,
  };
}

// --- Refine ----------------------------------------------------------------

function normalizeRefine(raw: Json) {
  return {
    meta: {
      source: "RoworldDB",
      locale: LOCALE,
      fetchedAt: new Date().toISOString(),
      maxLevel: raw.maxLevel,
      safeLevels: raw.safeLevels,
      refineType: raw.refineType,
    },
    raw,
  };
}

// --- Run -------------------------------------------------------------------

async function main() {
  const outDir = new URL("../lib/data/generated/", import.meta.url);
  await mkdir(outDir, { recursive: true });

  const jobs: [string, () => Promise<Json>, (raw: Json) => Json][] = [
    ["roworlddb_equipment", () => fetchJson(SOURCES.equipment), normalizeEquipment],
    ["roworlddb_monsters", () => fetchJson(SOURCES.monsters), normalizeMonsters],
    ["roworlddb_cards", () => fetchJson(SOURCES.cards), normalizeCards],
    ["roworlddb_refine", () => fetchJson(SOURCES.refine), normalizeRefine],
  ];

  for (const [name, loader, normalize] of jobs) {
    try {
      const raw = await loader();
      const data = normalize(raw);
      await writeFile(
        new URL(`${name}.json`, outDir),
        JSON.stringify(data, null, 2),
        "utf8"
      );
      const count =
        (data as Json).meta &&
        typeof (data as Json).meta === "object"
          ? ((data as Json).meta as Json).count
          : undefined;
      console.log(
        `Fetched ${name} -> lib/data/generated/${name}.json` +
          (count !== undefined ? ` (${count} rows)` : "")
      );
    } catch (e) {
      console.warn(`${name} ingest failed:`, (e as Error).message);
    }
  }

  console.log(
    "\nNote: generated files are best-effort. Merge into lib/data/*.ts manually" +
      " after review — curated data remains the source of truth."
  );
}

main();
