import type { BuildState } from "@/lib/data/types";
import { classes } from "@/lib/data/classes";
import { ElementBadge } from "@/components/ui";

interface Row {
  label: string;
  a: string | number;
  b: string | number;
  delta: number; // b - a, for numeric; 0 if non-numeric
}

function diffRows(a: BuildState, b: BuildState): Row[] {
  const aClass = classes.find((c) => c.id === a.classId)?.name ?? a.classId;
  const bClass = classes.find((c) => c.id === b.classId)?.name ?? b.classId;
  const rows: Row[] = [
    { label: "Class", a: aClass, b: bClass, delta: 0 },
    { label: "Base ASPD", a: a.baseAspd, b: b.baseAspd, delta: b.baseAspd - a.baseAspd },
    { label: "STR", a: a.str ?? 0, b: b.str ?? 0, delta: (b.str ?? 0) - (a.str ?? 0) },
    { label: "AGI", a: a.agi, b: b.agi, delta: b.agi - a.agi },
    { label: "VIT", a: a.vit ?? 0, b: b.vit ?? 0, delta: (b.vit ?? 0) - (a.vit ?? 0) },
    { label: "INT", a: a.int ?? 0, b: b.int ?? 0, delta: (b.int ?? 0) - (a.int ?? 0) },
    { label: "DEX", a: a.dex, b: b.dex, delta: b.dex - a.dex },
    { label: "LUK", a: a.luk ?? 0, b: b.luk ?? 0, delta: (b.luk ?? 0) - (a.luk ?? 0) },
    { label: "Refine target", a: `+${a.refineTarget}`, b: `+${b.refineTarget}`, delta: b.refineTarget - a.refineTarget },
    { label: "Element", a: a.element ?? "—", b: b.element ?? "—", delta: 0 },
    { label: "Target element", a: a.targetElement ?? "—", b: b.targetElement ?? "—", delta: 0 },
    { label: "Target DEF", a: a.targetDef ?? 0, b: b.targetDef ?? 0, delta: (b.targetDef ?? 0) - (a.targetDef ?? 0) },
  ];
  return rows;
}

export function BuildDiff({ a, b }: { a: BuildState; b: BuildState }) {
  const rows = diffRows(a, b);
  const identical = rows.every((r) => r.delta === 0 && r.a === r.b);

  return (
    <div className="space-y-4">
      {identical ? (
        <p className="text-sm text-sage">No differences between these two builds.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-foreground/55 border-b border-panel-2">
                <th className="py-2 pr-4">Field</th>
                <th className="py-2 pr-4">{a.name}</th>
                <th className="py-2 pr-4">{b.name}</th>
                <th className="py-2">Δ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-panel-2/60">
                  <td className="py-2 pr-4 text-foreground/70">{r.label}</td>
                  <td className="py-2 pr-4">{r.a}</td>
                  <td className="py-2 pr-4">{r.b}</td>
                  <td className={`py-2 font-mono ${r.delta > 0 ? "text-sage" : r.delta < 0 ? "text-crimson" : "text-foreground/40"}`}>
                    {r.delta > 0 ? `+${r.delta}` : r.delta < 0 ? `${r.delta}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex flex-wrap gap-2 text-xs">
        <ElementBadge element={a.element ?? "Neutral"} />
        <ElementBadge element={b.element ?? "Neutral"} />
      </div>
    </div>
  );
}
