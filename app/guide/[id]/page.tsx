import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, TierBadge } from "@/components/ui";
import { getClass } from "@/lib/data/classes";
import { getGuide } from "@/lib/data/guides";

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cls = getClass(id);
  const guide = getGuide(id);
  if (!cls || !guide) notFound();

  return (
    <div className="space-y-6">
      <Link href="/guide" className="text-sm text-gold-soft hover:underline">
        &larr; All guides
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gold">{cls.name} Guide</h1>
        <TierBadge tier={cls.tier} />
        <span className="text-xs uppercase tracking-wide text-foreground/50">{cls.role}</span>
      </div>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-2">Playstyle</h2>
        <p className="text-sm text-foreground/80">{guide.playstyle}</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-gold-soft mb-2">Leveling Route</h2>
          <p className="text-sm text-foreground/80">{guide.levelingRoute}</p>
        </Card>

        <Card>
          <h2 className="font-semibold text-gold-soft mb-2">Stat Priority</h2>
          <ul className="space-y-1 text-sm">
            {guide.statPriority.map((s) => (
              <li key={s.stat} className="flex justify-between gap-3 border-b border-panel-2 py-1">
                <span className="font-medium text-foreground/90">{s.stat}</span>
                <span className="text-foreground/60 text-xs text-right">{s.note}</span>
              </li>
            ))}
          </ul>
          <h3 className="font-semibold text-gold-soft/90 mt-3 mb-1 text-sm">Suggested allocation</h3>
          <ul className="space-y-1 text-sm">
            {guide.statPoints.map((s) => (
              <li key={s.stat} className="flex justify-between gap-3 border-b border-panel-2 py-1">
                <span className="font-medium text-foreground/90">{s.stat}</span>
                <span className="font-mono text-gold-soft text-xs">{s.amount}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Skill Progression</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {(["early", "mid", "late"] as const).map((stage) => (
            <div key={stage} className="rounded-lg border border-panel-2 p-3">
              <p className="text-xs uppercase tracking-wide text-gold-soft/80">{stage}</p>
              <p className="text-sm text-foreground/80 mt-1">{guide.skillProgression[stage]}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Skill Order</h2>
        <ul className="divide-y divide-panel-2 text-sm">
          {guide.skillOrder.map((s, i) => (
            <li key={i} className="flex items-center justify-between gap-3 py-1.5">
              <span className="flex items-center gap-2">
                <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-panel-2 text-gold-soft">
                  {s.stage}
                </span>
                <span className="font-medium text-foreground/90">{s.skill}</span>
              </span>
              <span className="text-foreground/60 text-xs text-right">{s.note}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Gear Suggestions</h2>
        <ul className="space-y-2 text-sm">
          {guide.gear.map((g) => (
            <li key={g.stage} className="flex gap-3 border-b border-panel-2 pb-2">
              <span className="text-gold-soft font-medium w-16 shrink-0">{g.stage}</span>
              <span className="text-foreground/80">{g.suggestion}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Notable Builds</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {guide.builds.map((b) => (
            <div key={b.name} className="rounded-lg border border-panel-2 p-3">
              <p className="font-medium text-foreground/90">{b.name}</p>
              <p className="text-sm text-foreground/65 mt-1">{b.summary}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Link
          href={`/database/classes/${cls.id}`}
          className="px-4 py-2 rounded-md border border-panel-2 text-sm font-semibold hover:border-gold"
        >
          Class Data
        </Link>
        <Link
          href="/builder"
          className="px-4 py-2 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
        >
          Plan Build
        </Link>
      </div>
    </div>
  );
}
