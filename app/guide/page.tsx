import Link from "next/link";
import { Card, TierBadge } from "@/components/ui";
import { classes } from "@/lib/data/classes";
import { guides } from "@/lib/data/guides";

export default function GuideIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Class Guides</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Getting-started guides: leveling, stats, skill progression, gear, and builds. Job
          Freedom lets you try every class on one character.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => {
          const g = guides.find((x) => x.classId === c.id);
          return (
            <Link key={c.id} href={`/guide/${c.id}`}>
              <Card className="hover:border-gold transition-colors h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gold-soft">{c.name}</h2>
                  <TierBadge tier={c.tier} />
                </div>
                <p className="text-xs uppercase tracking-wide text-foreground/50 mt-1">{c.role}</p>
                <p className="text-sm text-foreground/75 mt-2 line-clamp-3">
                  {g?.playstyle ?? c.blurb}
                </p>
                {g && (
                  <p className="text-xs text-foreground/50 mt-2">
                    {g.builds.length} build{g.builds.length > 1 ? "s" : ""} covered
                  </p>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
