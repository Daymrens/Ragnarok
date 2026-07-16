"use client";

import { useMemo, useState } from "react";
import { loadBuilds, savedToState } from "@/lib/buildStore";
import { decodeBuild } from "@/lib/buildEncode";
import type { BuildState } from "@/lib/data/types";
import { BuildDiff } from "@/components/BuildDiff";
import { ListHeader, Card } from "@/components/ui";

export default function ComparePage() {
  const saved = useMemo(() => (typeof window !== "undefined" ? loadBuilds() : []), []);
  const [pickA, setPickA] = useState("");
  const [pickB, setPickB] = useState("");
  const [linkA, setLinkA] = useState("");
  const [linkB, setLinkB] = useState("");

  function resolve(pick: string, link: string): BuildState | null {
    if (link.trim()) {
      return decodeBuild(link.trim());
    }
    if (pick) {
      const b = saved.find((s) => s.id === pick);
      return b ? savedToState(b) : null;
    }
    return null;
  }

  const stateA = resolve(pickA, linkA);
  const stateB = resolve(pickB, linkB);

  return (
    <div className="space-y-6">
      <ListHeader
        title="Build Comparison"
        description="Compare two saved builds or paste two share links. Differences are highlighted."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-gold-soft mb-2">Build A</h2>
          <select
            value={pickA}
            onChange={(e) => setPickA(e.target.value)}
            className="input-field w-full rounded-md px-2 py-1.5 text-sm"
          >
            <option value="">— select a saved build —</option>
            {saved.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-foreground/50 my-1">or paste a share link:</p>
          <input
            value={linkA}
            onChange={(e) => setLinkA(e.target.value)}
            placeholder="?b=…"
            className="input-field w-full rounded-md px-2 py-1.5 text-sm"
          />
        </Card>

        <Card>
          <h2 className="font-semibold text-gold-soft mb-2">Build B</h2>
          <select
            value={pickB}
            onChange={(e) => setPickB(e.target.value)}
            className="input-field w-full rounded-md px-2 py-1.5 text-sm"
          >
            <option value="">— select a saved build —</option>
            {saved.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-foreground/50 my-1">or paste a share link:</p>
          <input
            value={linkB}
            onChange={(e) => setLinkB(e.target.value)}
            placeholder="?b=…"
            className="input-field w-full rounded-md px-2 py-1.5 text-sm"
          />
        </Card>
      </div>

      {stateA && stateB ? (
        <Card>
          <BuildDiff a={stateA} b={stateB} />
        </Card>
      ) : (
        <p className="text-sm text-foreground/50">
          Select or paste two builds above to see the diff.
        </p>
      )}
    </div>
  );
}
