"use client";

import { useMemo, useState } from "react";
import { chests, chestRegions } from "@/lib/data/chests";
import { Card } from "@/components/ui";

const FOUND_KEY = "ragnasys.chests.found";
const TYPE_LABEL: Record<string, string> = {
  chest: "Chest",
  "treasure-map": "Treasure Map",
  viewpoint: "Viewpoint",
};

export function ChestMap() {
  const [found, setFound] = useState<Record<string, boolean>>(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(FOUND_KEY) || "{}")
      : {}
  );
  const [region, setRegion] = useState<string>("all");

  function toggle(id: string) {
    const next = { ...found, [id]: !found[id] };
    setFound(next);
    localStorage.setItem(FOUND_KEY, JSON.stringify(next));
  }

  const regions = chestRegions();
  const filtered = useMemo(
    () => (region === "all" ? chests : chests.filter((c) => c.region === region)),
    [region]
  );
  const foundCount = chests.filter((c) => found[c.id]).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Chest & Exploration Map</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Track hidden chests, treasure maps, and viewpoints. {foundCount}/{chests.length} found.
          Exact coordinates are community-sourced — verify in-game.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setRegion("all")}
          className={`px-3 py-1.5 rounded-md text-sm ${
            region === "all" ? "bg-gold text-midnight font-semibold" : "bg-panel-2 text-foreground/80"
          }`}
        >
          All ({chests.length})
        </button>
        {regions.map((r) => {
          const n = chests.filter((c) => c.region === r).length;
          return (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-md text-sm ${
                region === r ? "bg-gold text-midnight font-semibold" : "bg-panel-2 text-foreground/80"
              }`}
            >
              {r} ({n})
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const isFound = !!found[c.id];
          return (
            <Card key={c.id} className={isFound ? "opacity-60" : ""}>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gold-soft">{c.name}</h2>
                <span className="text-xs text-foreground/50">{TYPE_LABEL[c.type]}</span>
              </div>
              <p className="text-xs text-foreground/60 mt-1">{c.region}</p>
              <p className="text-sm text-foreground/75 mt-2">{c.hint}</p>
              {c.tbd && (
                <p className="text-xs text-crimson/80 mt-1">Location TBD — community sourced.</p>
              )}
              <button
                onClick={() => toggle(c.id)}
                className={`mt-3 w-full text-xs px-3 py-1.5 rounded-md ${
                  isFound
                    ? "bg-panel-2 text-foreground/70"
                    : "bg-gold text-midnight font-semibold hover:bg-gold-soft"
                }`}
              >
                {isFound ? "Mark not found" : "Mark found"}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
