import Link from "next/link";
import { Card } from "@/components/ui";
import { classes } from "@/lib/data/classes";
import { getActiveCodes } from "@/lib/data/codes";
import { monsters } from "@/lib/data/monsters";

export default function HomePage() {
  const activeCodes = getActiveCodes();
  return (
    <div className="space-y-10">
      <section className="relative text-center py-12 sm:py-16">
        <div className="ornament mb-5 justify-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-deep">
            Ragnarok · The New World
          </span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-ember drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          RagnaSys
        </h1>
        <p className="text-foreground/75 mt-3 max-w-2xl mx-auto text-base">
          A companion toolkit for{" "}
          <span className="text-gold-soft font-semibold">Ragnarok: The New World</span> —
          browse class data, track MVP respawns, calculate builds, hunt chests, and follow guides.
        </p>
        <div className="flex justify-center gap-3 mt-7 flex-wrap">
          <Link href="/mvp" className="btn-gold px-5 py-2.5 rounded-md font-semibold">
            MVP Timer
          </Link>
          <Link href="/guide" className="btn-ghost px-5 py-2.5 rounded-md font-semibold">
            Class Guides
          </Link>
          <Link href="/builder" className="btn-ghost px-5 py-2.5 rounded-md font-semibold">
            Build Calculator
          </Link>
          <Link href="/map" className="btn-ghost px-5 py-2.5 rounded-md font-semibold">
            Chest Map
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/database/classes">
          <Card className="hover:border-gold/60 transition-colors h-full text-center">
            <p className="font-display text-4xl font-bold text-ember">{classes.length}</p>
            <p className="text-sm text-foreground/70 mt-1">Classes</p>
          </Card>
        </Link>
        <Link href="/database/monsters">
          <Card className="hover:border-gold/60 transition-colors h-full text-center">
            <p className="font-display text-4xl font-bold text-ember">{monsters.length}</p>
            <p className="text-sm text-foreground/70 mt-1">Monsters</p>
          </Card>
        </Link>
        <Link href="/database/codes">
          <Card className="hover:border-gold/60 transition-colors h-full text-center">
            <p className="font-display text-4xl font-bold text-ember">{activeCodes.length}</p>
            <p className="text-sm text-foreground/70 mt-1">Active codes</p>
          </Card>
        </Link>
        <Link href="/builder">
          <Card className="hover:border-gold/60 transition-colors h-full text-center">
            <p className="font-display text-4xl font-bold text-ember">193</p>
            <p className="text-sm text-foreground/70 mt-1">ASPD cap</p>
          </Card>
        </Link>
      </section>

      <section className="text-center text-sm text-foreground/50">
        <p>
          Fan-made tool, not affiliated with Gravity. Data is community-sourced and may be
          inaccurate — always verify in-game. Launch: SEA July 16, 2026.
        </p>
      </section>
    </div>
  );
}
