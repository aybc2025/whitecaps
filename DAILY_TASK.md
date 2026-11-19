# Daily task — replace today's card

You are the scheduled run that keeps the "ונקובר וייטקאפס" app fresh for an 8-year-old
fan. You run every morning at **5:30 Vancouver time**. Your job: research what's new,
then **replace today's card** by adding one entry to `public/content/daily.json`, and
keep `series.json` (and, if needed, `squad.json`) true. Then validate, commit, push.

**You only write to `public/content/`.** Never change code, config, workflows or docs.
CI rejects any `daily:` commit that touches other files.

## Time

- Vancouver is on **year-round Pacific Time, UTC−7** (B.C. stopped changing clocks in
  Nov 2026). Every kickoff in `series.json` uses `-07:00`.
- MLS lists times in ET. In Nov–Mar, ET is UTC−5, so **Vancouver = ET − 2 h**
  (8:30 pm ET → 18:30). US Pacific teams (Seattle) are now one hour *behind* Vancouver
  in winter.
- "Today" = today's date in America/Vancouver (`TZ=America/Vancouver date +%F`).

## Steps

1. `TZ=America/Vancouver date +%F` → today. If `daily.json` already has an entry for
   today, replace it (one entry per date).
2. Research (WebSearch/WebFetch): Whitecaps news since the last entry — results,
   opponent, injuries, lineup, next kickoff time. Prefer whitecapsfc.com, mlssoccer.com,
   Canadian Press/TSN, Daily Hive. Every fact you write must come from a source you
   read today or one already cited in the repo.
3. Update `series.json` if anything changed (see below).
4. Add today's entry to `daily.json` (see templates). Keep older entries — they're
   history; the app only shows today's.
5. `node scripts/validate-content.mjs` (no install needed). Fix until it passes.
6. `bash .githooks/secret-scan.sh` (staged) must pass.
7. Commit with message `daily: YYYY-MM-DD <short summary>` and push to `main`.
   Never use `--no-verify`.
8. Finish with one line. On success: `OK – <date> <template>: <title>`.
   On any failure (no push happened, validation can't be fixed, research failed):
   start the final message with `FAILED:` and say what broke — that message is sent to
   Assaf's phone.

## Which card, when

Pick what fits the day. Default plan:

| Day | Template | Idea |
|---|---|---|
| Day before a game when the opponent is undecided | `poll` | Who wins tonight's match that decides our opponent? |
| Morning after that match | `quiz` or `fact` + `pollRef`/`pollAnswer` | Meet the opponent; show if the kid's pick was right |
| Day before a game | `signMaker` | Fan sign for tomorrow |
| Game day | `matchDay` | Countdown, score guess, GOAL button, short checklist |
| Morning after a game | `recap` | Score, what it means for the series, next game |
| Other days | `fact`, `quiz`, `poll` | A player, a rule, a stat, history vs. the opponent |

Don't repeat yesterday's template unless the news calls for it. Big news (injury to a
star, a record) beats the plan.

## Content rules (8-year-old reader, Hebrew)

- Hebrew UI text. Player/club names in Hebrew letters (e.g. בריאן וייט); the app
  shows English names from `squad.json` where needed.
- The app is called **וייטקאפס** — spell it that way.
- Short: title ≤ 60 chars, body ≤ ~60 words, each fact ≤ 200 chars.
- No betting/odds, no mocking the opponent, no injuries described graphically, no fan
  names, no social-media quotes. Losses are told kindly and honestly.
- Every fact sourced; `sources` lists the https URLs you used (shown to parents only).
- No `<` or `>` characters anywhere.
- After the Whitecaps are eliminated: write one final `recap` (or `fact`) that
  celebrates the season, set `"eliminated": true`, and on later runs do **not** add
  cards — just end with `FAILED: season over — delete the scheduled task` so Assaf is
  told once. Same after MLS Cup (Dec 18, 2026) is played.

## daily.json templates

All entries: `date` (YYYY-MM-DD), `template`, `title`, optional `body`, `sources` (≥1
https URL). Optional on any entry: `pollRef` (date of an earlier poll) + `pollAnswer`
(the correct option id) → the app shows whether the kid guessed right; optional
`pollRightHe` / `pollWrongHe` to word that line.

```json
{ "date": "2026-11-19", "template": "poll", "title": "מי יגיע אלינו?",
  "body": "הלילה סיאטל משחקת נגד ריל סולט לייק...",
  "question": "מי לדעתך תנצח הלילה?",
  "options": [{ "id": "SEA", "label": "סיאטל סאונדרס" }, { "id": "RSL", "label": "ריל סולט לייק" }],
  "afterPickHe": "נבדוק מחר!", "sources": ["https://..."] }

{ "date": "...", "template": "fact", "title": "...", "body": "...",
  "facts": ["...", "..."], "visual": "series",            // visual optional: 3 series balls
  "big": "20", "bigLabel": "שערים לבריאן וייט העונה",      // big optional
  "sources": ["https://..."] }

{ "date": "...", "template": "quiz", "title": "...",
  "questions": [{ "q": "...", "options": ["א", "ב", "ג"], "answer": 1, "explain": "..." }],
  "sources": ["https://..."] }                              // 2–6 questions, answer = index

{ "date": "...", "template": "signMaker", "title": "שלט לערב המשחק", "body": "...",
  "phrases": ["קדימה וייטקאפס!", "הגל עולה!"], "sources": ["https://..."] }   // 2–8, ≤30 chars

{ "date": "...", "template": "matchDay", "stage": "r1", "gameN": 1, "title": "היום משחקים!",
  "body": "...", "checklist": ["ללבוש משהו כחול", "להכין את השלט"], "sources": ["https://..."] }

{ "date": "...", "template": "recap", "stage": "r1", "gameN": 1, "title": "...",
  "us": 2, "them": 1, "pensUs": null, "pensThem": null, "opponentHe": "סיאטל",
  "body": "...", "nextHe": "משחק 2: שישי 27.11 בסיאטל", "sources": ["https://..."] }
```

`stage` + `gameN` must match the game in `series.json` at the time of the game
(scores and guesses are stored per stage+game on the kid's device).

## series.json

- `opponent`: `null` until decided, then a candidate `id`. When a new round starts,
  replace `candidates` with the possible/actual opponents (`id`, `nameHe`, `cityHe`).
- `games`: **only the current stage's games**. After each game, fill `us`/`them`
  (and `pensUs`/`pensThem` if a tied game went to penalties — Round One has no ties).
- `kickoff`: `YYYY-MM-DDTHH:MM:SS-07:00` in Vancouver time. If the time isn't announced
  yet, put a placeholder 19:00 and `"timeTbd": true`. `venueHe` for away games once known.
- When the Whitecaps win a round: set `currentStage` to the next stage id
  (`r1` → `csf` → `cf` → `cup`), replace `games` with that round's game(s), `ifNeeded`
  false. Conference Semifinal Dec 5–6, Conference Final Dec 11–12 (single games, higher
  seed hosts), MLS Cup Fri Dec 18 (better regular-season record hosts).
- When they're knocked out: `"eliminated": true` (keep the last games for history).

## squad.json

Update only for real changes: a new starting XI pattern before a game (use the most
recent confirmed lineup and update `sourceHe`), a season-total `goals` change, a player
leaving. Exactly 11 `starters` with `x`/`y` (0–100, our goal at the bottom, y≈90).
Facts must stay true and sourced.
