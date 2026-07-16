import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, ElementBadge } from "@/components/ui";
import { getMonster } from "@/lib/data/monsters";
import { elementMultiplier, ELEMENTS } from "@/lib/data/elements";

export default async function MonsterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = getMonster(id);
  if (!m) notFound();

  const strong = ELEMENTS.filter((e) => elementMultiplier(e, m.element) > 1).slice(0, 3);
  const weak = ELEMENTS.filter((e) => elementMultiplier(e, m.element) < 1).slice(0, 3);

  return (
    <div className="space-y-6">
      <Link href="/database/monsters" className="text-sm text-gold-soft hover:underline">
        &larr; Bestiary
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gold">
          {m.name} {m.isMvp && <span className="text-crimson text-sm">MVP</span>}
        </h1>
        <ElementBadge element={m.element} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Stats</h2>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">Level</span>
              <span className="font-mono">{m.level}</span>
            </li>
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">HP</span>
              <span className="font-mono">{m.hp.toLocaleString()}</span>
            </li>
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">Race</span>
              <span>{m.race}</span>
            </li>
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">Size</span>
              <span>{m.size}</span>
            </li>
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">Region</span>
              <span>{m.region}</span>
            </li>
          </ul>
          {m.estimate && <p className="text-xs text-crimson/80 mt-2">Stats are estimates.</p>}
        </Card>

        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Drops</h2>
          {m.drops.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {m.drops.map((d) => (
                <li key={d} className="rounded-md bg-panel-2 px-2 py-1 text-sm">
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-foreground/50">No drops recorded.</p>
          )}

          <h2 className="font-semibold text-gold-soft mt-4 mb-2">Elemental weakness</h2>
          <p className="text-xs text-foreground/60">
            Strong vs {m.element}: {strong.length ? strong.join(", ") : "none"}. Weak vs:{" "}
            {weak.length ? weak.join(", ") : "none"}.
          </p>
        </Card>
      </div>

      <div className="flex gap-3">
        {m.isMvp && (
          <Link
            href="/mvp"
            className="px-4 py-2 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
          >
            Track on MVP Timer
          </Link>
        )}
        <Link
          href="/strategy"
          className="px-4 py-2 rounded-md border border-panel-2 text-sm font-semibold hover:border-gold"
        >
          Element chart
        </Link>
      </div>
    </div>
  );
}
