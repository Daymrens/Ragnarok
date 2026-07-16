"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { monsters } from "@/lib/data/monsters";
import { cards } from "@/lib/data/cards";
import { gear } from "@/lib/data/gear";
import { classes } from "@/lib/data/classes";
import { pets } from "@/lib/data/pets";
import { getActiveCodes } from "@/lib/data/codes";

interface Result {
  label: string;
  sub: string;
  href: string;
}

export function GlobalSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const results = useMemo<Result[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const out: Result[] = [];
    for (const m of monsters)
      if (m.name.toLowerCase().includes(term) || m.region.toLowerCase().includes(term))
        out.push({ label: m.name, sub: `Monster · ${m.region}`, href: `/database/monsters/${m.id}` });
    for (const c of cards)
      if (c.name.toLowerCase().includes(term) || c.source.toLowerCase().includes(term))
        out.push({ label: c.name, sub: `Card · ${c.slot}`, href: `/database/cards` });
    for (const g of gear)
      if (g.name.toLowerCase().includes(term) || g.stats.toLowerCase().includes(term))
        out.push({ label: g.name, sub: `Gear · ${g.slot}`, href: `/database/gear` });
    for (const c of classes)
      if (c.name.toLowerCase().includes(term) || c.role.toLowerCase().includes(term))
        out.push({ label: c.name, sub: `Class · ${c.role}`, href: `/guide/${c.id}` });
    for (const p of pets)
      if (p.name.toLowerCase().includes(term) || p.source.toLowerCase().includes(term))
        out.push({ label: p.name, sub: `Pet/Mount · ${p.type}`, href: `/database/pets` });
    for (const code of getActiveCodes())
      if (code.code.toLowerCase().includes(term) || code.rewards.toLowerCase().includes(term))
        out.push({ label: code.code, sub: `Code · ${code.rewards}`, href: `/database/codes` });
    return out.slice(0, 12);
  }, [q]);

  function go(href: string) {
    setQ("");
    router.push(href);
  }

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        className="rounded-md bg-panel-2 border border-panel-2 px-2 py-1.5 text-sm w-32 focus:w-48 transition-all"
      />
      {results.length > 0 && (
        <ul className="surface absolute right-0 mt-1 z-50 w-72 rounded-lg p-1 max-h-80 overflow-auto">
          {results.map((r, i) => (
            <li key={`${r.href}-${i}`}>
              <button
                onClick={() => go(r.href)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-ocean/70"
              >
                <span className="block text-sm text-foreground/90">{r.label}</span>
                <span className="block text-xs text-foreground/50">{r.sub}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
