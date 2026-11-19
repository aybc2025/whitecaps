import SeriesGame from './SeriesGame.jsx'
import PlayoffRoad from './PlayoffRoad.jsx'
import { opponentName, seriesTally } from '../../seriesHelpers.js'

export default function RoadScreen({ series, error }) {
  if (error) return <p className="card">אי אפשר לטעון את לוח המשחקים כרגע. נסו שוב כשיש אינטרנט.</p>
  if (!series) return <div className="card h-72 opacity-60" aria-busy="true" />
  const stage = series.stages.find((s) => s.id === series.currentStage) ?? series.stages[0]
  const opp = opponentName(series, null)
  const { wins, losses } = seriesTally(series)
  const nextIdx = series.games.findIndex((g) => g.us === null)

  return (
    <div>
      <h1 className="font-display text-title">{stage.nameHe}</h1>
      <p className="text-label text-mist">{stage.formatHe}</p>
      <p className="mt-2 text-label">
        {opp ? <>היריבה: <b>{opp}</b></> : <>היריבה: <b>{series.candidates.map((c) => c.nameHe).join(' או ')}</b> (נקבע במשחק הווילד קארד)</>}
      </p>
      {(wins > 0 || losses > 0) && <p className="mt-1 text-label">מצב הסדרה: <bdi>{wins}–{losses}</bdi> לוייטקאפס</p>}
      {!series.eliminated && series.games.length > 0 && (
        <ul className="mt-3 space-y-2">
          {series.games.map((g, i) => <SeriesGame key={g.n} game={g} next={i === nextIdx} />)}
        </ul>
      )}
      {series.eliminated && <p className="card mt-3">העונה של הוייטקאפס הסתיימה. איזו עונה!</p>}
      <PlayoffRoad stages={series.stages} current={series.currentStage} eliminated={series.eliminated} />
    </div>
  )
}
