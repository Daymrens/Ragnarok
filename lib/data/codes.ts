import type { RedeemCode } from "./types";

// Launch codes tracked by the community wiki. Verify in-game before relying on them.
export const redeemCodes: RedeemCode[] = [
  { code: "ROW0716", rewards: "Launch bundle — Zeny & consumables", expires: "2026-08-16", active: true },
  { code: "ROW666", rewards: "Zeny & boost items", active: true },
  { code: "ROW777", rewards: "Zeny & boost items", active: true },
  { code: "BABYMONSTER", rewards: "BABYMONSTER collaboration costume", expires: "2026-08-16", active: true },
  { code: "ANGELPORING", rewards: "Angel Poring Headband (MVP hunt reward)", active: false },
  { code: "NEWWORLD", rewards: "Starter bundle", expires: "2026-08-16", active: true },
];

export function getActiveCodes() {
  return redeemCodes.filter((c) => c.active);
}
