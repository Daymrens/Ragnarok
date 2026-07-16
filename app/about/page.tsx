import { Card, SectionTitle } from "@/components/ui";
import Link from "next/link";

const FAQ = [
  {
    q: "Is RagnaSys official?",
    a: "No. RagnaSys is a fan-made companion tool. It is not affiliated with, endorsed by, or connected to Gravity Co., Ltd. or Gravity Game Vision. Ragnarok: The New World and all related names, art, and assets are property of their respective owners.",
  },
  {
    q: "Where does the data come from?",
    a: "All game data is hand-authored in static modules (lib/data/*.ts) from classic RO baselines and launch coverage. Most monster HP/levels, MVP respawn windows, and zone routes are flagged as estimates (est.) until verified in-game. Always confirm in-game.",
  },
  {
    q: "Does this app interact with the game?",
    a: "No. RagnaSys is a passive reference, timer, and calculator. It does not read game memory, automate input, connect to game servers, or interact with the Ragnarok client in any way. Timers and saved builds live only in your browser's localStorage.",
  },
  {
    q: "Is my data shared?",
    a: "No. There is no backend and no accounts. Everything you check off or save stays on your device. Clearing site data resets it.",
  },
  {
    q: "The scraper returned nothing — why?",
    a: "The community wiki is JavaScript-rendered, so npm run scrape may produce empty output. The generated JSON (lib/data/generated/) is a best-effort refresh aid only; curated data remains the source of truth. Merge is safe: it appends generated rows that don't already exist.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <SectionTitle>About & FAQ</SectionTitle>
        <p className="text-foreground/70 text-sm mt-1">
          RagnaSys — a free companion toolkit for Ragnarok: The New World.
        </p>
      </div>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-2">Disclaimer</h2>
        <p className="text-sm text-foreground/75">
          Fan-made, not affiliated with Gravity. Game data is community-sourced and may be
          inaccurate — verify in-game. Launch: SEA July 16, 2026.
        </p>
      </Card>

      <div className="space-y-3">
        {FAQ.map((f) => (
          <Card key={f.q}>
            <h3 className="font-semibold text-gold-soft">{f.q}</h3>
            <p className="text-sm text-foreground/75 mt-1">{f.a}</p>
          </Card>
        ))}
      </div>

      <p className="text-sm text-foreground/60">
        Back to the <Link href="/" className="text-gold-soft hover:underline">home page</Link>.
      </p>
    </div>
  );
}
