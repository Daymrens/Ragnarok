"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Gear } from "@/lib/data/types";
import { Card, ListHeader, SourceBadge } from "@/components/ui";

const SLOTS = ["All", "Weapon", "Armor", "Garment", "Footgear", "Shield", "Headgear", "Accessory"];

export function GearList({ data }: { data: Gear[] }) {
  const [q, setQ] = useState("");
  const [slot, setSlot] = useState<string>("All");

  const filtered = useMemo(() => {
    return data.filter((g) => {
      if (slot !== "All" && g.slot !== slot) return false;
      if (q && !g.name.toLowerCase().includes(q.toLowerCase()) && !g.stats.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [q, slot, data]);

  return (
    <div className="space-y-6">
      <ListHeader
        title="Gear"
        description="Representative equipment. Safe refine to +15 on most pieces."
      />

      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search gear or stats..."
          className="input-field rounded-md px-3 py-1.5 text-sm flex-1 min-w-[180px]"
        />
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="input-field rounded-md px-2 py-1.5 text-sm"
        >
          {SLOTS.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All slots" : s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((g) => (
          <Link key={g.id} href={`/database/gear/${g.id}`} className="block">
            <Card className="hover:border-gold transition-colors h-full">
              <div className="flex items-center gap-3">
                {g.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={g.image}
                    alt={g.name}
                    className="h-12 w-12 rounded-md border border-gold-deep/30 bg-gradient-to-b from-ocean/60 to-panel object-contain shrink-0"
                    loading="lazy"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold text-gold-soft truncate">{g.name}</h2>
                    <span className="text-xs text-foreground/50 shrink-0">{g.slot}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground/75 mt-2">{g.stats}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                {g.refineNote ? (
                  <p className="text-xs text-foreground/50">{g.refineNote}</p>
                ) : (
                  <span />
                )}
                <SourceBadge id={g.id} />
              </div>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-foreground/50">No gear matches your filters.</p>
        )}
      </div>
    </div>
  );
}
