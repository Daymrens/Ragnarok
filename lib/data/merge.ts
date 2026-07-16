// Merge helpers for scraper output.
//
// `npm run scrape` writes best-effort JSON to lib/data/generated/*.json. These
// helpers combine generated rows into the curated arrays WITHOUT overwriting
// hand-authored data — a generated row is only kept when no curated entry with
// the same id exists. Curated data in lib/data/*.ts remains the source of truth.
// The generated dir is optional; when absent, curated arrays pass through.

import type { Monster } from "./types";

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
