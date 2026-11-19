import FactCard from './FactCard.jsx'
import PollCard from './PollCard.jsx'
import QuizCard from './QuizCard.jsx'
import SignMakerCard from './SignMakerCard.jsx'
import MatchDayCard from './MatchDayCard.jsx'
import RecapCard from './RecapCard.jsx'
import PollResult from './PollResult.jsx'
import NoCardYet from './NoCardYet.jsx'

const TEMPLATES = {
  fact: FactCard,
  poll: PollCard,
  quiz: QuizCard,
  signMaker: SignMakerCard,
  matchDay: MatchDayCard,
  recap: RecapCard,
}

export default function TodayScreen({ entry, loading, series, countdown, goTo }) {
  if (loading) return <div className="card h-48 opacity-60" aria-busy="true" />
  const Template = entry && TEMPLATES[entry.template]
  if (!Template) return <NoCardYet goTo={goTo} seasonOver={countdown.phase === 'none' && !!series} />
  return (
    <div className="space-y-3">
      {entry.pollRef && <PollResult entry={entry} />}
      <Template key={entry.date} entry={entry} series={series} countdown={countdown} goTo={goTo} />
    </div>
  )
}
