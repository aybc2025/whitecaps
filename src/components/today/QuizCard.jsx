import { useState } from 'react'
import CardShell from './CardShell.jsx'
import StarIcon from './StarIcon.jsx'
import { useKidStore } from '../../hooks/useKidStore.js'

export default function QuizCard({ entry }) {
  const qs = entry.questions ?? []
  const [stars, setStars] = useKidStore('quizStars')
  const [idx, setIdx] = useState(0)
  const [pick, setPick] = useState(null)
  const [score, setScore] = useState(0)
  const done = idx >= qs.length

  if (done) {
    const best = Math.max(score, stars[entry.date] ?? 0)
    return (
      <CardShell title={entry.title}>
        <div className="my-3 flex justify-center gap-1" aria-label={`${score} כוכבים`}>
          {qs.map((q, i) => <StarIcon key={q.q} filled={i < score} className="h-10 w-10" />)}
        </div>
        <p className="text-center text-heading">{score} מתוך {qs.length}</p>
        {best > score && <p className="text-center text-label text-line">השיא שלך היום: {best}</p>}
        <button type="button" className="btn-soft mt-4 w-full" onClick={() => { setIdx(0); setPick(null); setScore(0) }}>לשחק שוב</button>
      </CardShell>
    )
  }

  const q = qs[idx]
  const answered = pick !== null
  const next = () => {
    const s = score + (pick === q.answer ? 1 : 0)
    setScore(s)
    setPick(null)
    setIdx(idx + 1)
    if (idx + 1 >= qs.length) setStars((all) => ({ ...all, [entry.date]: Math.max(s, all[entry.date] ?? 0) }))
  }

  return (
    <CardShell title={entry.title}>
      <p className="text-label text-line">שאלה {idx + 1} מתוך {qs.length}</p>
      <p className="mt-1 text-heading">{q.q}</p>
      <div className="mt-3 grid gap-2">
        {q.options.map((o, i) => {
          const isRight = answered && i === q.answer
          const isWrongPick = answered && i === pick && i !== q.answer
          const cls = isRight ? 'border-harbour bg-sky' : isWrongPick ? 'border-line bg-foam line-through' : 'border-chip bg-chip'
          return (
            <button key={o} type="button" disabled={answered} onClick={() => setPick(i)}
              className={`press min-h-[52px] rounded-full border-2 px-4 text-start text-body font-medium text-harbour ${cls}`}>
              {o}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="mt-3" aria-live="polite">
          <p className="font-bold">{pick === q.answer ? 'נכון!' : 'לא בדיוק.'}</p>
          {q.explain && <p className="text-label">{q.explain}</p>}
          <button type="button" className="btn-primary mt-3" onClick={next}>{idx + 1 < qs.length ? 'לשאלה הבאה' : 'לראות כמה כוכבים'}</button>
        </div>
      )}
    </CardShell>
  )
}
