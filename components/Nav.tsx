"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primary = [
  { href: "/", label: "Home" },
  { href: "/database", label: "Database" },
  { href: "/mvp", label: "MVP Timer" },
  { href: "/builder", label: "Build Calc" },
  { href: "/guide", label: "Class Guide" },
];

const more = [
  { href: "/daily", label: "Daily & Events" },
  { href: "/strategy", label: "Strategy" },
  { href: "/crafting", label: "Crafting" },
  { href: "/map", label: "Chest Map" },
  { href: "/leveling", label: "Leveling" },
  { href: "/database/pets", label: "Pets & Mounts" },
  { href: "/guide/player", label: "Player Guide" },
];

function Crest() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="24">
          <stop offset="0" stopColor="#fce7a8" />
          <stop offset="0.5" stopColor="#f1c84b" />
          <stop offset="1" stopColor="#c79a32" />
        </linearGradient>
      </defs>
      <path
        d="M12 2 L20 5 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V5 Z"
        stroke="url(#cg)"
        strokeWidth="1.4"
        fill="rgba(241,200,75,0.08)"
      />
      <path d="M12 6 L12 18 M8.5 9.5 L12 7 L15.5 9.5" stroke="url(#cg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gold-deep/25 bg-background/80 backdrop-blur-md shadow-[0_4px_18px_rgba(92,64,24,0.12)]">
      <nav className="w-full max-w-6xl mx-auto px-4 h-16 flex items-center gap-1">
        <Link href="/" className="mr-3 flex items-center gap-2 shrink-0 group">
          <Crest />
          <span className="font-display text-xl font-bold tracking-wide text-gold-deep group-hover:brightness-110 transition">
            RagnaSys
          </span>
        </Link>
        <ul className="flex items-center gap-1 overflow-x-auto">
          {primary.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                  isActive(l.href)
                    ? "bg-gradient-to-b from-gold-soft/30 to-gold/10 text-gold-deep font-semibold shadow-[inset_0_0_0_1px_rgba(170,112,51,0.4)]"
                    : "text-foreground/75 hover:text-gold-deep hover:bg-ocean/60"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${
                more.some((m) => isActive(m.href))
                  ? "bg-gradient-to-b from-gold-soft/30 to-gold/10 text-gold-deep font-semibold shadow-[inset_0_0_0_1px_rgba(170,112,51,0.4)]"
                  : "text-foreground/75 hover:text-gold-deep hover:bg-ocean/60"
              }`}
            >
              More ▾
            </button>
            {open && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />
                <ul className="surface absolute right-0 mt-1 z-50 w-48 rounded-lg p-1">
                  {more.map((m) => (
                    <li key={m.href}>
                      <Link
                        href={m.href}
                        onClick={() => setOpen(false)}
                        className={`block px-3 py-2 text-sm rounded-md hover:bg-ocean/70 ${
                          isActive(m.href)
                            ? "text-gold-deep font-semibold"
                            : "text-foreground/80"
                        }`}
                      >
                        {m.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
