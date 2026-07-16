"use client";

import { useEffect, useMemo, useState } from "react";
import { getActiveEvents } from "@/lib/data/events";
import { ListHeader } from "@/components/ui";

const RESET_HOUR = 5; // server reset 5:00 AM
const CHECK_KEY = "ragnasys.daily.checklist";

// Ordered by recommended priority (stamina/reward efficiency). Source: classic RO
// daily-loop guidance + ROW launch coverage; tune as the meta settles.
const CHECKLIST = [
  { id: "tc", label: "Time Corridor ×3 cleared", hint: "Highest exp/stamina — do first", priority: 1 },
  { id: "guild", label: "Guild Orders completed", hint: "Join a guild by day 2; orders reset daily", priority: 2 },
  { id: "mvp", label: "MVP hunt (post-reset window)", hint: "Best loot right after 5 AM reset", priority: 3 },
  { id: "life", label: "Life Stamina spent (mining/gathering)", hint: "Feeds crafting + auction economy", priority: 4 },
  { id: "codes", label: "Gift codes redeemed", hint: "Free Zeny/items, often time-limited", priority: 5 },
  { id: "stall", label: "Player stalls checked for deals", hint: "Flip gear/cards for profit", priority: 6 },
  { id: "couple", label: "Couple / home daily rewards", hint: "Steady passive income if partnered", priority: 7 },
];
const ORDERED = [...CHECKLIST].sort((a, b) => a.priority - b.priority);

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
      <ListHeader
        title="Daily & Events"
        description="Server reset at 5:00 AM. Track your daily routine and active launch events."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-modern p-4">
          <h2 className="font-semibold text-gold-soft">Next server reset</h2>
          <p className="text-3xl font-mono text-gold mt-2">{fmt(reset)}</p>
          <p className="text-xs text-foreground/50 mt-1">Routine resets at 5:00 AM.</p>
        </div>
        <div className="card-modern p-4">
          <h2 className="font-semibold text-gold-soft mb-2">Daily routine (priority order)</h2>
          <ul className="space-y-2">
            {ORDERED.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!checks[c.id]}
                  onChange={() => toggle(c.id)}
                  className="accent-gold mt-0.5"
                />
                <span className="min-w-0">
                  <span className={checks[c.id] ? "text-foreground/40 line-through" : "text-foreground/80"}>
                    <span className="text-gold-deep/70 font-mono mr-1">{c.priority}.</span>
                    {c.label}
                  </span>
                  {!checks[c.id] && c.hint && (
                    <span className="block text-xs text-foreground/50">{c.hint}</span>
                  )}
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
              <div key={e.id} className="card-modern p-4">
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
