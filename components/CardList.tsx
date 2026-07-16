"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Card as CardRow } from "@/lib/data/types";
import { Card, ListHeader, SourceBadge } from "@/components/ui";

const SLOTS = ["All", "Weapon", "Armor", "Garment", "Footgear", "Shield", "Headgear", "Accessory"];

export function CardList({ data }: { data: CardRow[] }) {
  const [q, setQ] = useState("");
  const [slot, setSlot] = useState<string>("All");

  const filtered = useMemo(() => {
    return data.filter((c) => {
      if (slot !== "All" && c.slot !== slot) return false;
      if (q && !c.name.toLowerCase().includes(q.toLowerCase()) && !c.effect.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [q, slot, data]);

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
          <Link key={c.id} href={`/database/cards/${c.id}`} className="block">
            <Card className="hover:border-gold transition-colors h-full">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold text-gold-soft truncate">{c.name}</h2>
                <span className="text-xs text-foreground/50 shrink-0">{c.slot}</span>
              </div>
              <p className="text-sm text-foreground/75 mt-2">{c.effect}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                {c.source ? (
                  <p className="text-xs text-foreground/50">Source: {c.source}</p>
                ) : (
                  <span />
                )}
                <SourceBadge id={c.id} />
              </div>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-foreground/50">No cards match your filters.</p>
        )}
      </div>
    </div>
  );
}
