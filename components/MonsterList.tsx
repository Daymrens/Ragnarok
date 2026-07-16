"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { monsters } from "@/lib/data/monsters";
import { ELEMENTS } from "@/lib/data/elements";
import { Card, ElementBadge } from "@/components/ui";
import { MonsterPortrait } from "@/components/MonsterPortrait";

export function MonsterList() {
  const [q, setQ] = useState("");
  const [el, setEl] = useState<string>("all");
  const [mvpOnly, setMvpOnly] = useState(false);

  const filtered = useMemo(() => {
    return monsters.filter((m) => {
      if (mvpOnly && !m.isMvp) return false;
      if (el !== "all" && m.element !== el) return false;
      if (q && !m.name.toLowerCase().includes(q.toLowerCase()) && !m.region.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [q, el, mvpOnly]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Monster Bestiary</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Field mobs and MVPs with element, race, and drops. HP/levels are estimates until verified.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or region..."
          className="rounded-md bg-panel-2 border border-panel-2 px-3 py-1.5 text-sm flex-1 min-w-[180px]"
        />
        <select
          value={el}
          onChange={(e) => setEl(e.target.value)}
          className="rounded-md bg-panel-2 border border-panel-2 px-2 py-1.5 text-sm"
        >
          <option value="all">All elements</option>
          {ELEMENTS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={mvpOnly}
            onChange={(e) => setMvpOnly(e.target.checked)}
            className="accent-gold"
          />
          MVPs only
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Link key={m.id} href={`/database/monsters/${m.id}`}>
            <Card className="hover:border-gold transition-colors h-full">
              <div className="flex gap-3">
                <MonsterPortrait
                  name={m.name}
                  element={m.element}
                  race={m.race}
                  image={m.image}
                  size={56}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold text-gold-soft truncate">
                      {m.name} {m.isMvp && <span className="text-crimson text-xs">MVP</span>}
                    </h2>
                    <ElementBadge element={m.element} />
                  </div>
                  <p className="text-xs text-foreground/60 mt-1">
                    Lv {m.level} · {m.race} · {m.size} · {m.region}
                  </p>
                  {m.estimate && <p className="text-xs text-crimson/80 mt-1">est. data</p>}
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-foreground/50">No monsters match your filters.</p>
        )}
      </div>
    </div>
  );
}
