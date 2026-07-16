# RagnaSys Upgrade Roadmap

**Repo:** Daymrens/Ragnarok ("RagnaSys")
**Stack:** Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4
**Persistence:** `localStorage` only — no backend/accounts
**Data source of truth:** `lib/data/*.ts` typed modules

This doc is structured for an AI coding agent (opencode/Kiro/Windsurf) to work through phase by phase. Each phase is independent and shippable on its own — do not start Phase N+1 until Phase N's acceptance criteria pass.

---

## Phase 0 — Context Recap (read before starting)

- Existing tools: Database, MVP Timer, Build Calculator, Class Guide, Monster Bestiary, Card & Gear DB, Daily/Event Tracker, Strategy, Crafting & Life Skills, Chest Map, Player Guide.
- `npm run scrape` refreshes `lib/data/generated/` from the community wiki as a manual-merge aid — never wire it into the live build pipeline.
- No backend exists yet. Phases 1–7 must work entirely client-side. Phase 8 is the only phase that introduces a backend, and it's optional/stretch.

---

## Phase 1 — Shareable Build Links

**Goal:** Let a user copy a URL that fully reconstructs a saved build (class, stat allocation, refine plan) for someone else to open.

**Why first:** No new dependencies, no backend, and it plugs directly into the existing Build Calculator.

