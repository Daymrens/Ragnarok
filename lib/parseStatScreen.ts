// Parses OCR text from an in-game stat allocation screen into build stats.
// Label formats vary by client/localization, so we match several patterns and
// flag low-confidence fields rather than guessing.

export interface ParsedStats {
  STR: number | null;
  AGI: number | null;
  VIT: number | null;
  INT: number | null;
  DEX: number | null;
  LUK: number | null;
  pointsLeft: number | null;
  /** labels the parser could NOT confidently read */
  lowConfidence: string[];
}

const STAT_KEYS = ["STR", "AGI", "VIT", "INT", "DEX", "LUK"] as const;
type StatKey = (typeof STAT_KEYS)[number];

// Match "STR 95" or "STR: 95" or "STR 95/100" or "95 STR" (loose).
const STAT_RE: Record<StatKey, RegExp> = {
  STR: /\bSTR[:\s]*?(\d{1,4})/i,
  AGI: /\bAGI[:\s]*?(\d{1,4})/i,
  VIT: /\bVIT[:\s]*?(\d{1,4})/i,
  INT: /\bINT[:\s]*?(\d{1,4})/i,
  DEX: /\bDEX[:\s]*?(\d{1,4})/i,
  LUK: /\bLUK[:\s]*?(\d{1,4})/i,
};

const POINTS_RE = /(?:points?\s*left|unused|remaining|free\s*points?)[:\s]*?(\d{1,4})/i;

export function parseStatScreen(text: string): ParsedStats {
  const lowConfidence: string[] = [];
  const result: ParsedStats = {
    STR: null,
    AGI: null,
    VIT: null,
    INT: null,
    DEX: null,
    LUK: null,
    pointsLeft: null,
    lowConfidence,
  };

  for (const key of STAT_KEYS) {
    const m = text.match(STAT_RE[key]);
    if (m) {
      const n = Number(m[1]);
      // Sanity bound: stat allocation rarely exceeds 999.
      if (n >= 1 && n <= 999) result[key] = n;
      else lowConfidence.push(key);
    } else {
      lowConfidence.push(key);
    }
  }

  const pm = text.match(POINTS_RE);
  if (pm) {
    const n = Number(pm[1]);
    if (n >= 0 && n <= 999) result.pointsLeft = n;
  }

  return result;
}

/** True when at least the 6 core stats were all confidently read. */
export function isHighConfidence(p: ParsedStats): boolean {
  return STAT_KEYS.every((k) => p[k] !== null);
}
