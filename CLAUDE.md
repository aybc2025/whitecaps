# ונקובר וייטקאפס — CLAUDE.md

Hebrew RTL PWA for an 8-year-old following the Vancouver Whitecaps through the 2026 MLS
Cup Playoffs. One **daily card** that a scheduled Claude task replaces every morning,
plus three fixed tabs (lineup, field, road to the cup). Live at
https://aybc2025.github.io/whitecaps/

## If you are the daily scheduled run
Read `DAILY_TASK.md` and follow it. Touch only `public/content/`.

## On opening this repo (any other session), run automatically
`npm ci && npm run validate && npm run build` — no need to ask. The build was verified in
the authoring session (Node 22, Vite 6); fix anything that breaks before other work.
`package-lock.json` is committed, so CI is in **locked state** (`npm ci`, `cache: 'npm'`).
`npm install` also wires `.githooks` via the `prepare` script.

## What you can NOT do here, even if asked
- Turn on GitHub Pages (owner: Settings → Pages → Source = **GitHub Actions**).
- Create or edit the scheduled task's schedule from inside a daily run.
- Add secrets, analytics, trackers, or any network call to a third party. The app has no
  backend, no auth, no keys — keep it that way.
- Use player photos or the club logo (IP). The jersey and icon are original drawings.

## Secret scan before commit
`bash .githooks/secret-scan.sh` before every commit (the pre-commit hook runs it, plus the
content validator when `public/content/` is staged). Before a first push of new history:
`bash .githooks/secret-scan.sh --all`. Never `--no-verify`, never `git add -f`. There are
no secrets in this app; if one ever appears, stop and tell the owner to revoke it.

## Architecture
- `public/content/` — data, not code. `daily.json` (one entry per Vancouver date; the app
  shows only today's), `series.json` (current stage's games, opponent, stages),
  `squad.json` (11 starters with pitch x/y + others). Served network-first by the SW so
  a push shows up without a code update.
- `scripts/validate-content.mjs` — zero-dependency schema check. CI runs it before build.
- `src/components/today/` — one component per card template (`fact`, `poll`, `quiz`,
  `signMaker`, `matchDay`, `recap`) + `NoCardYet` (also the season-over card).
- `src/components/{lineup,field,road}/` — the fixed tabs. Fixed copy for the field tab is
  in `src/data/field.js`.
- `src/hooks/` — `useNow` (clock + `?now=`/`?day=` test overrides), `useCountdown`,
  `useContent`, `useKidStore` (localStorage, prefix `whitecaps:`), `useLongPress`.
- `src/clock.js` — Vancouver date helpers.

## Intentional decisions — do not revert without asking
- **Vancouver is UTC−7 year-round** (B.C. permanent daylight time from Nov 2026).
  Kickoffs are stored with `-07:00`; `?now=` overrides assume `-07:00`. Do not "fix"
  to −08:00.
- The daily task writes **data only**, into fixed templates. Code never changes daily.
  CI fails any `daily:` commit that touches files outside `public/content/`.
- Recap entries carry their own score (`us`/`them`) and `stage`, because `series.json`
  only holds the current stage's games.
- Kid's guesses/taps are keyed `${stage}-${gameN}` on the device.
- No player photos, no club logo, no emoji icons.
- Long-press on the countdown header opens a parents sheet with today's sources.
- Tide window = 5 days: the wave is low ~5 days out and full at kickoff.

## Visual system (approved spec)
- Palette: harbour `#13305A` (bg, text on foam) · deep `#0E2648` (nav only) · sky
  `#9DC4EC` (accent, wave, active tab) · foam `#F5F9FD` (cards, text on harbour) · mist
  `#A9B8CC` (secondary text on harbour only) · chip `#DCE9F7` (fills in cards) · line
  `#5D6F86` (secondary text on foam) · pitch `#2F7D5B` (field drawings only) · gold
  `#FFC23A` (goals/stars/wins only, never text on foam).
- Contrast: foam/harbour 12.4:1 · sky/harbour 7.6:1 · mist/harbour 6.4:1 ·
  harbour/gold 8.1:1 · line/foam 5.3:1 · white/pitch 5.2:1.
- Type: Secular One (display, numbers) + Rubik 400/500/700, bundled via @fontsource
  (hebrew + latin + latin-ext subsets). Scale tokens only: meta 13 · label 15 · body 17 ·
  heading 21 · title 27 · display 34 · hero 52. No `text-[Npx]`.
- Spacing 4px base. Radius: card 20, sheet 28 (top), pills full.
- Motion: ease-out `cubic-bezier(.23,1,.32,1)`; sheet `cubic-bezier(.32,.72,0,1)` 320ms in /
  200ms out; press scale .97 120ms; tabs switch without animation; tide rise 600ms once;
  gold GoalBurst (recycled 16-particle pool, WAAPI). Reduced motion: colour flash only.
- RTL: `dir="rtl"`. Pitches are physical drawings rendered `dir="ltr"` (sides don't
  mirror). English names wrapped in `<bdi>`.

## App icons
A football riding a cresting wave (a "whitecap") on harbour navy — the same wave as the
countdown header. Generator: `icon-design/make_icons.py` (draws at 4096px, LANCZOS down).
Full set in `public/icons/` (192, 512, 512-maskable with safe-zone layout, apple-touch
180, favicon-32), wired into the manifest and `index.html`. Verified full-size, through a
circular mask, and at 96/48/32px.

## PWA install identity
- `id: /whitecaps/app` (deliberately ≠ `start_url`), `start_url` and `scope`: `/whitecaps/`.
- Cache prefix `whitecaps` (precache id + `whitecaps-content`); storage prefix `whitecaps:`.
- Headless Chromium check at the real subpath: no manifest errors, no installability
  errors, SW activated, all icons 200 image/png. Android install itself not tested.
- "This app is already installed" with no app: change `id`, remove old shortcut, uninstall
  from Android Settings → Apps, reopen and use ⋮ → Install app.

## Commands
`npm run dev` · `npm run build` · `npm run preview` · `npm run validate`
Test any day: `?day=2026-11-22` or `?now=2026-11-22T17:12` (+ `#today|lineup|field|road`).

## Deployment model
Push to `main` → GitHub Actions (`deploy.yml`): daily-commit guard → `npm ci` →
validate → build → GitHub Pages. One-time owner step: Settings → Pages → Source =
GitHub Actions. The daily content comes from a Claude scheduled task (5:30 Vancouver,
notifies only on `FAILED:`).
