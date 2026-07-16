import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, ElementBadge } from "@/components/ui";
import { getMVP } from "@/lib/data/mvps";
import { elementMultiplier, ELEMENTS } from "@/lib/data/elements";

const ELEMENT_HEX: Record<string, string> = {
  Neutral: "#b9b2a3", Fire: "#e6734b", Water: "#4a9fd6", Wind: "#7fd1a3",
  Earth: "#c9a15a", Holy: "#f2d98a", Shadow: "#8a6fc4", Ghost: "#9fb6c9",
  Poison: "#8fbf5a", Undead: "#b06b8f",
};

export default async function MvpDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = getMVP(id);
  if (!m) notFound();

  const strong = ELEMENTS.filter((e) => elementMultiplier(e, m.element) > 1).slice(0, 3);
  const hex = ELEMENT_HEX[m.element] ?? "#b9b2a3";
  const gid = `mvp-${m.element}`.replace(/[^a-z0-9]/gi, "");

  return (
    <div className="space-y-6">
      <Link href="/database/mvps" className="text-sm text-gold-soft hover:underline">
        &larr; MVPs
      </Link>

      <div className="flex items-center gap-4">
        <div
          className="relative shrink-0 overflow-hidden rounded-lg border border-gold-deep/30 shadow-md"
          style={{ width: 88, height: 88 }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <radialGradient id={gid} cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor={hex} stopOpacity="0.95" />
                <stop offset="100%" stopColor={hex} stopOpacity="0.25" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill={`url(#${gid})`} opacity="0.4" />
            <path
              d="M50 22 L60 42 L82 44 L65 60 L71 82 L50 70 L29 82 L35 60 L18 44 L40 42 Z"
              fill="none"
              stroke={hex}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gold">{m.name}</h1>
          <div className="mt-2">
            <ElementBadge element={m.element} />
          </div>
        </div>
      </div>

      {m.role && <p className="text-sm text-foreground/75">{m.role}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Details</h2>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">Level</span>
              <span className="font-mono">{m.level}</span>
            </li>
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">Map</span>
              <span>{m.map}</span>
            </li>
            <li className="flex justify-between border-b border-panel-2 py-1">
              <span className="text-foreground/60">Respawn</span>
              <span className="font-mono">
                {m.respawnMin === m.respawnMax ? `${m.respawnMin}m` : `${m.respawnMin}–${m.respawnMax}m`}
                {m.estimate && <span className="text-crimson"> (est.)</span>}
              </span>
            </li>
          </ul>
          {m.estimate && <p className="text-xs text-crimson/80 mt-2">Respawn is an estimate.</p>}
        </Card>

        <Card>
          <h2 className="font-semibold text-gold-soft mb-3">Drops</h2>
          {m.drops.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {m.drops.map((d) => (
                <li key={d} className="rounded-md bg-panel-2 px-2 py-1 text-sm">
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-foreground/50">No drops recorded.</p>
          )}

          <h2 className="font-semibold text-gold-soft mt-4 mb-2">Elemental weakness</h2>
          <p className="text-xs text-foreground/60">
            Strong vs {m.element}: {strong.length ? strong.join(", ") : "none"}.
          </p>
          {m.party && (
            <p className="text-xs text-foreground/60 mt-2">
              <span className="text-gold-soft">Party:</span> {m.party}
            </p>
          )}
        </Card>
      </div>

      <div className="flex gap-3">
        <Link
          href="/mvp"
          className="px-4 py-2 rounded-md btn-gold text-sm font-semibold"
        >
          Track on MVP Timer
        </Link>
        <Link
          href="/strategy"
          className="px-4 py-2 rounded-md btn-ghost text-sm font-semibold"
        >
          Element chart
        </Link>
      </div>
    </div>
  );
}
