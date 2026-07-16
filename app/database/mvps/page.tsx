import { Card, ElementBadge } from "@/components/ui";
import { mvps } from "@/lib/data/mvps";
import Link from "next/link";

export default function MvpsPage() {
  const estimates = mvps.filter((m) => m.estimate).length;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">MVPs</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Boss database. {estimates} of {mvps.length} respawn windows are estimates pending
          verification. Use the{" "}
          <Link href="/mvp" className="text-gold-soft hover:underline">
            MVP Timer
          </Link>{" "}
          to track spawns live.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mvps.map((m) => (
          <Card key={m.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gold-soft">{m.name}</h2>
              <ElementBadge element={m.element} />
            </div>
            <p className="text-xs text-foreground/60 mt-1">Lv {m.level} · {m.map}</p>
            <p className="text-sm text-foreground/75 mt-2">
              Respawn: {m.respawnMin === m.respawnMax
                ? `${m.respawnMin}m`
                : `${m.respawnMin}–${m.respawnMax}m`}
              {m.estimate && <span className="text-crimson"> (est.)</span>}
            </p>
            {m.drops.length > 0 && (
              <p className="text-xs text-foreground/50 mt-1">
                Drops: {m.drops.join(", ")}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
