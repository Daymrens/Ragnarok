"use client";

import { useEffect, useState } from "react";

export function LiveCodeBadge({ fallback }: { fallback: number }) {
  const [count, setCount] = useState<number>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/codes")
      .then((r) => r.json())
      .then((d: { codes?: { active: boolean }[] }) => {
        if (cancelled) return;
        const active = (d.codes ?? []).filter((c) => c.active).length;
        if (active > 0) setCount(active);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <>{count}</>;
}
