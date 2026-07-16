"use client";

import { useState } from "react";
import { ELEMENTS, elementMultiplier, multiplierLabel } from "@/lib/data/elements";
import { ListHeader } from "@/components/ui";

function cellColor(m: number): string {
  if (m >= 1.75) return "bg-crimson/80 text-white";
  if (m >= 1.25) return "bg-gold/70 text-midnight";
  if (m > 1) return "bg-gold/30 text-gold-soft";
  if (m === 1) return "bg-panel-2 text-foreground/60";
  if (m <= 0.5) return "bg-sky/40 text-sky";
  return "bg-sage/30 text-sage";
}

export function StrategyPage() {
  const [atk, setAtk] = useState<(typeof ELEMENTS)[number]>("Fire");
  const [def, setDef] = useState<(typeof ELEMENTS)[number] | null>(null);

  return (
    <div className="space-y-6">
      <ListHeader
        title="Strategy & Combat"
        description="Elemental matchups, card combos, and PvP/Guild War notes."
      />

      <section className="rounded-xl border border-panel-2 bg-panel p-4">
        <h2 className="font-semibold text-gold-soft mb-1">Elemental Matchup Chart</h2>
        <p className="text-xs text-foreground/60 mb-3">
          Pick an attacking element to highlight. Click a defender cell to inspect it.
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {ELEMENTS.map((e) => (
            <button
              key={e}
              onClick={() => setAtk(e)}
              className={`px-2 py-1 rounded-md text-xs ${
                atk === e ? "bg-gold text-midnight font-semibold" : "bg-panel-2 text-foreground/80"
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse text-xs">
            <thead>
              <tr>
                <th className="p-1 text-left text-foreground/60">Atk \ Def</th>
                {ELEMENTS.map((d) => (
                  <th
                    key={d}
                    className={`p-1 text-center cursor-pointer ${
                      def === d ? "text-gold" : "text-foreground/70"
                    }`}
                    onClick={() => setDef(def === d ? null : d)}
                  >
                    {d.slice(0, 4)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-1 text-left text-gold-soft">{atk}</th>
                {ELEMENTS.map((d) => {
                  const m = elementMultiplier(atk, d);
                  const focus = def === d;
                  return (
                    <td
                      key={d}
                      className={`p-1 text-center font-mono border border-panel-2 ${cellColor(
                        m
                      )} ${focus ? "ring-2 ring-gold" : ""}`}
                      onClick={() => setDef(def === d ? null : d)}
                    >
                      {m}x
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {def && (
          <p className="text-sm mt-3 text-foreground/80">
            <span className="text-gold-soft">{atk}</span> vs{" "}
            <span className="text-gold-soft">{def}</span>: {elementMultiplier(atk, def)}× —{" "}
            {multiplierLabel(elementMultiplier(atk, def))}.
          </p>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-panel-2 bg-panel p-4">
          <h2 className="font-semibold text-gold-soft mb-2">Card Combos</h2>
          <ul className="text-sm space-y-1 text-foreground/75">
            <li>• Ifrit (weapon) + Kiel D-01 (head) = burst + faster cast for mages.</li>
            <li>• Eddga (foot) + AGI boots = kite-and-run farming.</li>
            <li>• Maya (shield) reflects magic; Golden Thief Bug (armor) nullifies it.</li>
            <li>• Pair damage cards with the right element per target monster.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-panel-2 bg-panel p-4">
          <h2 className="font-semibold text-gold-soft mb-2">Guild War / PvP</h2>
          <ul className="text-sm space-y-1 text-foreground/75">
            <li>• Knight: GvG frontline — Bowling Bash + Lion&apos;s Roar lock groups.</li>
            <li>• Gunslinger: mobile PvP DPS; Tracking + Gatling uptime.</li>
            <li>• Druid: wildcard — meta still forming post-launch; don&apos;t over-invest yet.</li>
            <li>• Priest: in high demand for static groups and war heals.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
