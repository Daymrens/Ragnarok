import { monsters } from "@/lib/data/monsters";
import { chests } from "@/lib/data/chests";
import { Card, SectionTitle } from "@/components/ui";
import Link from "next/link";

export default function WorldPage() {
  const regions = new Set<string>([
    ...monsters.map((m) => m.region),
    ...chests.map((c) => c.region),
  ]);

  const list = [...regions].sort();

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>World Regions</SectionTitle>
        <p className="text-foreground/70 text-sm mt-1">
          Explore seamless Midgard. Monsters and exploration collectibles by region. Coordinates
          are community-sourced and may be incomplete (tbd).
        </p>
      </div>

      <div className="space-y-4">
        {list.map((region) => {
          const mobs = monsters.filter((m) => m.region === region);
          const found = chests.filter((c) => c.region === region);
          const tbdCount = found.filter((c) => c.tbd).length;
          return (
            <Card key={region}>
              <h2 className="font-display text-lg font-semibold text-ember">{region}</h2>
              <div className="grid gap-3 mt-2 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase text-foreground/50 mb-1">Monsters ({mobs.length})</p>
                  {mobs.length > 0 ? (
                    <ul className="text-sm text-foreground/75 space-y-0.5">
                      {mobs.map((m) => (
                        <li key={m.id}>
                          <Link href={`/database/monsters/${m.id}`} className="hover:text-gold-soft">
                            {m.name}
                          </Link>{" "}
                          <span className="text-foreground/40">Lv {m.level}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-foreground/40">No bestiary entries yet.</p>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase text-foreground/50 mb-1">
                    Exploration ({found.length}{tbdCount > 0 ? ` · ${tbdCount} tbd` : ""})
                  </p>
                  {found.length > 0 ? (
                    <ul className="text-sm text-foreground/75 space-y-0.5">
                      {found.map((c) => (
                        <li key={c.id}>
                          {c.name} <span className="text-foreground/40">({c.type})</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-foreground/40">No chests mapped yet.</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
