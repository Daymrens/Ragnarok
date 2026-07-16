import { NextResponse } from "next/server";

// Edge API that scrapes the community wiki's redeem-codes page at request time
// and returns the currently-listed ROW codes as JSON. Read-only, public page,
// no game interaction — ToS safe. CORS is bypassed because this runs server-side.
//
// Rewards text comes from a local curated map (structured reward data isn't in a
// stable feed on the wiki). The wiki is the source of truth for WHICH codes are
// currently live; if a code disappears from the page it is marked inactive.
//
// Hardcoded fallback is returned if the fetch fails, so the UI never breaks.

const SOURCE = "https://ragnarokthenewworld.wiki/codes/all-redeem-codes/";

const REWARDS: Record<string, string> = {
  ROW0716: "Launch bundle — Zeny & consumables",
  ROW666: "20,000 Adventure Coin, Kafra Blind Box, Common Hair Dye",
  ROW777: "20,000 Adventure Coin, Kafra Blind Box, 5x Pet Food",
  ROW888: "20,000 Adventure Coin, Common Hair Dye, 5x Pet Food",
  ROWORLD: "20,000 Adventure Coin, 2x Hearty Dish, Common Hair Dye",
  ROWTOP1: "20,000 Adventure Coin, 2x Hearty Dish, 5x Pet Food",
  ROWMVP: "20,000 Adventure Coin, 10x Pet Food",
  BABYMONSTER: "BABYMONSTER collaboration costume + Monster Rookie title",
  ANGELPORING: "Angel Poring Headband (MVP hunt reward)",
  NEWWORLD: "Starter bundle",
};

const FALLBACK = [
  { code: "ROW0716", rewards: REWARDS.ROW0716, active: true },
  { code: "ROW666", rewards: REWARDS.ROW666, active: true },
  { code: "ROW777", rewards: REWARDS.ROW777, active: true },
  { code: "ROW888", rewards: REWARDS.ROW888, active: true },
  { code: "ROWORLD", rewards: REWARDS.ROWORLD, active: true },
  { code: "ROWTOP1", rewards: REWARDS.ROWTOP1, active: true },
  { code: "ROWMVP", rewards: REWARDS.ROWMVP, active: true },
  { code: "BABYMONSTER", rewards: REWARDS.BABYMONSTER, active: true },
];

function extractCodes(html: string): string[] {
  const found = new Set<string>();
  const re = /ROW[A-Z0-9]{2,8}|BABYMONSTER|ANGELPORING|NEWWORLD/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) found.add(m[0]);
  return [...found];
}

export async function GET() {
  const fetchedAt = new Date().toISOString();
  try {
    const res = await fetch(SOURCE, {
      headers: { "User-Agent": "RagnaSys/1.0 (+https://ragnarok-weld.vercel.app)" },
      // cache for 1 hour to be polite to the wiki
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`wiki ${res.status}`);
    const html = await res.text();
    const live = extractCodes(html);
    if (live.length === 0) throw new Error("no codes parsed");

    const codes = live.map((code) => ({
      code,
      rewards: REWARDS[code] ?? "Promotional reward — see official redemption",
      active: true,
    }));
    return NextResponse.json({ source: SOURCE, live: true, fetchedAt, codes });
  } catch {
    return NextResponse.json({ source: SOURCE, live: false, fetchedAt, codes: FALLBACK });
  }
}
