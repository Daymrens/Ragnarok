"use client";

import { useRef, useState } from "react";
import { createWorker, type Worker } from "tesseract.js";
import { parseStatScreen, isHighConfidence, type ParsedStats } from "@/lib/parseStatScreen";

const STAT_KEYS = ["STR", "AGI", "VIT", "INT", "DEX", "LUK"] as const;

export function ScreenshotImport({
  onApply,
}: {
  onApply: (stats: { str: number; agi: number; vit: number; int: number; dex: number; luk: number }) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [preview, setPreview] = useState<ParsedStats | null>(null);
  const [editable, setEditable] = useState<Record<string, string>>({});
  const [rawText, setRawText] = useState("");
  const [error, setError] = useState("");
  const workerRef = useRef<Worker | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function getWorker() {
    if (!workerRef.current) {
      const worker = await createWorker("eng", 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") {
            setProgress(`Reading… ${Math.round(m.progress * 100)}%`);
          }
        },
      });
      workerRef.current = worker;
    }
    return workerRef.current;
  }

  async function runOcr(file: File | Blob) {
    setBusy(true);
    setError("");
    setProgress("Loading OCR engine…");
    try {
      const worker = await getWorker();
      const { data } = await worker.recognize(file as unknown as HTMLImageElement);
      const parsed = parseStatScreen(data.text);
      setRawText(data.text);
      setPreview(parsed);
      const init: Record<string, string> = {};
      for (const k of STAT_KEYS) init[k] = parsed[k]?.toString() ?? "";
      setEditable(init);
    } catch {
      setError("Could not read the image. Try a clearer, straight-on screenshot.");
    } finally {
      setBusy(false);
      setProgress("");
    }
  }

  function onFileSelected(files: FileList | null) {
    const f = files?.[0];
    if (f) runOcr(f);
  }

  function onPaste(e: React.ClipboardEvent) {
    const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image/"));
    if (item) {
      const blob = item.getAsFile();
      if (blob) runOcr(blob);
    }
  }

  function apply() {
    if (!preview) return;
    const out = {
      str: Number(editable.STR) || 0,
      agi: Number(editable.AGI) || 0,
      vit: Number(editable.VIT) || 0,
      int: Number(editable.INT) || 0,
      dex: Number(editable.DEX) || 0,
      luk: Number(editable.LUK) || 0,
    };
    onApply(out);
    setPreview(null);
    setRawText("");
  }

  return (
    <div className="space-y-3">
      <div
        onPaste={onPaste}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFileSelected(e.dataTransfer.files);
        }}
        className="rounded-lg border border-dashed border-gold/40 bg-panel-2/50 p-4 text-center text-sm text-foreground/70"
      >
        <p>Drag &amp; drop, paste (Ctrl+V), or</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 px-3 py-1.5 rounded-md btn-gold text-sm font-semibold"
          disabled={busy}
        >
          {busy ? "Processing…" : "Choose screenshot"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFileSelected(e.target.files)}
        />
        {progress && <p className="mt-2 text-xs text-gold-soft">{progress}</p>}
      </div>

      {error && <p className="text-sm text-crimson">{error}</p>}

      {preview && (
        <div className="card-modern p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gold-soft">Review extracted stats</h3>
            {!isHighConfidence(preview) && (
              <span className="text-[10px] text-crimson/80">
                low-confidence — check values
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {STAT_KEYS.map((k) => (
              <label key={k} className="block text-sm">
                <span className="text-foreground/70">{k}</span>
                <input
                  value={editable[k] ?? ""}
                  onChange={(e) => setEditable({ ...editable, [k]: e.target.value })}
                  inputMode="numeric"
                  className="input-field mt-1 w-full rounded-md px-2 py-1.5 font-mono"
                />
              </label>
            ))}
          </div>
          {preview.lowConfidence.length > 0 && (
            <p className="text-xs text-crimson/80">
              Couldn&apos;t confidently read: {preview.lowConfidence.join(", ")}.
              Correct them above before applying.
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={apply}
              className="px-3 py-1.5 rounded-md bg-gold text-midnight text-sm font-semibold hover:bg-gold-soft"
            >
              Apply to calculator
            </button>
            <button
              onClick={() => {
                setPreview(null);
                setRawText("");
              }}
              className="px-3 py-1.5 rounded-md border border-panel-2 text-sm hover:border-crimson/50 text-crimson"
            >
              Cancel
            </button>
          </div>
          <details className="text-xs text-foreground/50">
            <summary className="cursor-pointer">Show raw OCR text</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words">{rawText || "(empty)"}</pre>
          </details>
        </div>
      )}
    </div>
  );
}
