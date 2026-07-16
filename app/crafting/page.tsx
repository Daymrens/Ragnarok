import { lifeSkills, stations, materialSources, lifeRoutine } from "@/lib/data/crafting";
import { Card } from "@/components/ui";
import Link from "next/link";

export default function CraftingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Crafting & Life Skills</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Life skills run on a separate <span className="text-gold-soft">Life Stamina</span> pool
          from combat. Gather, craft, refine, and enchant to fund your progression.
        </p>
      </div>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Life Skills</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lifeSkills.map((s) => (
            <div key={s.id} className="rounded-lg border border-panel-2 p-3">
              <p className="font-medium text-foreground/90">{s.name}</p>
              <p className="text-sm text-foreground/65 mt-1">{s.description}</p>
              <p className="text-xs text-gold-soft/80 mt-1">
                Outputs: {s.outputs.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Stations (towns)</h2>
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

        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Material Sources</h2>
          <ul className="space-y-2 text-sm">
            {materialSources.map((m) => (
              <li key={m.id} className="border-b border-panel-2 pb-2">
                <p className="font-medium text-foreground/90">{m.name}</p>
                <p className="text-foreground/65 text-xs">{m.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Daily Life Stamina Routine (F2P)</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/80">
          {lifeRoutine.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
        <div className="mt-3">
          <Link
            href="/builder"
            className="text-sm text-gold-soft hover:underline"
          >
            Plan refine costs in the Build Calculator →
          </Link>
        </div>
      </Card>
    </div>
  );
}
