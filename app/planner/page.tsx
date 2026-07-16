import { classes } from "@/lib/data/classes";
import { Card, SectionTitle, TierBadge } from "@/components/ui";
import Link from "next/link";

// Job Freedom lets one character switch between all eight classes. This map adds
// launch-viability notes so players can plan when to switch jobs. Estimates from
// CBT/launch coverage — flagged accordingly.
const VIABILITY: Record<string, { f2p: "High" | "Medium" | "Low"; switch: string }> = {
  swordman: { f2p: "High", switch: "Use early for tanking MVPs; switch out for pure farming." },
  mage: { f2p: "High", switch: "Best opener — fastest leveling. Keep for AoE farm." },
  archer: { f2p: "High", switch: "Safe solo farmer; switch to Hunter for ADL endgame." },
  acolyte: { f2p: "High", switch: "Party essential — switch in for MVP groups, out for solo." },
  thief: { f2p: "Medium", switch: "PvP burst; switch for dungeon farming." },
  gunslinger: { f2p: "High", switch: "Early MVP king — switch in for boss windows." },
  bard: { f2p: "Medium", switch: "Buffer for parties; switch in for guild content." },
  druid: { f2p: "Medium", switch: "Provisional A-tier hybrid; test before committing refine." },
};

const ROLE_COLOR: Record<string, string> = {
  Melee: "bg-crimson/15 text-crimson",
  Ranged: "bg-sky/15 text-sky",
  Magic: "bg-violet/15 text-violet",
  Support: "bg-sage/15 text-sage",
  Hybrid: "bg-gold/15 text-gold-deep",
};

export default function PlannerPage() {
  const ordered = [...classes].sort((a, b) => "SABC".indexOf(a.tier) - "SABC".indexOf(b.tier));
  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Class Switch Planner</SectionTitle>
        <p className="text-foreground/70 text-sm mt-1">
          Job Freedom lets one character switch between all eight classes. Compare tiers, roles,
          and F2P viability to plan your job rotations. Notes are launch estimates.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ordered.map((c) => {
          const v = VIABILITY[c.id] ?? { f2p: "Medium" as const, switch: "" };
          return (
            <Card key={c.id} className="h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gold-soft">{c.name}</h2>
                <TierBadge tier={c.tier} />
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full mt-2 self-start ${
                  ROLE_COLOR[c.role] ?? "bg-panel-2 text-foreground/70"
                }`}
              >
                {c.role}
              </span>
              <p className="text-xs text-foreground/60 mt-2">F2P: {v.f2p}</p>
              <p className="text-sm text-foreground/75 mt-1 flex-1">{c.blurb}</p>
              {v.switch && <p className="text-xs text-gold-soft/80 mt-2">{v.switch}</p>}
              <Link
                href={`/guide/${c.id}`}
                className="text-xs text-gold-soft hover:underline mt-2"
              >
                View guide →
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
