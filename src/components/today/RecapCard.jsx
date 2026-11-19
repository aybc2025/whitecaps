import CardShell from './CardShell.jsx'
import StarIcon from './StarIcon.jsx'
import SeriesBalls from './SeriesBalls.jsx'
import { useKidStore } from '../../hooks/useKidStore.js'
import { opponentName } from '../../seriesHelpers.js'

function Score({ us, them, opponent }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-center"><p className="text-label">וייטקאפס</p><p className="font-display text-hero">{us}</p></div>
      <p className="font-display text-display">:</p>
      <div className="text-center"><p className="text-label">{opponent}</p><p className="font-display text-hero">{them}</p></div>
    </div>
  )
}

/** The recap carries its own score, so it stays right after the series moves to a new stage. */
export default function RecapCard({ entry, series }) {
  const key = `${entry.stage}-${entry.gameN}`
  const opponent = entry.opponentHe ?? opponentName(series)
  const [guesses] = useKidStore('scoreGuess')
  const [taps] = useKidStore('goalTaps')
  const guess = guesses[key]
  const exact = guess && guess.us === entry.us && guess.them === entry.them

  return (
    <CardShell title={entry.title} chip={`אחרי משחק ${entry.gameN}`}>
      <Score us={entry.us} them={entry.them} opponent={opponent} />
      {entry.pensUs !== undefined && entry.pensUs !== null && (
        <p className="text-center text-label">בדו־קרב הפנדלים: <bdi>{entry.pensUs}–{entry.pensThem}</bdi> לוייטקאפס</p>
      )}
      <p className="mt-3">{entry.body}</p>
      {guess && (
        <div className="mt-3 flex items-center gap-3 rounded-card bg-chip p-3">
          <StarIcon filled={!!exact} className="h-8 w-8 shrink-0" />
          <p className="text-label">הניחוש שלך היה <bdi>{guess.us}–{guess.them}</bdi> לוייטקאפס. {exact ? 'בול!' : 'במשחק הבא אפשר לנחש שוב.'}</p>
        </div>
      )}
      {(taps[key] ?? 0) > 0 && <p className="mt-2 text-label">חגגת {taps[key]} גולים.</p>}
      {entry.stage === series?.currentStage && <SeriesBalls series={series} />}
      {entry.nextHe && <p className="mt-2 text-label font-bold">{entry.nextHe}</p>}
    </CardShell>
  )
}
