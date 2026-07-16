import { playerGuide } from "@/lib/data/playerGuide";
import { Card } from "@/components/ui";
import Link from "next/link";

export default function PlayerGuidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Player Guide</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Core systems every adventurer should know — stats, skills, stamina, economy, and more.
        </p>
      </div>

      <div className="space-y-4">
        {playerGuide.map((s) => (
          <Card key={s.id}>
            <h2 className="font-semibold text-gold-soft mb-2">{s.title}</h2>
            <p className="text-sm text-foreground/80 whitespace-pre-line">{s.body}</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          href="/guide"
          className="px-4 py-2 rounded-md border border-panel-2 text-sm font-semibold hover:border-gold"
        >
          Class Guides
        </Link>
        <Link
          href="/daily"
          className="px-4 py-2 rounded-md border border-panel-2 text-sm font-semibold hover:border-gold"
        >
          Daily & Events
        </Link>
      </div>
    </div>
  );
}
