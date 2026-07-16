"use client";

import { useMemo, useState } from "react";
import { gear } from "@/lib/data/gear";
import { Card, ListHeader } from "@/components/ui";

const SLOTS = ["All", "Weapon", "Armor", "Garment", "Footgear", "Shield", "Headgear", "Accessory"];

export function GearList() {
  const [q, setQ] = useState("");
  const [slot, setSlot] = useState("All");

  const filtered = useMemo(() => {
    return gear.filter((g) => {
      if (slot !== "All" && g.slot !== slot) return false;
      if (q && !g.name.toLowerCase().includes(q.toLowerCase()) && !g.stats.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [q, slot]);

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
          <Card key={g.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gold-soft">{g.name}</h2>
              <span className="text-xs text-foreground/50">{g.slot}</span>
            </div>
            <p className="text-sm text-foreground/75 mt-2">{g.stats}</p>
            {g.refineNote && (
              <p className="text-xs text-foreground/50 mt-1">{g.refineNote}</p>
            )}
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-foreground/50">No gear matches your filters.</p>
        )}
      </div>
    </div>
  );
}
