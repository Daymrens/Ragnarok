"use client";

import { useState } from "react";
import { redeemCodes } from "@/lib/data/codes";

export function CodesList() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {redeemCodes.map((c) => (
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
              className="text-xs px-2 py-1 rounded-md bg-gold text-midnight font-semibold disabled:opacity-40 hover:bg-gold-soft"
            >
              {copied === c.code ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-sm text-foreground/75 mt-2">{c.rewards}</p>
          <p className="text-xs text-foreground/50 mt-1">
            {c.active ? (c.expires ? `Expires ${c.expires}` : "Active") : "Inactive"}
          </p>
        </div>
      ))}
    </div>
  );
}
