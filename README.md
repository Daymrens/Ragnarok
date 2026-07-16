# RagnaSys

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/new) [![Live](https://img.shields.io/badge/Live-ragnarok--weld.vercel.app-green?style=flat)](https://ragnarok-weld.vercel.app/)

A fan-made companion web app for **Ragnarok: The New World** (ROW) — the open-world MMORPG by Gravity Game Vision that launched in SEA on July 16, 2026.

> Not affiliated with Gravity. All game data is community-sourced and may be inaccurate — always verify in-game.

## Tools

- **Database** (`/database`) — browse classes, monsters, MVPs, cards, gear, and active redeem codes.
- **MVP Timer** (`/mvp`) — mark an MVP as killed to start a respawn countdown; optional browser alarms. Persists in `localStorage`.
- **Build Calculator** (`/builder`) — estimate ASPD toward the 193 cap, plan safe-refine costs (to +15), and save builds.
- **Class Guide** (`/guide`) — per-class getting-started guides: stat priority, skill order, gear, and builds.
- **Monster Bestiary** (`/database/monsters`) — monster entries with element, race, and drops.
- **Card & Gear DB** (`/database/cards`, `/database/gear`) — searchable equipment and card references.
- **Daily / Event Tracker** (`/daily`) — daily checklist with server-reset countdown and launch events.
- **Strategy** (`/strategy`) — element matchup chart and class/combat tips.
- **Crafting & Life Skills** (`/crafting`) — life skills, stations, and material sources.
- **Chest Map** (`/map`) — exploration chest tracker by region.
- **Player Guide** (`/guide/player`) — full beginner-to-endgame walkthrough.

## Stack

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run scrape   # refresh best-effort data from the community wiki
```

## Data

Game data lives in `lib/data/` as typed TypeScript modules — the source of truth:

- `classes.ts` — class definitions and skills
- `guides.ts` — per-class guides
- `monsters.ts` — bestiary entries
- `cards.ts` / `gear.ts` — equipment and card references
- `mvps.ts` — MVP bosses and respawn windows
- `codes.ts` — redeem codes
- `events.ts` — launch/daily events
- `elements.ts` — element matchups
- `crafting.ts` — life skills, stations, materials
- `chests.ts` — exploration chests
- `playerGuide.ts` — full walkthrough sections

MVP respawn windows are seeded from classic RO baselines and launch coverage and are
flagged **(est.)** in the UI until ROW-specific timers are verified in-game.

### Scraper

`npm run scrape` fetches the community wiki (`ragnarokthenewworld.wiki`) and writes
best-effort output to `lib/data/generated/`. It is a refresh aid only — review and merge
the generated JSON into the curated modules manually. The scraper is polite (custom
User-Agent, no parallelism) and should be run sparingly.

## Notes

- No backend or accounts. Timers and saved builds use `localStorage` (per-browser).
- The app is a passive reference/timer/calculator — it does not read game memory, automate
  input, or interact with the game client.
