"use client";

import { useMemo, useState } from "react";
import { pets } from "@/lib/data/pets";
import { Card } from "@/components/ui";

const TYPES = ["all", "Pet", "Mount"] as const;

export function PetList() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("all");

  const filtered = useMemo(() => {
    return pets.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.source.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [q, type]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Pets & Mounts</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Tames, MVP mounts, and their passive bonuses. Methods are estimates until verified.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or source..."
          className="rounded-md bg-panel-2 border border-panel-2 px-3 py-1.5 text-sm flex-1 min-w-[180px]"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as (typeof TYPES)[number])}
          className="rounded-md bg-panel-2 border border-panel-2 px-2 py-1.5 text-sm"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t + "s"}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Card key={p.id} className="h-full">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-gold-soft">{p.name}</h2>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  p.type === "Mount" ? "bg-crimson/15 text-crimson" : "bg-sage/15 text-sage"
                }`}
              >
                {p.type}
              </span>
            </div>
            <p className="text-xs text-foreground/60 mt-1">
              From {p.source} · {p.capture}
            </p>
            <p className="text-sm text-foreground/80 mt-2">{p.bonus}</p>
            {p.estimate && <p className="text-xs text-crimson/80 mt-1">est. data</p>}
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-foreground/50">No pets match your filters.</p>
        )}
      </div>
    </div>
  );
}
