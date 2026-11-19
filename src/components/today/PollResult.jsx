import { useKidStore } from '../../hooks/useKidStore.js'
import StarIcon from './StarIcon.jsx'

/** Shows yesterday's poll pick against the real answer (entry.pollRef + entry.pollAnswer). */
export default function PollResult({ entry }) {
  const [answers] = useKidStore('pollAnswers')
  const picked = answers[entry.pollRef]
  if (!picked || !entry.pollAnswer) return null
  const right = picked === entry.pollAnswer
  return (
    <div className="flex items-center gap-3 rounded-card bg-sky p-3 text-harbour" role="status">
      <StarIcon filled={right} className="h-8 w-8 shrink-0" />
      <p className="text-label font-medium">{right ? entry.pollRightHe ?? 'ניחשת נכון!' : entry.pollWrongHe ?? 'הפעם לא ניחשת, אבל היה קרוב!'}</p>
    </div>
  )
}
