"use client";

import { useState } from "react";
import {
  lifeSkills,
  stations,
  materialSources,
  materials,
  recipes,
  refineTiers,
  upgradeSystems,
  lifeRoutine,
  SAFE_REFINE_CAP,
  DAILY_LIFE_ENERGY,
} from "@/lib/data/crafting";
import { Card, SectionTitle } from "@/components/ui";
import Link from "next/link";

const tabs = [
  { id: "life", label: "Life Skills" },
  { id: "recipes", label: "Recipes" },
  { id: "refine", label: "Refine & Upgrades" },
  { id: "materials", label: "Materials" },
  { id: "routine", label: "Daily Routine" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const rarityColor: Record<string, string> = {
  Common: "border-panel-2 text-foreground/60",
  Uncommon: "border-sage text-sage",
  Rare: "border-sky text-sky",
  Epic: "border-violet text-violet",
};

export default function CraftingPage() {
  const [tab, setTab] = useState<TabId>("life");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Crafting & Life Skills</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Life skills run on a separate <span className="text-gold-soft">Life Energy</span> pool
          ({DAILY_LIFE_ENERGY}/day) from combat. Gather, craft, refine, and enchant to fund your
          progression. Rates marked <span className="text-ember">est.</span> are launch-window
          estimates.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t.id
                ? "bg-gold text-midnight"
                : "border border-panel-2 text-foreground/70 hover:border-gold/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "life" && (
        <Card>
          <SectionTitle>Life Skills</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lifeSkills.map((s) => (
              <div key={s.id} className="rounded-lg border border-panel-2 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground/90">{s.name}</p>
                  {s.priority && (
                    <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] text-gold-soft">
                      early priority
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/65 mt-1">{s.description}</p>
                <p className="text-xs text-gold-soft/80 mt-1">
                  Outputs: {s.outputs.join(", ")}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-gold-soft mt-5 mb-2">Stations (towns)</h3>
          <ul className="space-y-2 text-sm">
            {stations.map((st) => (
              <li key={st.id} className="border-b border-panel-2 pb-2">
                <p className="font-medium text-foreground/90">{st.name}</p>
                <p className="text-foreground/65 text-xs">{st.purpose}</p>
                <p className="text-foreground/50 text-xs">Towns: {st.towns.join(", ")}</p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {tab === "recipes" && (
        <Card>
          <SectionTitle>Recipes</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {recipes.map((r) => (
              <div key={r.id} className="rounded-lg border border-panel-2 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground/90">{r.name}</p>
                  <span className="text-[10px] text-foreground/50">
                    Lv {r.level} · {r.energy} energy
                  </span>
                </div>
                <p className="text-xs text-gold-soft/80 mt-0.5">{r.category} · {r.skill}</p>
                <p className="text-sm text-foreground/70 mt-1">{r.result}</p>
                <p className="text-xs text-foreground/55 mt-1">
                  {r.ingredients
                    .map((i) => {
                      const m = materials.find((x) => x.id === i.material);
                      return `${m?.name ?? i.material} ×${i.qty}`;
                    })
                    .join(", ")}
                </p>
                {r.estimate && <p className="text-[10px] text-ember mt-1">estimate</p>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "refine" && (
        <div className="space-y-4">
          <Card>
            <SectionTitle>Refinement — Safe to +{SAFE_REFINE_CAP}</SectionTitle>
            <p className="text-sm text-foreground/70 mb-3">
              ROW lets you refine gear up to <span className="text-gold-soft">+{SAFE_REFINE_CAP}</span>{" "}
              without gear destruction — a major F2P-friendly change from classic RO. Rates below are
              estimates.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-foreground/55 border-b border-panel-2">
                    <th className="py-2 pr-4">+Level</th>
                    <th className="py-2 pr-4">Success</th>
                    <th className="py-2 pr-4">Cost</th>
                    <th className="py-2">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {refineTiers.map((t) => (
                    <tr key={t.plus} className="border-b border-panel-2/60">
                      <td className="py-2 pr-4 font-medium text-gold-soft">+{t.plus}</td>
                      <td className="py-2 pr-4">{t.rate}</td>
                      <td className="py-2 pr-4">{t.cost}</td>
                      <td className="py-2 text-foreground/60 text-xs">{t.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <Link href="/builder" className="text-sm text-gold-soft hover:underline">
                Plan refine costs in the Build Calculator →
              </Link>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gold-soft mb-3">Gear Upgrade Systems</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upgradeSystems.map((u) => (
                <div key={u.id} className="rounded-lg border border-panel-2 p-3">
                  <p className="font-medium text-foreground/90">{u.name}</p>
                  <p className="text-sm text-foreground/65 mt-1">{u.description}</p>
                  <p className="text-xs text-gold-soft/80 mt-1">Needs: {u.materials}</p>
                  {u.unlock && (
                    <p className="text-xs text-foreground/50 mt-0.5">{u.unlock}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "materials" && (
        <Card>
          <SectionTitle>Material Sources & Catalog</SectionTitle>
          <ul className="space-y-2 text-sm mb-5">
            {materialSources.map((m) => (
              <li key={m.id} className="border-b border-panel-2 pb-2">
                <p className="font-medium text-foreground/90">{m.name}</p>
                <p className="text-foreground/65 text-xs">{m.detail}</p>
              </li>
            ))}
          </ul>
          <h3 className="font-semibold text-gold-soft mb-2">Materials</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((m) => (
              <div
                key={m.id}
                className={`rounded-lg border p-2 text-sm ${rarityColor[m.rarity]}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground/90">{m.name}</span>
                  <span className="text-[10px]">{m.rarity}</span>
                </div>
                <p className="text-xs text-foreground/55">
                  {m.source}
                  {m.from ? ` · ${m.from}` : ""}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "routine" && (
        <Card>
          <SectionTitle>Daily Life Energy Routine (F2P)</SectionTitle>
          <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/80">
            {lifeRoutine.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  );
}
