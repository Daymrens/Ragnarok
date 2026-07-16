import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, TierBadge } from "@/components/ui";
import { getClass } from "@/lib/data/classes";
import { getGuide } from "@/lib/data/guides";

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cls = getClass(id);
  if (!cls) notFound();
  const guide = getGuide(cls.id);

  return (
    <div className="space-y-6">
      <Link href="/database/classes" className="text-sm text-gold-soft hover:underline">
        &larr; All classes
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gold">{cls.name}</h1>
        <TierBadge tier={cls.tier} />
        <span className="text-xs uppercase tracking-wide text-foreground/50">{cls.role}</span>
      </div>
      <p className="text-foreground/75">{cls.blurb}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Base Stats</h2>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {Object.entries(cls.baseStats).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-panel-2 py-1">
                <span className="text-foreground/60">{k}</span>
                <span className="font-mono">{v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Skills</h2>
          <ul className="space-y-2 text-sm">
            {cls.skills.map((s) => (
              <li key={s.name} className="border-b border-panel-2 pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-foreground/50">{s.type}</span>
                </div>
                <p className="text-foreground/65 text-xs mt-0.5">{s.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/guide/${cls.id}`}
          className="px-4 py-2 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
        >
          View Class Guide
        </Link>
        <Link
          href="/builder"
          className="px-4 py-2 rounded-md border border-panel-2 text-sm font-semibold hover:border-gold"
        >
          Open Build Calculator
        </Link>
      </div>

      {guide && (
        <Card>
          <h2 className="font-semibold text-gold-soft mb-2">Quick Notes</h2>
          <p className="text-sm text-foreground/75">{guide.playstyle}</p>
        </Card>
      )}
    </div>
  );
}
