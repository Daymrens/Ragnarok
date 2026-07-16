import { Element, Race } from "@/lib/data/types";

const ELEMENT_HEX: Record<Element, string> = {
  Neutral: "#b9b2a3",
  Fire: "#e6734b",
  Water: "#4a9fd6",
  Wind: "#7fd1a3",
  Earth: "#c9a15a",
  Holy: "#f2d98a",
  Shadow: "#8a6fc4",
  Ghost: "#9fb6c9",
  Poison: "#8fbf5a",
  Undead: "#b06b8f",
};

const RACE_GLYPH: Record<Race, string> = {
  Formless: "M50 28 C36 28 30 42 34 56 C38 70 62 70 66 56 C70 42 64 28 50 28 Z",
  Undead: "M50 26 L58 40 L54 44 L60 56 L54 60 L50 52 L46 60 L40 56 L46 44 L42 40 Z",
  Brute: "M30 50 L44 38 L56 38 L70 50 L62 64 L38 64 Z",
  Plant: "M50 70 L50 40 M50 50 L36 40 M50 44 L64 34 M50 40 L40 28 M50 40 L60 28",
  Insect: "M50 30 L50 70 M50 40 L34 32 M50 40 L66 32 M50 56 L36 64 M50 56 L64 64",
  Fish: "M28 50 C40 34 60 34 72 50 C60 66 40 66 28 50 Z M28 50 L18 42 L18 58 Z",
  Demon: "M50 24 L58 44 L78 44 L62 58 L68 78 L50 66 L32 78 L38 58 L22 44 L42 44 Z",
  Human: "M50 26 C42 26 40 36 44 42 C40 48 40 60 44 70 L56 70 C60 60 60 48 56 42 C60 36 58 26 50 26 Z",
  Angel: "M50 30 C44 38 40 44 44 52 C30 48 24 58 30 66 C40 62 46 66 50 72 C54 66 60 62 70 66 C76 58 70 48 56 52 C60 44 56 38 50 30 Z",
  Dragon: "M24 56 C36 44 48 44 50 52 C52 44 64 44 76 56 C70 58 66 62 68 68 C58 60 42 60 32 68 C34 62 30 58 24 56 Z",
};

const RACE_LABEL: Record<Race, string> = {
  Formless: "Formless",
  Undead: "Undead",
  Brute: "Brute",
  Plant: "Plant",
  Insect: "Insect",
  Fish: "Fish",
  Demon: "Demon",
  Human: "Human",
  Angel: "Angel",
  Dragon: "Dragon",
};

export function MonsterPortrait({
  name,
  element,
  race,
  image,
  size = 64,
  className = "",
}: {
  name: string;
  element: Element;
  race: Race;
  image?: string;
  size?: number;
  className?: string;
}) {
  const hex = ELEMENT_HEX[element] ?? "#b9b2a3";
  const glyph = RACE_GLYPH[race] ?? RACE_GLYPH.Formless;
  const gid = `mg-${race}-${element}`.replace(/[^a-z0-9]/gi, "");

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border border-gold-deep/30 bg-gradient-to-b from-ocean/60 to-panel ${className}`}
      style={{ width: size, height: size }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      ) : (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-label={`${name} sigil`}>
          <defs>
            <radialGradient id={gid} cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor={hex} stopOpacity="0.95" />
              <stop offset="100%" stopColor={hex} stopOpacity="0.25" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill={`url(#${gid})`} opacity="0.35" />
          <path
            d={glyph}
            fill="none"
            stroke={hex}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="50"
            y="92"
            textAnchor="middle"
            fontSize="9"
            fill="rgba(154,115,67,0.8)"
            fontFamily="Georgia, serif"
          >
            {RACE_LABEL[race]}
          </text>
        </svg>
      )}
    </div>
  );
}
