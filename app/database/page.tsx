import Link from "next/link";
import { Card, SectionTitle } from "@/components/ui";
import { classes } from "@/lib/data/classes";
import { mvps } from "@/lib/data/mvps";
import { monsters } from "@/lib/data/monsters";
import { cards } from "@/lib/data/cards";
import { gear } from "@/lib/data/gear";
import { pets } from "@/lib/data/pets";
import { getActiveCodes } from "@/lib/data/codes";

const items = [
  { href: "/database/classes", title: "Classes", sub: `${classes.length} playable classes` },
  { href: "/database/monsters", title: "Monsters", sub: `${monsters.length} bestiary entries` },
  { href: "/database/mvps", title: "MVPs", sub: `${mvps.length} boss entries` },
  { href: "/database/cards", title: "Cards", sub: `${cards.length} equipment cards` },
  { href: "/database/gear", title: "Gear", sub: `${gear.length} equipment pieces` },
  { href: "/database/pets", title: "Pets & Mounts", sub: `${pets.length} tames & mounts` },
  { href: "/database/codes", title: "Redeem Codes", sub: `${getActiveCodes().length} active codes` },
  { href: "/world", title: "World Regions", sub: "Monsters & exploration by region" },
  { href: "/planner", title: "Class Planner", sub: "Compare all 8 classes" },
  { href: "/leveling", title: "Leveling Routes", sub: "Best zones by level" },
];

export default function DatabasePage() {
  return (
    <div className="space-y-6">
      <div>
        <SectionTitle>Database</SectionTitle>
        <p className="text-foreground/70 text-sm mt-1">
          Reference for classes, monsters, MVPs, cards, gear, pets, and redeem codes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link key={it.href} href={it.href}>
            <Card className="hover:border-gold transition-colors h-full">
              <h2 className="text-lg font-semibold text-gold-soft">{it.title}</h2>
              <p className="text-foreground/70 text-sm mt-1">{it.sub}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
