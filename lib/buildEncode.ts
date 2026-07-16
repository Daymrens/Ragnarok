import type { BuildState, GearSlot } from "./data/types";

export const BUILD_SCHEMA_VERSION = 1;

const SLOTS: GearSlot[] = [
  "Weapon",
  "Armor",
  "Garment",
  "Footgear",
  "Shield",
  "Headgear",
  "Accessory",
];

function toBase64Url(input: string): string {
  const b64 = btoa(unescape(encodeURIComponent(input)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "===".slice((b64.length + 3) % 4);
  return decodeURIComponent(escape(atob(padded)));
}

/** Compact, URL-safe encoding of a build for share links. */
export function encodeBuild(build: BuildState): string {
  const payload = { v: BUILD_SCHEMA_VERSION, b: build };
  return toBase64Url(JSON.stringify(payload));
}

/**
 * Decode a share-link string into a BuildState, or null if malformed/invalid.
 * Never throws — bad links are ignored by the caller.
 */
export function decodeBuild(str: string): BuildState | null {
  try {
    const json = fromBase64Url(str.trim());
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object" || !parsed.b) return null;
    return normalizeBuild(parsed.b);
  } catch {
    return null;
  }
}

/** Coerce an unknown object into a valid BuildState, dropping invalid fields. */
export function normalizeBuild(raw: unknown): BuildState | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  if (typeof b.classId !== "string") return null;

  const loadout: Record<string, string> = {};
  const rawLoadout = (b.loadout ?? {}) as Record<string, unknown>;
  for (const s of SLOTS) {
    const v = rawLoadout[s];
    loadout[s] = typeof v === "string" ? v : "";
  }

  const buffs = (b.buffs ?? {}) as Record<string, unknown>;

  return {
    name: typeof b.name === "string" ? b.name : "Shared Build",
    classId: b.classId,
    baseAspd: num(b.baseAspd, 14),
    agi: num(b.agi, 80),
    dex: num(b.dex, 60),
    vit: numOrUndef(b.vit),
    int: numOrUndef(b.int),
    str: numOrUndef(b.str),
    luk: numOrUndef(b.luk),
    buffs: {
      increaseAgi: !!buffs.increaseAgi,
      gatlingFever: !!buffs.gatlingFever,
      foodPotion: !!buffs.foodPotion,
    },
    refineTarget: num(b.refineTarget, 10),
    loadout,
    atk: numOrUndef(b.atk),
    element: (typeof b.element === "string" ? b.element : undefined) as
      | BuildState["element"]
      | undefined,
    targetElement: (typeof b.targetElement === "string" ? b.targetElement : undefined) as
      | BuildState["targetElement"]
      | undefined,
    targetDef: numOrUndef(b.targetDef),
  };
}

function num(v: unknown, fallback: number): number {
  return typeof v === "number" && isFinite(v) ? v : fallback;
}
function numOrUndef(v: unknown): number | undefined {
  return typeof v === "number" && isFinite(v) ? v : undefined;
}
