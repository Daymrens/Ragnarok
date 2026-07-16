"use client";

import { useEffect, useState } from "react";

interface CodeRow {
  code: string;
  rewards: string;
  active: boolean;
}

interface ApiResponse {
  live: boolean;
  fetchedAt: string;
  codes: CodeRow[];
}

const FALLBACK: CodeRow[] = [
  { code: "ROW0716", rewards: "Launch bundle — Zeny & consumables", active: true },
  { code: "ROW666", rewards: "20,000 Adventure Coin, Kafra Blind Box, Common Hair Dye", active: true },
  { code: "ROW777", rewards: "20,000 Adventure Coin, Kafra Blind Box, 5x Pet Food", active: true },
  { code: "ROW888", rewards: "20,000 Adventure Coin, Common Hair Dye, 5x Pet Food", active: true },
  { code: "ROWORLD", rewards: "20,000 Adventure Coin, 2x Hearty Dish, Common Hair Dye", active: true },
  { code: "ROWTOP1", rewards: "20,000 Adventure Coin, 2x Hearty Dish, 5x Pet Food", active: true },
  { code: "ROWMVP", rewards: "20,000 Adventure Coin, 10x Pet Food", active: true },
  { code: "BABYMONSTER", rewards: "BABYMONSTER collaboration costume + Monster Rookie title", active: true },
];

export function CodesList() {
  const [codes, setCodes] = useState<CodeRow[]>(FALLBACK);
  const [live, setLive] = useState<boolean | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/codes")
      .then((r) => r.json())
      .then((d: ApiResponse) => {
        if (cancelled) return;
        if (d.codes?.length) setCodes(d.codes);
        setLive(d.live);
      })
      .catch(() => setLive(false));
    return () => {
      cancelled = true;
    };
  }, []);

  function copy(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-foreground/50">
        {live === true
          ? "Live from community wiki · updates automatically."
          : "Showing cached list — live fetch unavailable."}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {codes.map((c) => (
          <div
            key={c.code}
            className={`rounded-xl border p-4 ${
              c.active ? "border-panel-2 bg-panel" : "border-panel-2 bg-panel/40 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-gold-soft">{c.code}</code>
              <button
                onClick={() => copy(c.code)}
                disabled={!c.active}
                className="text-xs px-2 py-1 rounded-md btn-gold font-semibold disabled:opacity-40"
              >
                {copied === c.code ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-sm text-foreground/75 mt-2">{c.rewards}</p>
            <p className="text-xs text-foreground/50 mt-1">
              {c.active ? "Active" : "Inactive"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
