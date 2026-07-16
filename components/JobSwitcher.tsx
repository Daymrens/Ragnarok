"use client";

import type { RosterState, RosterCharacter, JobPreset } from "@/lib/buildStore";
import { classes } from "@/lib/data/classes";

export function JobSwitcher({
  roster,
  activeCharId,
  activeJob,
  onSelectPreset,
  onAddPreset,
}: {
  roster: RosterState;
  activeCharId: string | null;
  activeJob: string | null;
  onSelectPreset: (charId: string, preset: JobPreset) => void;
  onAddPreset: () => void;
}) {
  const character =
    roster.characters.find((c) => c.id === activeCharId) ?? roster.characters[0] ?? null;

  if (!character) {
    return (
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/60">No saved presets yet.</p>
        <button
          onClick={onAddPreset}
          className="px-3 py-1.5 rounded-md btn-gold text-sm font-semibold"
        >
          Save current as preset
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {roster.characters.map((c) => (
          <button
            key={c.id}
            data-active={c.id === character.id}
            onClick={() => onSelectPreset(c.id, c.presets[0])}
            className="pill"
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {character.presets.map((p) => {
          const cls = classes.find((c) => c.id === p.job);
          return (
            <button
              key={`${character.id}-${p.job}`}
              data-active={character.id === activeCharId && p.job === activeJob}
              onClick={() => onSelectPreset(character.id, p)}
              className="pill"
            >
              {cls?.name ?? p.job}
              <span className="opacity-60">· {p.name}</span>
            </button>
          );
        })}
        <button
          onClick={onAddPreset}
          className="text-xs px-3 py-1.5 rounded-full border border-gold/40 text-gold-deep hover:bg-gold/10"
        >
          + Save current
        </button>
      </div>
    </div>
  );
}

export type { RosterCharacter };
