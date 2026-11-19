import CardShell from './CardShell.jsx'
import ScoreGuess from './ScoreGuess.jsx'
import GoalButton from './GoalButton.jsx'
import { useKidStore } from '../../hooks/useKidStore.js'
import { gameByNumber, opponentName } from '../../seriesHelpers.js'
import { formatGameTime } from '../../clock.js'

export default function MatchDayCard({ entry, series, countdown }) {
  const n = entry.gameN ?? countdown.game?.n ?? 1
  const key = `${entry.stage ?? series?.currentStage ?? 'r1'}-${n}`
  const game = gameByNumber(series, n)
  const opponent = opponentName(series)
  const locked = countdown.phase === 'live' || (countdown.game && countdown.game.n !== n)
  const [checks, setChecks] = useKidStore('checks')
  const done = checks[entry.date] ?? []
  const toggle = (item) => setChecks((c) => {
    const cur = c[entry.date] ?? []
    return { ...c, [entry.date]: cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item] }
  })

  return (
    <CardShell title={entry.title} chip={`יום משחק · משחק ${n}`}>
      {entry.body && <p>{entry.body}</p>}
      {game && <p className="mt-1 text-label text-line">{game.home ? 'אצלנו' : 'בחוץ'}{game.venueHe ? ` · ${game.venueHe}` : ''} · {formatGameTime(game.kickoff)}</p>}
      <h2 className="mt-4 text-heading">מה התוצאה שלך?</h2>
      <ScoreGuess gameKey={key} opponent={opponent} locked={locked} />
      <GoalButton gameKey={key} />
      {entry.checklist?.length > 0 && (
        <>
          <h2 className="mt-5 text-heading">לפני השריקה</h2>
          <ul className="mt-2 space-y-2">
            {entry.checklist.map((item) => {
              const on = done.includes(item)
              return (
                <li key={item}>
                  <button type="button" role="checkbox" aria-checked={on} onClick={() => toggle(item)}
                    className="press flex min-h-[48px] w-full items-center gap-3 rounded-card bg-chip px-3 text-start">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-harbour ${on ? 'bg-harbour' : ''}`}>
                      {on && <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#F5F9FD" strokeWidth="3" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>}
                    </span>
                    <span className={on ? 'text-line line-through' : ''}>{item}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </CardShell>
  )
}
