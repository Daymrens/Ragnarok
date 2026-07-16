import { leveling } from "@/lib/data/leveling";
import { getMonster } from "@/lib/data/monsters";
import { Card, SectionTitle } from "@/components/ui";

export default function LevelingPage() {
  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Leveling Routes</SectionTitle>
        <p className="text-foreground/70 text-sm mt-1">
          Recommended zones by level. Routes are estimates from classic RO baselines — verify in-game.
        </p>
      </div>

      <div className="space-y-3">
        {leveling.map((s) => {
          const names = s.monsters
            .map((id) => getMonster(id)?.name)
            .filter(Boolean) as string[];
          return (
            <Card key={s.levelRange} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="sm:w-24 shrink-0">
                <p className="font-display text-lg font-bold text-ember">{s.levelRange}</p>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gold-soft">
                  {s.zone} <span className="text-xs text-foreground/50">· {s.region}</span>
                </h2>
                {names.length > 0 && (
                  <p className="text-xs text-foreground/60 mt-0.5">
                    Targets: {names.join(", ")}
                  </p>
                )}
                {s.notes && <p className="text-sm text-foreground/75 mt-1">{s.notes}</p>}
                {s.estimate && <p className="text-xs text-crimson/80 mt-1">est. route</p>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
