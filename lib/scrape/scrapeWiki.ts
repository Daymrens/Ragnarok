import * as cheerio from "cheerio";

export const WIKI_BASE = "https://ragnarokthenewworld.wiki";

export interface ScrapedCode {
  code: string;
  rewards: string;
  expires?: string;
  active: boolean;
}

export interface ScrapedMvp {
  name: string;
  map?: string;
  respawn?: string;
  element?: string;
  drops?: string;
}

const FETCH_OPTS: RequestInit = {
  headers: {
    "User-Agent":
      "RagnaSys/0.1 (+https://github.com/ local fan tool scraper; polite, 1 req/s)",
  },
};

export async function fetchHtml(path: string): Promise<string> {
  const res = await fetch(`${WIKI_BASE}${path}`, FETCH_OPTS);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.text();
}

/** Best-effort parse of the redeem codes page. Returns normalized codes. */
export async function scrapeCodes(): Promise<ScrapedCode[]> {
  const html = await fetchHtml("/");
  const $ = cheerio.load(html);
  const out: ScrapedCode[] = [];
  // Codes are typically shown in monospace blocks / table cells.
  $("code, .code, table td").each((_, el) => {
    const text = $(el).text().trim();
    const m = text.match(/\b(ROW[A-Z0-9]{3,}|BABYMONSTER|[A-Z]{4,})\b/);
    if (m) {
      out.push({ code: m[1], rewards: text, active: true });
    }
  });
  // de-dupe by code
  const seen = new Set<string>();
  return out.filter((c) => (seen.has(c.code) ? false : (seen.add(c.code), true)));
}

/** Best-effort parse of the MVP hunting page. */
export async function scrapeMvps(): Promise<ScrapedMvp[]> {
  const html = await fetchHtml("/world/mvp-hunting/");
  const $ = cheerio.load(html);
  const out: ScrapedMvp[] = [];
  $("table tr").each((_, row) => {
    const cells = $(row)
      .find("td")
      .map((_, c) => $(c).text().trim())
      .get();
    if (cells.length >= 2) {
      out.push({ name: cells[0], map: cells[1], respawn: cells[2] });
    }
  });
  return out;
}

export interface ScrapedMonster {
  name: string;
  region?: string;
  element?: string;
  level?: string;
  drops?: string;
}

/** Best-effort parse of the bestiary / monster pages. */
export async function scrapeMonsters(): Promise<ScrapedMonster[]> {
  const html = await fetchHtml("/database/monsters/");
  const $ = cheerio.load(html);
  const out: ScrapedMonster[] = [];
  $("table tr").each((_, row) => {
    const cells = $(row)
      .find("td")
      .map((_, c) => $(c).text().trim())
      .get();
    if (cells.length >= 2) {
      out.push({ name: cells[0], region: cells[1], level: cells[2], element: cells[3] });
    }
  });
  return out;
}

export interface ScrapedEvent {
  name: string;
  rewards?: string;
  end?: string;
}

/** Best-effort parse of the events / launch page. */
export async function scrapeEvents(): Promise<ScrapedEvent[]> {
  const html = await fetchHtml("/");
  const $ = cheerio.load(html);
  const out: ScrapedEvent[] = [];
  $("table tr").each((_, row) => {
    const cells = $(row)
      .find("td")
      .map((_, c) => $(c).text().trim())
      .get();
    if (cells.length >= 2) {
      out.push({ name: cells[0], rewards: cells[1], end: cells[2] });
    }
  });
  return out;
}
