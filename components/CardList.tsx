"use client";

import { useMemo, useState } from "react";
import { cards } from "@/lib/data/cards";
import { Card, ListHeader } from "@/components/ui";

const SLOTS = ["All", "Weapon", "Armor", "Garment", "Footgear", "Shield", "Headgear", "Accessory"];

export function CardList() {
  const [q, setQ] = useState("");
  const [slot, setSlot] = useState("All");

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (slot !== "All" && c.slot !== slot) return false;
      if (q && !c.name.toLowerCase().includes(q.toLowerCase()) && !c.effect.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [q, slot]);

  return (
    <div className="space-y-6">
      <ListHeader
        title="Cards"
        description="Equipment cards and their effects. Source links to the monster that drops them."
      />

      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search card or effect..."
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
        {filtered.map((c) => (
          <Card key={c.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gold-soft">{c.name}</h2>
              <span className="text-xs text-foreground/50">{c.slot}</span>
            </div>
            <p className="text-sm text-foreground/75 mt-2">{c.effect}</p>
            <p className="text-xs text-foreground/50 mt-1">Source: {c.source}</p>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-foreground/50">No cards match your filters.</p>
        )}
      </div>
    </div>
  );
}