**Tasks:**
- [ ] Create `lib/buildEncode.ts` — functions `encodeBuild(build): string` and `decodeBuild(str): Build | null`, using base64url-encoded JSON (or a compact custom serializer if the build object is large).
- [ ] On `/builder`, add a "Copy Share Link" button that writes `?b=<encoded>` to the URL and copies it to clipboard.
- [ ] On page load, if `?b=` is present, decode and pre-fill the calculator state (don't silently overwrite an in-progress unsaved build — prompt first).
- [ ] Handle malformed/corrupted `?b=` params gracefully (fallback to default state, no crash).

**Files touched:** `app/builder/page.tsx`, new `lib/buildEncode.ts`

**Acceptance criteria:**
- A build made on one browser, copied as a link, and opened in a different browser/incognito window reconstructs identically.
- Invalid share links don't crash the page.

**Est. effort:** Small (1 session)

---

## Phase 2 — Damage / DPS Estimator

**Goal:** Given ATK, refine level, element, and target DEF, output an expected damage range inside the Build Calculator.

**Tasks:**
- [ ] Add `lib/damageCalc.ts` with a pure function `estimateDamage(input): { min, max, avg }` — start with a simplified formula (base ATK × refine multiplier × element modifier − target DEF mitigation); document the formula's known inaccuracy vs. real client values in a code comment since exact ROW damage formulas aren't public.
- [ ] Add an "Estimated Damage" panel to `/builder`, fed by the same state as the ASPD/refine calculators.
- [ ] Add element-matchup lookup, pulling from existing `lib/data/elements.ts` rather than duplicating the table.
- [ ] Add a visible disclaimer: "Estimate only — not verified against live combat logs."

**Files touched:** `app/builder/page.tsx`, new `lib/damageCalc.ts`, reads `lib/data/elements.ts`

**Acceptance criteria:**
- Changing refine level or element updates the estimate live, no page reload.
- Estimate clearly labeled as approximate.

**Est. effort:** Medium

---

## Phase 3 — Build Comparison View

**Goal:** Side-by-side diff of two saved builds, highlighting stat/gear/refine differences.

**Tasks:**
- [ ] New route `app/builder/compare/page.tsx`.
- [ ] Build picker: select two builds from `localStorage`-saved list (or paste two share links from Phase 1).
- [ ] Diff renderer: highlight any stat/gear field that differs between the two builds (color-coded higher/lower).
- [ ] Reuse `estimateDamage` from Phase 2 to show a damage delta, if Phase 2 is complete.

**Files touched:** new `app/builder/compare/page.tsx`, new `components/BuildDiff.tsx`

**Acceptance criteria:**
- Two builds with identical stats show "no differences."
- Two builds with different refine levels show the estimated damage delta (if Phase 2 shipped).

**Est. effort:** Medium

**Depends on:** Phase 1 (for loading builds via link), optionally Phase 2

---

## Phase 4 — Screenshot-to-Build Importer

**Goal:** Let the user upload/paste a screenshot of their in-game stat allocation screen and auto-fill the Build Calculator via OCR — removes manual re-typing entirely.

**Tasks:**
- [ ] Add `tesseract.js` as a client-side dependency (runs in-browser, no backend needed).
- [ ] New component `components/ScreenshotImport.tsx` — file upload / drag-drop / paste-from-clipboard.
- [ ] OCR pass extracts raw text; write a parser `lib/parseStatScreen.ts` that looks for known label patterns (`STR`, `AGI`, `DEX`, `VIT`, `INT`, `LUK`, `Points Left`) and maps them to the build state shape.
- [ ] Since OCR accuracy on phone-photo screenshots will be inconsistent (angle, glare, cropped UI — as seen in real examples), show an editable preview step before committing the parsed values, so the user can correct misreads.
- [ ] Graceful failure: if parsing confidence is low, tell the user which fields it couldn't confidently read rather than silently guessing.

**Files touched:** new `components/ScreenshotImport.tsx`, new `lib/parseStatScreen.ts`, `app/builder/page.tsx` (add import entry point), `package.json`

**Acceptance criteria:**
- A clean, straight-on screenshot of the stat screen correctly fills at least STR/AGI/DEX/VIT/INT/LUK.
- A blurry/angled photo doesn't produce garbage values without warning — low-confidence fields are flagged for manual review.

**Est. effort:** Large — this is the highest-value but highest-effort item. Budget 2–3 sessions.

---

## Phase 5 — Refine Cost / EV Calculator

**Goal:** Given ROW's accumulated-rate (no gear-loss) refine system, estimate expected zeny + ore cost to go from refine level A to B.

**Tasks:**
- [ ] Add `lib/refineCost.ts` modeling cost-per-attempt and success-rate-by-level (source values into `lib/data/refine.ts` so they're editable as ROW's system gets datamined/verified, not hardcoded in logic).
- [ ] Extend the existing safe-refine-to-+15 planner on `/builder` with a "cost to reach target" output.
- [ ] Flag all cost figures as **(est.)**, consistent with how MVP timers are already flagged, until community-verified.

**Files touched:** `app/builder/page.tsx`, new `lib/refineCost.ts`, new `lib/data/refine.ts`

**Acceptance criteria:**
- Selecting a target refine level shows an estimated zeny + ore cost.
- Figures are clearly marked as estimates.

**Est. effort:** Medium

---

## Phase 6 — Job Freedom Roster Tracker

**Goal:** Since one character can swap between all 7 classes via Job Freedom, let a user save a separate stat/skill preset per job on the same character and quick-switch.

**Tasks:**
- [ ] Extend the `localStorage` build schema to support multiple named presets per character, keyed by job.
- [ ] Add a job-switcher tab UI on `/builder`.
- [ ] Migrate any existing single-build saves to the new schema without data loss (write a small migration check on load).

**Files touched:** `app/builder/page.tsx`, `lib/buildEncode.ts` (schema version bump), `components/JobSwitcher.tsx` (new)

**Acceptance criteria:**
- Existing saved builds from before this change still load correctly after the update.
- User can save presets for 2+ jobs on one character and switch between them without re-entering stats.

**Est. effort:** Medium

**Depends on:** Phase 1 (shared schema)

---

## Phase 7 — PWA Offline Mode

**Goal:** Make the daily tracker and MVP timer usable with spotty/no connection.

**Tasks:**
- [ ] Add a web app manifest and service worker (Next.js PWA plugin or hand-rolled).
- [ ] Cache static data (`lib/data/*`) and the app shell for offline use.
- [ ] MVP Timer and Daily Tracker should keep working fully offline since they're already `localStorage`-driven — verify no hidden network dependency breaks them.

**Files touched:** `next.config.ts`, new `public/manifest.json`, new service worker file

**Acceptance criteria:**
- App loads and MVP timer/daily tracker function with network disabled after first visit.

**Est. effort:** Medium (pattern reused from BMIS)

---

## Phase 8 — Community MVP Timer Backend (stretch, optional)

**Goal:** Replace **(est.)** MVP respawn flags with crowd-submitted real kill timestamps.

**Tasks:**
- [ ] Introduce a lightweight backend (Supabase suggested — free tier, Postgres, no server to manage).
- [ ] Table: `mvp_kills (mvp_id, server, killed_at, submitted_by_hash)` — no accounts required, rate-limit by IP/fingerprint to deter spam.
- [ ] `/mvp` page reads latest confirmed kill time per server and computes live countdown from real data instead of the seeded classic-RO baseline.
- [ ] Keep the **(est.)** flag for any MVP with no community submissions yet, so the UI never silently presents a guess as fact.

**Files touched:** new `lib/db/` client, `app/mvp/page.tsx`, new Supabase schema/migration

**Acceptance criteria:**
- A submitted kill timestamp updates the countdown for all users within a reasonable refresh window.
- MVPs with no submissions still show **(est.)**, not a fabricated countdown.

**Est. effort:** Large — only start this if the app has real ongoing usage from your guild/community that justifies a backend.

---

## Suggested order

1 → 2 → 4 → 5 → 3 → 6 → 7 → 8

Rationale: 1 and 2 are cheap wins that other phases build on. 4 (screenshot importer) is the highest daily-use value given how you're already sending me phone photos of your stat screens. 3 and 6 depend on 1's schema work, so they slot in naturally after. 7 and 8 are polish/scale phases — do them once the core tools are solid.
