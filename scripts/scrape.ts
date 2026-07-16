import { writeFile, mkdir } from "node:fs/promises";
import {
  scrapeCodes,
  scrapeMvps,
  scrapeMonsters,
  scrapeEvents,
} from "../lib/scrape/scrapeWiki";

/**
 * CLI: npm run scrape
 * Refreshes best-effort data from the community wiki and writes it to
 * lib/data/generated/. Curated hand-edited data in lib/data/*.ts remains the
 * source of truth — review the generated output before merging.
 */
async function main() {
  const outDir = new URL("../lib/data/generated/", import.meta.url);
  await mkdir(outDir, { recursive: true });

  async function dump(name: string, promise: Promise<unknown>) {
    try {
      const data = await promise;
      const arr = data as unknown[];
      await writeFile(
        new URL(`${name}.json`, outDir),
        JSON.stringify(data, null, 2),
        "utf8"
      );
      console.log(`Scraped ${arr.length} rows -> lib/data/generated/${name}.json`);
    } catch (e) {
      console.warn(`${name} scrape failed:`, (e as Error).message);
    }
  }

  await dump("codes", scrapeCodes());
  await dump("mvps", scrapeMvps());
  await dump("monsters", scrapeMonsters());
  await dump("events", scrapeEvents());

  console.log(
    "\nNote: generated files are best-effort. Use mergeMonsters(curated, generated) from" +
      " lib/data/merge.ts to append non-duplicate rows, then review before committing."
  );
}

main();
