import type { GameEvent } from "./types";

// Launch-window events (SEA launch July 16, 2026). Dates seeded from launch coverage.
export const events: GameEvent[] = [
  { id: "grand_launch", name: "Grand Launch Week", start: "2026-07-16", end: "2026-07-23", rewards: "Launch bundles, boost items, milestone gifts", type: "launch" },
  { id: "aug16_login", name: "August 16 Login — BABYMONSTER Costume", start: "2026-07-16", end: "2026-08-16", rewards: "BABYMONSTER collaboration costume + Monster Rookie title", type: "login" },
  { id: "angel_poring", name: "Angel Poring Headband (MVP Hunt)", start: "2026-07-16", end: "2026-08-16", rewards: "Angel Poring Headband from MVP participation", type: "mvp" },
  { id: "babymonster", name: "BABYMONSTER Collaboration", start: "2026-07-16", end: "2026-08-16", rewards: "Collab costume + community events", type: "collab" },
  { id: "refine_resonance", name: "Refinement Resonance L2", start: "2026-07-16", end: "2026-09-01", rewards: "Push Refinement Resonance Level 2 on every slot", type: "season" },
];

export function getActiveEvents(now = Date.now()): GameEvent[] {
  const t = now;
  return events
    .filter((e) => new Date(e.end).getTime() >= t)
    .sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());
}
