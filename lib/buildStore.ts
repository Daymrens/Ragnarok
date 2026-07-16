import type { BuildState } from "./data/types";

export const BUILD_KEY = "ragnasys.builds";
export const ROSTER_KEY = "ragnasys.roster";
export const ROSTER_VERSION = 1;

export interface SavedBuild {
  id: string;
  name: string;
  classId: string;
  agi: number;
  dex: number;
  baseAspd: number;
}

/** A named stat/skill preset for one job on a character. */
export interface JobPreset {
  job: string; // classId
  name: string;
  state: BuildState;
}

/** One in-game character that can swap between jobs via Job Freedom. */
export interface RosterCharacter {
  id: string;
  name: string;
  presets: JobPreset[];
}

export interface RosterState {
  version: number;
  characters: RosterCharacter[];
}

export function emptyRoster(): RosterState {
  return { version: ROSTER_VERSION, characters: [] };
}

/**
 * Load the roster, migrating legacy single-build saves (ragnasys.builds) into a
 * single "Default Character" without data loss. Safe: any parse error returns
 * an empty roster rather than throwing.
 */
export function loadRoster(): RosterState {
  if (typeof window === "undefined") return emptyRoster();
  try {
    const raw = localStorage.getItem(ROSTER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as RosterState;
      if (parsed && Array.isArray(parsed.characters)) return parsed;
    }
    // Migration: legacy saved builds -> Default Character.
    const legacy = localStorage.getItem(BUILD_KEY);
    if (legacy) {
      const builds = JSON.parse(legacy) as SavedBuild[];
      if (Array.isArray(builds) && builds.length > 0) {
        const character: RosterCharacter = {
          id: `char-${Date.now()}`,
          name: "Default Character",
          presets: builds.map((b) => ({
            job: b.classId,
            name: b.name,
            state: {
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
            },
          })),
        };
        const migrated: RosterState = {
          version: ROSTER_VERSION,
          characters: [character],
        };
        localStorage.setItem(ROSTER_KEY, JSON.stringify(migrated));
        localStorage.removeItem(BUILD_KEY);
        return migrated;
      }
    }
  } catch {
    // ignore corrupt storage
  }
  return emptyRoster();
}

export function saveRoster(roster: RosterState) {
  localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
}
