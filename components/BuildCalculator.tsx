"use client";

import { useMemo, useState } from "react";
import { classes } from "@/lib/data/classes";
import { gear } from "@/lib/data/gear";
import type { GearSlot } from "@/lib/data/types";
import {
  calculateAspd,
  aspdLabel,
  ASPD_CAP,
  type AspdInput,
} from "@/lib/calc/aspd";
import { calculateRefine, REFINE_MAX } from "@/lib/calc/refine";
import { ListHeader } from "@/components/ui";

const SLOTS: GearSlot[] = [
  "Weapon",
  "Armor",
  "Garment",
  "Footgear",
  "Shield",
  "Headgear",
  "Accessory",
];

// Parse "ATK +85, STR +3" into { ATK: 85, STR: 3 }
function parseStats(stats: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const part of stats.split(",")) {
    const m = part.trim().match(/^([A-Za-z ]+?)\s*\+(\d+)$/);
    if (m) out[m[1].trim()] = Number(m[2]);
  }
  return out;
}

interface SavedBuild {
  id: string;
  name: string;
  classId: string;
  agi: number;
  dex: number;
  baseAspd: number;
}

const BUILD_KEY = "ragnasys.builds";

function loadBuilds(): SavedBuild[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BUILD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BuildCalculator() {
  const [classId, setClassId] = useState(classes[0].id);
  const [baseAspd, setBaseAspd] = useState(14);
  const [agi, setAgi] = useState(80);
  const [dex, setDex] = useState(60);
  const [buffs, setBuffs] = useState<AspdInput["buffs"]>({
    increaseAgi: false,
    gatlingFever: false,
    foodPotion: false,
  });
  const [refineTarget, setRefineTarget] = useState(10);
  const [buildName, setBuildName] = useState("");
  const [builds, setBuilds] = useState<SavedBuild[]>(() =>
    typeof window !== "undefined" ? loadBuilds() : []
  );

  // Gear Set Builder: one gear id per slot
  const [loadout, setLoadout] = useState<Record<GearSlot, string>>(() => {
    const init = {} as Record<GearSlot, string>;
    for (const s of SLOTS) init[s] = "";
    return init;
  });

  const setTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const slot of SLOTS) {
      const id = loadout[slot];
      if (!id) continue;
      const g = gear.find((x) => x.id === id);
      if (!g) continue;
      const parsed = parseStats(g.stats);
      for (const [k, v] of Object.entries(parsed)) {
        totals[k] = (totals[k] ?? 0) + v;
      }
    }
    return totals;
  }, [loadout]);

  const aspd = useMemo(
    () => calculateAspd({ baseAspd, agi, dex, buffs }),
    [baseAspd, agi, dex, buffs]
  );
  const refine = useMemo(() => calculateRefine(refineTarget), [refineTarget]);

  const pct = Math.min(100, Math.round((aspd.aspd / ASPD_CAP) * 100));

  function saveBuild() {
    if (!buildName.trim()) return;
    const b: SavedBuild = {
      id: `${Date.now()}`,
      name: buildName.trim(),
      classId,
      agi,
      dex,
      baseAspd,
    };
    const next = [...builds, b];
    setBuilds(next);
    localStorage.setItem(BUILD_KEY, JSON.stringify(next));
    setBuildName("");
  }

  function loadBuild(b: SavedBuild) {
    setClassId(b.classId);
    setAgi(b.agi);
    setDex(b.dex);
    setBaseAspd(b.baseAspd);
  }

  function deleteBuild(id: string) {
    const next = builds.filter((b) => b.id !== id);
    setBuilds(next);
    localStorage.setItem(BUILD_KEY, JSON.stringify(next));
  }

  return (
    <div className="space-y-6">
      <ListHeader
        title="Build Calculator"
        description="Estimate ASPD toward the 193 cap, plan safe-refine costs, and save builds."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* ASPD */}
        <section className="card-modern p-4 space-y-4">
          <h2 className="font-semibold text-gold-soft">ASPD Calculator</h2>

          <label className="block text-sm">
            <span className="text-foreground/70">Class</span>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="mt-1 w-full rounded-md bg-panel-2 border border-panel-2 px-2 py-1.5"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-3 gap-3">
            <NumberField label="Base ASPD" value={baseAspd} onChange={setBaseAspd} />
            <NumberField label="AGI" value={agi} onChange={setAgi} />
            <NumberField label="DEX" value={dex} onChange={setDex} />
          </div>

          <div className="space-y-1 text-sm">
            <BuffToggle label="Increase AGI (+20%)" checked={buffs.increaseAgi} onChange={(v) => setBuffs({ ...buffs, increaseAgi: v })} />
            <BuffToggle label="Gatling Fever (Gunslinger)" checked={buffs.gatlingFever} onChange={(v) => setBuffs({ ...buffs, gatlingFever: v })} />
            <BuffToggle label="ASPD Food / Potion" checked={buffs.foodPotion} onChange={(v) => setBuffs({ ...buffs, foodPotion: v })} />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-foreground/70">ASPD</span>
              <span className={aspd.capped ? "text-gold font-semibold" : "text-foreground"}>
                {aspd.aspd} / {ASPD_CAP} — {aspdLabel(aspd.aspd)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-panel-2 overflow-hidden">
              <div
                className={`h-full ${aspd.capped ? "bg-gold" : "bg-sage"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </section>

        {/* Refine */}
        <section className="card-modern p-4 space-y-4">
          <h2 className="font-semibold text-gold-soft">Safe Refine Planner</h2>
          <label className="block text-sm">
            <span className="text-foreground/70">
              Target refine: +{refineTarget} (max {REFINE_MAX})
            </span>
            <input
              type="range"
              min={1}
              max={REFINE_MAX}
              value={refineTarget}
              onChange={(e) => setRefineTarget(Number(e.target.value))}
              className="mt-2 w-full accent-gold"
            />
          </label>
          <div className="text-sm">
            <p className="text-foreground/70">
              Estimated stones to +{refine.target}:{" "}
              <span className="text-gold-soft font-semibold">{refine.totalStones}</span>
            </p>
            <ul className="mt-2 max-h-40 overflow-auto text-xs text-foreground/65">
              {refine.steps.map((s) => (
                <li key={s.level} className="flex justify-between border-b border-panel-2 py-0.5">
                  <span>+{s.level}</span>
                  <span>{s.stones} stones · total {s.total}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Gear Set Builder */}
      <section className="card-modern p-4 space-y-4">
        <h2 className="font-semibold text-gold-soft">Gear Set Builder</h2>
        <p className="text-xs text-foreground/65">
          Pick one piece per slot to preview summed stats. Safe refine to +15 never breaks gear.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SLOTS.map((slot) => (
            <label key={slot} className="block text-sm">
              <span className="text-foreground/70">{slot}</span>
              <select
                value={loadout[slot]}
                onChange={(e) => setLoadout({ ...loadout, [slot]: e.target.value })}
                className="mt-1 w-full rounded-md bg-panel-2 border border-panel-2 px-2 py-1.5"
              >
                <option value="">— none —</option>
                {gear
                  .filter((g) => g.slot === slot)
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
              </select>
            </label>
          ))}
        </div>
        <div>
          <p className="text-sm text-foreground/70 mb-1">Summed stats</p>
          {Object.keys(setTotals).length === 0 ? (
            <p className="text-sm text-foreground/50">No gear selected.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Object.entries(setTotals).map(([k, v]) => (
                <span
                  key={k}
                  className="rounded-md bg-ocean/50 border border-sky/30 px-2 py-1 text-sm font-mono"
                >
                  {k} +{v}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Saved builds */}
      <section className="card-modern p-4 space-y-3">
        <h2 className="font-semibold text-gold-soft">Saved Builds</h2>
        <div className="flex gap-2">
          <input
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            placeholder="Build name (e.g. Crit Assassin)"
            className="flex-1 rounded-md bg-panel-2 border border-panel-2 px-2 py-1.5 text-sm"
          />
          <button
            onClick={saveBuild}
            className="px-3 py-1.5 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
          >
            Save
          </button>
        </div>
        {builds.length === 0 ? (
          <p className="text-sm text-foreground/50">No builds saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {builds.map((b) => {
              const c = classes.find((x) => x.id === b.classId);
              return (
                <li
                  key={b.id}
                  className="flex items-center justify-between border border-panel-2 rounded-md px-3 py-2 text-sm"
                >
                  <button onClick={() => loadBuild(b)} className="text-left hover:text-gold-soft">
                    <span className="font-medium">{b.name}</span>{" "}
                    <span className="text-foreground/50">
                      ({c?.name}) AGI {b.agi} / DEX {b.dex}
                    </span>
                  </button>
                  <button
                    onClick={() => deleteBuild(b.id)}
                    className="text-crimson text-xs hover:underline"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-foreground/70">{label}</span>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="mt-1 w-full rounded-md bg-panel-2 border border-panel-2 px-2 py-1.5 font-mono"
      />
    </label>
  );
}

function BuffToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-gold"
      />
      <span className="text-foreground/80">{label}</span>
    </label>
  );
}
