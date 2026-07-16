import { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface rounded-xl p-4 ${className}`}>{children}</div>
  );
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
      <span className="text-ember font-display text-lg font-semibold tracking-wide">
        {children}
      </span>
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
