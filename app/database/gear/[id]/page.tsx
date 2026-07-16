import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, SourceBadge } from "@/components/ui";
import { getMergedGearItem } from "@/lib/data/roworlddb";

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const g = getMergedGearItem(id);
  if (!g) notFound();

  const stats = g.stats
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <Link
        href="/database/gear"
        className="text-sm text-gold-soft hover:underline"
      >
        &larr; Gear
      </Link>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gold">{g.name}</h1>
          <p className="text-sm text-foreground/60 mt-1">{g.slot}</p>
        </div>
        <SourceBadge id={g.id} />
      </div>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Stats</h2>
        {stats.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {stats.map((s) => (
              <li
                key={s}
                className="rounded-md bg-panel-2 px-3 py-1.5 text-sm font-mono"
              >
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-foreground/50">No stats recorded.</p>
        )}
        {g.refineNote && (
          <p className="text-xs text-foreground/50 mt-3">{g.refineNote}</p>
        )}
      </Card>

      <Link
        href="/builder"
        className="inline-block px-4 py-2 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
      >
        Use in Build Calculator
      </Link>
    </div>
  );
}
