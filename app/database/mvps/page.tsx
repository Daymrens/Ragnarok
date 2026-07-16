import { Card, ElementBadge, SourceBadge } from "@/components/ui";
import { getMergedMvps } from "@/lib/data/roworlddb";
import Link from "next/link";

export default function MvpsPage() {
  const merged = getMergedMvps();
  const estimates = merged.filter((m) => m.estimate).length;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">MVPs</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Boss database. {estimates} of {merged.length} respawn windows are estimates pending
          verification. Use the{" "}
          <Link href="/mvp" className="text-gold-soft hover:underline">
            MVP Timer
          </Link>{" "}
          to track spawns live.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {merged.map((m) => (
          <Link key={m.id} href={`/database/mvps/${m.id}`}>
            <Card className="hover:border-gold transition-colors h-full">
              <div className="flex items-center gap-3">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-12 w-12 rounded-md border border-gold-deep/30 bg-gradient-to-b from-ocean/60 to-panel object-contain shrink-0"
                    loading="lazy"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold text-gold-soft truncate">{m.name}</h2>
                    <ElementBadge element={m.element} />
                  </div>
                  <p className="text-xs text-foreground/60 mt-1">Lv {m.level} · {m.map}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/75 mt-2">
                Respawn: {m.respawnMin === m.respawnMax
                  ? `${m.respawnMin}m`
                  : `${m.respawnMin}–${m.respawnMax}m`}
                {m.estimate && <span className="text-crimson"> (est.)</span>}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                {m.drops.length > 0 ? (
                  <p className="text-xs text-foreground/50 truncate">
                    Drops: {m.drops.join(", ")}
                  </p>
                ) : (
                  <span />
                )}
                <SourceBadge id={m.id} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
