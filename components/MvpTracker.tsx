"use client";

import { useEffect, useMemo, useState } from "react";
import { mvps } from "@/lib/data/mvps";

interface KillRecord {
  killedAt: number; // epoch ms
  spawnAt: number; // epoch ms
}

const STORAGE_KEY = "ragnasys.mvp.kills";
const ALARM_LEAD_MS = 60_000; // notify 1 min before spawn

function loadKills(): Record<string, KillRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function pickSpawnDelay(min: number, max: number): number {
  const m = Math.max(min, max); // use max as the fixed respawn when min==max
  if (min === max) return m * 60_000;
  const r = Math.random() * (max - min) + min;
  return r * 60_000;
}

function fmt(ms: number): string {
  if (ms <= 0) return "spawning now";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

export function MvpTracker() {
  const [kills, setKills] = useState<Record<string, KillRecord>>(() =>
    typeof window !== "undefined" ? loadKills() : {}
  );
  const [now, setNow] = useState<number>(() => Date.now());
  const [alarmOn, setAlarmOn] = useState(false);
  const [notified, setNotified] = useState<Record<string, boolean>>({});

  // tick every second
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // request notification permission
  function enableAlarms() {
    if (!("Notification" in window)) return;
    Notification.requestPermission().then((p) => setAlarmOn(p === "granted"));
  }

  useEffect(() => {
    if (!alarmOn) return;
    Object.entries(kills).forEach(([id, rec]) => {
      const remaining = rec.spawnAt - now;
      if (remaining > 0 && remaining <= ALARM_LEAD_MS && !notified[id]) {
        new Notification(`${mvps.find((m) => m.id === id)?.name ?? "MVP"} spawning soon!`, {
          body: "Head to the map — it should appear within a minute.",
        });
        setNotified((n) => ({ ...n, [id]: true }));
      }
      if (remaining <= 0 && notified[id]) {
        setNotified((n) => ({ ...n, [id]: false }));
      }
    });
  }, [now, kills, alarmOn, notified]);

  function markKilled(id: string) {
    const m = mvps.find((x) => x.id === id);
    if (!m) return;
    // eslint-disable-next-line react-hooks/purity -- invoked only from click handlers
    const killedAt = Date.now();
    const spawnAt = killedAt + pickSpawnDelay(m.respawnMin, m.respawnMax);
    const next = { ...kills, [id]: { killedAt, spawnAt } };
    setKills(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setNotified((n) => ({ ...n, [id]: false }));
  }

  function clearOne(id: string) {
    const next = { ...kills };
    delete next[id];
    setKills(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function clearAll() {
    setKills({});
    localStorage.removeItem(STORAGE_KEY);
  }

  const rows = useMemo(() => {
    return mvps
      .map((m) => {
        const rec = kills[m.id];
        const remaining = rec ? rec.spawnAt - now : null;
        return { m, rec, remaining };
      })
      .sort((a, b) => {
        // upcoming spawns first, then unknown
        const ra = a.remaining ?? Infinity;
        const rb = b.remaining ?? Infinity;
        return ra - rb;
      });
  }, [kills, now]);

  const tracked = rows.filter((r) => r.rec);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gold">MVP Timer</h1>
          <p className="text-foreground/70 text-sm mt-1">
            Mark an MVP as killed to start its respawn countdown. Times are estimates until
            verified in-game.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!alarmOn ? (
            <button
              onClick={enableAlarms}
              className="text-xs px-3 py-2 rounded-md border border-panel-2 hover:border-gold"
            >
              Enable alarms
            </button>
          ) : (
            <span className="text-xs text-sage">Alarms on</span>
          )}
          {tracked.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs px-3 py-2 rounded-md border border-crimson/50 text-crimson hover:bg-crimson/10"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ m, rec, remaining }) => {
          const spawning = remaining !== null && remaining <= 0;
          return (
            <div
              key={m.id}
              className={`rounded-xl border p-4 ${
                spawning ? "border-gold animate-pulse-glow bg-gold/5" : "border-panel-2 bg-panel"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gold-soft">{m.name}</h2>
                <span className="text-xs text-foreground/50">{m.element}</span>
              </div>
              <p className="text-xs text-foreground/60 mt-1">{m.map}</p>

              <div className="mt-3 text-sm">
                {rec ? (
                  <div className="flex items-center justify-between">
                    <span className={spawning ? "text-gold font-semibold" : "text-foreground/80"}>
                      {spawning ? "SPAWNING NOW" : `in ${fmt(remaining ?? 0)}`}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markKilled(m.id)}
                        className="text-xs px-2 py-1 rounded-md bg-gold text-midnight font-semibold hover:bg-gold-soft"
                      >
                        Re-kill
                      </button>
                      <button
                        onClick={() => clearOne(m.id)}
                        className="text-xs px-2 py-1 rounded-md border border-panel-2 hover:border-crimson/50 text-crimson"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => markKilled(m.id)}
                    className="w-full text-xs px-3 py-2 rounded-md bg-panel-2 hover:bg-gold/20 text-foreground/80"
                  >
                    Mark killed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
