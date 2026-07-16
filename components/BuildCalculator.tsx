"use client";

import { useMemo, useState } from "react";
import { classes } from "@/lib/data/classes";
import { gear } from "@/lib/data/gear";
import type { GearSlot, Element } from "@/lib/data/types";
import {
  calculateAspd,
  aspdLabel,
  ASPD_CAP,
  type AspdInput,
} from "@/lib/calc/aspd";
import { calculateRefine, REFINE_MAX } from "@/lib/calc/refine";
import { estimateRefineCost } from "@/lib/refineCost";
import { estimateDamage } from "@/lib/damageCalc";
import { ELEMENTS } from "@/lib/data/elements";
import { encodeBuild, decodeBuild } from "@/lib/buildEncode";
import type { BuildState } from "@/lib/data/types";
import { ScreenshotImport } from "@/components/ScreenshotImport";
import { JobSwitcher } from "@/components/JobSwitcher";
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

// Roster (Job Freedom) schema — multi-preset per character.
import {
  loadRoster,
  saveRoster,
  type RosterState,
  type JobPreset,
} from "@/lib/buildStore";

export function BuildCalculator() {
  const [classId, setClassId] = useState(classes[0].id);
  const [baseAspd, setBaseAspd] = useState(14);
  const [agi, setAgi] = useState(80);
  const [dex, setDex] = useState(60);
  const [vit, setVit] = useState(0);
  const [int, setInt] = useState(0);
  const [str, setStr] = useState(0);
  const [luk, setLuk] = useState(0);
  const [atk, setAtk] = useState(100);
  const [element, setElement] = useState<Element>("Neutral");
  const [targetElement, setTargetElement] = useState<Element>("Neutral");
  const [targetDef, setTargetDef] = useState(0);
  const [buffs, setBuffs] = useState<AspdInput["buffs"]>({
    increaseAgi: false,
    gatlingFever: false,
    foodPotion: false,
  });
  const [refineTarget, setRefineTarget] = useState(10);
  const [buildName, setBuildName] = useState("");
  const [roster, setRoster] = useState<RosterState>(() =>
    typeof window !== "undefined" ? loadRoster() : { version: 1, characters: [] }
  );
  const [activeCharId, setActiveCharId] = useState<string | null>(() =>
    typeof window !== "undefined" ? loadRoster().characters[0]?.id ?? null : null
  );
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [pendingShared, setPendingShared] = useState<BuildState | null>(() => {
    if (typeof window === "undefined") return null;
    const b = new URLSearchParams(window.location.search).get("b");
    if (!b) return null;
    return decodeBuild(b);
  });
  const [linkCopied, setLinkCopied] = useState(false);

  // Gear Set Builder: one gear id per slot
  const [loadout, setLoadout] = useState<Record<GearSlot, string>>(() => {
    const init = {} as Record<GearSlot, string>;
    for (const s of SLOTS) init[s] = "";
    return init;
  });

  function currentState(): BuildState {
    return {
      name: buildName || "Untitled Build",
      classId,
      baseAspd,
      agi,
      dex,
      vit,
      int: int,
      str: str,
      luk: luk,
      buffs,
      refineTarget,
      loadout,
      atk: atk,
      element,
      targetElement,
      targetDef,
    };
  }

  function applyState(s: BuildState) {
    setClassId(s.classId);
    setBaseAspd(s.baseAspd);
    setAgi(s.agi);
    setDex(s.dex);
    setVit(s.vit ?? 0);
    setInt(s.int ?? 0);
    setStr(s.str ?? 0);
    setLuk(s.luk ?? 0);
    setBuffs(s.buffs);
    setRefineTarget(s.refineTarget);
    setLoadout({ ...loadout, ...s.loadout });
    setAtk(s.atk ?? 100);
    setElement(s.element ?? "Neutral");
    setTargetElement(s.targetElement ?? "Neutral");
    setTargetDef(s.targetDef ?? 0);
  }

  function applyScreenshot(stats: {
    str: number;
    agi: number;
    vit: number;
    int: number;
    dex: number;
    luk: number;
  }) {
    setStr(stats.str);
    setAgi(stats.agi);
    setVit(stats.vit);
    setInt(stats.int);
    setDex(stats.dex);
    setLuk(stats.luk);
  }

  // Note: ?b= share links are read once via the lazy initializer above.
  // If a build is already in progress, we surface a confirmation prompt
  // (pendingShared) instead of silently overwriting the user's inputs.

  function copyShareLink() {
    const encoded = encodeBuild(currentState());
    const url = `${window.location.origin}${window.location.pathname}?b=${encoded}`;
    window.history.replaceState(null, "", `?b=${encoded}`);
    navigator.clipboard?.writeText(url).then(
      () => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      },
      () => setLinkCopied(false)
    );
  }

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

  const gearAtk = setTotals["ATK"] ?? 0;

  const damage = useMemo(
    () =>
      estimateDamage({
        atk: atk + gearAtk,
        refine: refineTarget,
        element,
        targetElement,
        targetDef,
      }),
    [atk, gearAtk, refineTarget, element, targetElement, targetDef]
  );

  const aspd = useMemo(
    () => calculateAspd({ baseAspd, agi, dex, buffs }),
    [baseAspd, agi, dex, buffs]
  );
  const refine = useMemo(() => calculateRefine(refineTarget), [refineTarget]);
  const refineCost = useMemo(
    () => estimateRefineCost(0, refineTarget),
    [refineTarget]
  );

  const pct = Math.min(100, Math.round((aspd.aspd / ASPD_CAP) * 100));

  function commitRoster(next: RosterState) {
    setRoster(next);
    saveRoster(next);
  }

  function savePreset() {
    if (!buildName.trim()) return;
    const state = currentState();
    const preset: JobPreset = { job: classId, name: buildName.trim(), state };
    let next: RosterState;
    const charId = activeCharId ?? `char-${Date.now()}`;
    const existing = roster.characters.find((c) => c.id === charId);
    if (existing) {
      next = {
        ...roster,
        characters: roster.characters.map((c) =>
          c.id === charId
            ? {
                ...c,
                presets: [
                  ...c.presets.filter((p) => p.job !== classId),
                  preset,
                ],
              }
            : c
        ),
      };
    } else {
      next = {
        ...roster,
        characters: [
          ...roster.characters,
          { id: charId, name: "Character", presets: [preset] },
        ],
      };
      setActiveCharId(charId);
    }
    commitRoster(next);
    setActiveJob(classId);
    setBuildName("");
  }

  function selectPreset(charId: string, preset: JobPreset | undefined) {
    if (!preset) return;
    const c = roster.characters.find((x) => x.id === charId);
    setActiveCharId(charId);
    setActiveJob(preset.job);
    applyState(preset.state);
    if (c) setBuildName(preset.name);
  }

  function deletePreset(charId: string, job: string) {
    const next: RosterState = {
      ...roster,
      characters: roster.characters
        .map((c) =>
          c.id === charId
            ? { ...c, presets: c.presets.filter((p) => p.job !== job) }
            : c
        )
        .filter((c) => c.presets.length > 0),
    };
    commitRoster(next);
    if (activeCharId === charId && activeJob === job) setActiveJob(null);
  }

  return (
    <div className="space-y-6">
      <ListHeader
        title="Build Calculator"
        description="Estimate ASPD toward the 193 cap, plan safe-refine costs, and save builds."
      />

      {pendingShared && (
        <div className="card-modern p-4 flex flex-wrap items-center gap-3 justify-between">
          <p className="text-sm text-foreground/80">
            A shared build was detected. Load it and replace your current inputs?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                applyState(pendingShared);
                setPendingShared(null);
                window.history.replaceState(null, "", window.location.pathname);
              }}
              className="px-3 py-1.5 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
            >
              Load shared build
            </button>
            <button
              onClick={() => {
                setPendingShared(null);
                window.history.replaceState(null, "", window.location.pathname);
              }}
              className="px-3 py-1.5 rounded-md border border-panel-2 text-sm hover:border-crimson/50 text-crimson"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* ASPD */}
        <section className="card-modern p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gold-soft">ASPD Calculator</h2>
            <button
              onClick={copyShareLink}
              className="text-xs px-3 py-1.5 rounded-md btn-gold font-semibold"
            >
              {linkCopied ? "Link copied!" : "Copy Share Link"}
            </button>
          </div>

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
            <div className="mt-3 pt-3 border-t border-panel-2">
              <p className="text-xs uppercase tracking-wide text-foreground/50 mb-1">
                Cost to reach +{refineTarget} (est.)
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-panel-2 py-2">
                  <p className="text-xs text-foreground/55">Attempts</p>
                  <p className="font-mono text-gold-soft">{refineCost.attempts}</p>
                </div>
                <div className="rounded-md bg-panel-2 py-2">
                  <p className="text-xs text-foreground/55">Zeny</p>
                  <p className="font-mono text-gold-soft">{refineCost.zeny.toLocaleString()}</p>
                </div>
                <div className="rounded-md bg-panel-2 py-2">
                  <p className="text-xs text-foreground/55">Ore</p>
                  <p className="font-mono text-gold-soft">{refineCost.ore}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Estimated Damage */}
      <section className="card-modern p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gold-soft">Estimated Damage</h2>
          <span className="text-[10px] text-crimson/80">estimate only</span>
        </div>
        <p className="text-xs text-foreground/60">
          Approximate model — not verified against live combat logs. Use for relative
          comparison only.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <NumberField label="ATK" value={atk} onChange={setAtk} />
          <label className="block text-sm">
            <span className="text-foreground/70">Your element</span>
            <select
              value={element}
              onChange={(e) => setElement(e.target.value as Element)}
              className="input-field mt-1 w-full rounded-md px-2 py-1.5"
            >
              {ELEMENTS.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-foreground/70">Target element</span>
            <select
              value={targetElement}
              onChange={(e) => setTargetElement(e.target.value as Element)}
              className="input-field mt-1 w-full rounded-md px-2 py-1.5"
            >
              {ELEMENTS.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </label>
          <NumberField label="Target DEF" value={targetDef} onChange={setTargetDef} />
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg border border-panel-2 p-3">
            <p className="text-xs text-foreground/55">Min</p>
            <p className="text-xl font-mono text-foreground/80">{damage.min}</p>
          </div>
          <div className="rounded-lg border border-gold/40 bg-gold/5 p-3">
            <p className="text-xs text-foreground/55">Avg</p>
            <p className="text-xl font-mono text-gold-soft font-semibold">{damage.avg}</p>
          </div>
          <div className="rounded-lg border border-panel-2 p-3">
            <p className="text-xs text-foreground/55">Max</p>
            <p className="text-xl font-mono text-foreground/80">{damage.max}</p>
          </div>
        </div>
        <p className="text-xs text-foreground/50">
          Includes gear ATK from the Gear Set Builder ({gearAtk}) and refine +{refineTarget}.
        </p>
      </section>

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

      {/* Screenshot importer */}
      <section className="card-modern p-4 space-y-3">
        <h2 className="font-semibold text-gold-soft">Import from Screenshot</h2>
        <p className="text-xs text-foreground/65">
          Upload or paste a screenshot of your stat screen. OCR runs entirely in your browser —
          review and correct the values before applying.
        </p>
        <ScreenshotImport onApply={applyScreenshot} />
      </section>

      {/* Job Freedom roster */}
      <section className="card-modern p-4 space-y-3">
        <h2 className="font-semibold text-gold-soft">Job Freedom Roster</h2>
        <p className="text-xs text-foreground/65">
          Save a stat/skill preset per job on one character and quick-switch via Job Freedom.
        </p>
        <JobSwitcher
          roster={roster}
          activeCharId={activeCharId}
          activeJob={activeJob}
          onSelectPreset={(charId, preset) => selectPreset(charId, preset)}
          onAddPreset={savePreset}
        />
        <div className="flex gap-2">
          <input
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            placeholder="Preset name (e.g. Crit Assassin)"
            className="input-field flex-1 rounded-md px-2 py-1.5 text-sm"
          />
          <button
            onClick={savePreset}
            className="px-3 py-1.5 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
          >
            Save current
          </button>
        </div>
        {roster.characters.length === 0 ? (
          <p className="text-sm text-foreground/50">
            No presets saved yet. Fill in stats and save your first job preset.
          </p>
        ) : (
          <ul className="space-y-2">
            {roster.characters.flatMap((c) =>
              c.presets.map((p) => {
                const cls = classes.find((x) => x.id === p.job);
                return (
                  <li
                    key={`${c.id}-${p.job}`}
                    className="flex items-center justify-between border border-panel-2 rounded-md px-3 py-2 text-sm"
                  >
                    <button
                      onClick={() => selectPreset(c.id, p)}
                      className="text-left hover:text-gold-soft"
                    >
                      <span className="font-medium">{p.name}</span>{" "}
                      <span className="text-foreground/50">
                        ({cls?.name}) · {c.name}
                      </span>
                    </button>
                    <button
                      onClick={() => deletePreset(c.id, p.job)}
                      className="text-crimson text-xs hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                );
              })
            )}
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
