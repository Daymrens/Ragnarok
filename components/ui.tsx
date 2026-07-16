import { ReactNode } from "react";

export function Card({
  children,
  className = "",
  modern = false,
}: {
  children: ReactNode;
  className?: string;
  modern?: boolean;
}) {
  return (
    <div
      className={`${modern ? "card-modern" : "surface"} rounded-xl p-4 ${className}`}
    >
      {children}
    </div>
  );
}

/** Modern gradient-bordered surface for sections/panels. */
export function Surface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card-modern p-4 ${className}`}>{children}</div>;
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`ornament mb-4 ${className}`}>
      <span className="gradient-text font-display text-lg font-semibold tracking-wide">
        {children}
      </span>
    </div>
  );
}

/** Gradient hero/emphasis text. */
export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`gradient-text ${className}`}>{children}</span>;
}

/** Segmented/pill filter button. */
export function Pill({
  active,
  children,
  onClick,
  className = "",
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button type="button" data-active={active ? "true" : "false"} onClick={onClick} className={`pill ${className}`}>
      {children}
    </button>
  );
}

/** Consistent page heading used across tools. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">{eyebrow}</p>
      )}
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ember">
        {title}
      </h1>
      {description && (
        <p className="text-foreground/70 text-sm max-w-2xl">{description}</p>
      )}
      {children}
    </div>
  );
}

/** Small stat block for hero / overview cards. */
export function Stat({
  value,
  label,
  children,
}: {
  value: ReactNode;
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="surface rounded-xl p-4 text-center hover-lift">
      <p className="font-display text-3xl sm:text-4xl font-bold text-ember">{value}</p>
      <p className="text-sm text-foreground/70 mt-1">{label}</p>
      {children}
    </div>
  );
}

const chipColor: Record<string, string> = {
  gold: "border-gold/40 bg-gold/10 text-gold-deep",
  sage: "border-sage/40 bg-sage/10 text-sage",
  sky: "border-sky/40 bg-sky/10 text-sky",
  violet: "border-violet/40 bg-violet/10 text-violet",
  crimson: "border-crimson/40 bg-crimson/10 text-crimson",
  neutral: "border-panel-2 bg-panel-2 text-foreground/70",
};

export function Chip({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof chipColor;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${chipColor[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Compact header for data-list pages (Bestiary, Cards, Gear, etc.). */
export function ListHeader({
  title,
  description,
}: {
  title: string;
  description?: ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gold">{title}</h1>
      {description && (
        <p className="text-foreground/70 text-sm mt-1">{description}</p>
      )}
    </div>
  );
}

const tierColors: Record<string, string> = {
  S: "bg-crimson text-white",
  A: "bg-gold text-midnight",
  B: "bg-sage text-midnight",
  C: "bg-sky text-midnight",
  D: "bg-violet text-white",
};

export function TierBadge({ tier }: { tier: string }) {
  const color = tierColors[tier.toUpperCase()] ?? "bg-panel-2 text-foreground";
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${color}`}
    >
      {tier.toUpperCase()}
    </span>
  );
}

export function ElementBadge({ element }: { element: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gold/30 bg-ocean/40 px-2 py-0.5 text-xs text-gold-soft">
      {element}
    </span>
  );
}

/** Compact label for where a piece of reference data originated. */
export function dataSource(id: string): "RoworldDB" | "Curated" {
  return id.startsWith("rw_") ? "RoworldDB" : "Curated";
}

export function SourceBadge({ id }: { id: string }) {
  const src = dataSource(id);
  const tone: keyof typeof chipColor =
    src === "RoworldDB" ? "sky" : "neutral";
  return (
    <Chip tone={tone} className="font-mono">
      {src}
    </Chip>
  );
}
