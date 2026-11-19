import { formatGameDay, formatGameTime } from '../../clock.js'
import { gameOutcome } from '../../seriesHelpers.js'

const OUTCOME_HE = { win: 'ניצחון', loss: 'הפסד' }

export default function SeriesGame({ game, next }) {
  const o = gameOutcome(game)
  const where = game.home ? 'אצלנו' : 'בחוץ'
  return (
    <li className={`card flex items-center justify-between gap-3 ${next ? 'outline outline-[3px] outline-sky' : ''}`}>
      <div>
        <p className="font-bold">משחק {game.n} · {where}{game.ifNeeded ? ', אם צריך' : ''}</p>
        <p className="text-meta text-line">
          {formatGameDay(game.kickoff)}{game.timeTbd ? ' · שעה תיקבע' : ` · ${formatGameTime(game.kickoff)}`}{game.venueHe ? ` · ${game.venueHe}` : ''}
        </p>
      </div>
      {o !== 'pending' ? (
        <div className="shrink-0 text-center">
          <p className="font-display text-heading" dir="ltr">{game.them}–{game.us}</p>
          <p className="text-meta">{OUTCOME_HE[o]}</p>
        </div>
      ) : next ? (
        <span className="chip-label shrink-0">הבא</span>
      ) : null}
    </li>
  )
}
