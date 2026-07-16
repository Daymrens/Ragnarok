"use client";

import { useEffect, useMemo, useState } from "react";
import { getActiveEvents } from "@/lib/data/events";

const RESET_HOUR = 5; // server reset 5:00 AM
const CHECK_KEY = "ragnasys.daily.checklist";

const CHECKLIST = [
  { id: "tc", label: "Time Corridor ×3 cleared" },
  { id: "guild", label: "Guild Orders completed" },
  { id: "life", label: "Life Stamina spent (mining/gathering)" },
  { id: "stall", label: "Player stalls checked for deals" },
  { id: "codes", label: "Gift codes redeemed" },
  { id: "couple", label: "Couple / home daily rewards collected" },
];

function fmt(ms: number): string {
  if (ms <= 0) return "ended";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${sec}s`;
  return `${m}m ${sec}s`;
}

export function DailyTracker() {
  const [now, setNow] = useState<number>(() => Date.now());
  const [checks, setChecks] = useState<Record<string, boolean>>(() =>
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem(CHECK_KEY) || "{}") : {}
  );

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  function toggle(id: string) {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    localStorage.setItem(CHECK_KEY, JSON.stringify(next));
  }

  // time until next 5:00 AM reset
  const reset = useMemo(() => {
    const d = new Date(now);
    d.setHours(RESET_HOUR, 0, 0, 0);
    if (d.getTime() <= now) d.setDate(d.getDate() + 1);
    return d.getTime() - now;
  }, [now]);

  const active = getActiveEvents(now);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Daily & Events</h1>
        <p className="text-foreground/70 text-sm mt-1">
          Server reset at 5:00 AM. Track your daily routine and active launch events.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-panel-2 bg-panel p-4">
          <h2 className="font-semibold text-gold-soft">Next server reset</h2>
          <p className="text-3xl font-mono text-gold mt-2">{fmt(reset)}</p>
        </div>
        <div className="rounded-xl border border-panel-2 bg-panel p-4">
          <h2 className="font-semibold text-gold-soft mb-2">Daily checklist</h2>
          <ul className="space-y-1.5">
            {CHECKLIST.map((c) => (
              <li key={c.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!checks[c.id]}
                  onChange={() => toggle(c.id)}
                  className="accent-gold"
                />
                <span className={checks[c.id] ? "text-foreground/40 line-through" : "text-foreground/80"}>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-gold-soft mb-3">Active events</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {active.map((e) => {
            const end = new Date(e.end).getTime();
            const remain = end - now;
            return (
              <div key={e.id} className="rounded-xl border border-panel-2 bg-panel p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gold-soft">{e.name}</h3>
                  <span className="text-xs uppercase text-foreground/50">{e.type}</span>
                </div>
                <p className="text-sm text-foreground/75 mt-1">{e.rewards}</p>
                <p className="text-xs text-foreground/50 mt-1">
                  Ends in {fmt(remain)} · {e.end}
                </p>
              </div>
            );
          })}
          {active.length === 0 && (
            <p className="text-sm text-foreground/50">No active events.</p>
          )}
        </div>
      </div>
    </div>
  );
}
