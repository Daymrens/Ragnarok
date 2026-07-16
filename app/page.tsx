import Link from "next/link";
import { Card, Stat, PageHeader, Chip, GradientText } from "@/components/ui";
import { LiveCodeBadge } from "@/components/LiveCodeBadge";
import { classes } from "@/lib/data/classes";
import { monsters } from "@/lib/data/monsters";

const tools = [
  { href: "/mvp", title: "MVP Timer", desc: "Track boss respawn windows.", tone: "crimson" as const },
  { href: "/builder", title: "Build Calculator", desc: "Stats, gear & refine planning.", tone: "gold" as const },
  { href: "/guide", title: "Class Guides", desc: "Roles, skills & leveling.", tone: "sky" as const },
  { href: "/daily", title: "Daily & Events", desc: "Optimize your routine.", tone: "sage" as const },
  { href: "/crafting", title: "Crafting", desc: "Life skills & refinement.", tone: "violet" as const },
  { href: "/map", title: "Chest Map", desc: "Exploration & treasures.", tone: "gold" as const },
  { href: "/planner", title: "Class Planner", desc: "Compare all 8 classes.", tone: "sky" as const },
  { href: "/world", title: "World Regions", desc: "Monsters by region.", tone: "sage" as const },
  { href: "/leveling", title: "Leveling", desc: "Best zones by level.", tone: "violet" as const },
  { href: "/strategy", title: "Strategy", desc: "Elements & matchups.", tone: "crimson" as const },
  { href: "/database/pets", title: "Pets & Mounts", desc: "Tames & rides.", tone: "gold" as const },
  { href: "/database/codes", title: "Redeem Codes", desc: "Live active codes.", tone: "sage" as const },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative text-center py-14 sm:py-20 overflow-hidden">
        <div className="glow left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-gold/40" />
        <div className="glow left-1/4 bottom-0 h-48 w-48 bg-royal/30" />
        <div className="relative animate-rise">
          <div className="ornament mb-5 justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-deep">
              Ragnarok · The New World
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold gradient-text drop-shadow-[0_2px_10px_rgba(170,112,51,0.25)]">
            RagnaSys
          </h1>
          <p className="text-foreground/75 mt-3 max-w-2xl mx-auto text-base">
            A companion toolkit for{" "}
            <GradientText className="font-semibold">Ragnarok: The New World</GradientText> —
            browse class data, track MVP respawns, calculate builds, hunt chests, and follow guides.
          </p>
          <div className="flex justify-center gap-3 mt-7 flex-wrap">
            <Link href="/mvp" className="btn-gold px-5 py-2.5 rounded-lg font-semibold">
              MVP Timer
            </Link>
            <Link href="/guide" className="btn-ghost px-5 py-2.5 rounded-lg font-semibold">
              Class Guides
            </Link>
            <Link href="/builder" className="btn-ghost px-5 py-2.5 rounded-lg font-semibold">
              Build Calculator
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/database/classes" className="block">
          <Stat value={classes.length} label="Classes" />
        </Link>
        <Link href="/database/monsters" className="block">
          <Stat value={monsters.length} label="Monsters" />
        </Link>
        <Link href="/database/codes" className="block">
          <Stat value={<LiveCodeBadge fallback={8} />} label="Active codes" />
        </Link>
        <Link href="/builder" className="block">
          <Stat value={193} label="ASPD cap" />
        </Link>
      </section>

      <section>
        <PageHeader eyebrow="Tools" title="Everything in one place" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="block">
              <Card modern className="h-full">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-gold-deep">
                    {t.title}
                  </h3>
                  <Chip tone={t.tone}>open</Chip>
                </div>
                <p className="text-sm text-foreground/70 mt-1">{t.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
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
