import type { BuildState } from "./data/types";

export const BUILD_KEY = "ragnasys.builds";

export interface SavedBuild {
  id: string;
  name: string;
  classId: string;
  agi: number;
  dex: number;
  baseAspd: number;
}

export function loadBuilds(): SavedBuild[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BUILD_KEY);
    return raw ? (JSON.parse(raw) as SavedBuild[]) : [];
  } catch {
    return [];
  }
}

/** Convert a saved build into a full BuildState for comparison/diff. */
export function savedToState(b: SavedBuild): BuildState {
  return {
    name: b.name,
    classId: b.classId,
    baseAspd: b.baseAspd,
    agi: b.agi,
    dex: b.dex,
    vit: 0,
    int: 0,
    str: 0,
    luk: 0,
    buffs: { increaseAgi: false, gatlingFever: false, foodPotion: false },
    refineTarget: 0,
    loadout: {},
  };
}
