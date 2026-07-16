import Link from "next/link";
import { Card, TierBadge } from "@/components/ui";
import { classes } from "@/lib/data/classes";

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Classes</h1>
        <p className="text-foreground/70 text-sm mt-1">
          All {classes.length} launch classes. Job Freedom lets you switch freely on one character.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <Link key={c.id} href={`/database/classes/${c.id}`}>
            <Card className="hover:border-gold transition-colors h-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gold-soft">{c.name}</h2>
                <TierBadge tier={c.tier} />
              </div>
              <p className="text-xs uppercase tracking-wide text-foreground/50 mt-1">{c.role}</p>
              <p className="text-sm text-foreground/75 mt-2">{c.blurb}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
