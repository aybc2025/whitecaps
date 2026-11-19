import CardShell from './CardShell.jsx'
import { useKidStore } from '../../hooks/useKidStore.js'

export default function PollCard({ entry }) {
  const [answers, setAnswers] = useKidStore('pollAnswers')
  const picked = answers[entry.date] ?? null
  const pickedLabel = entry.options.find((o) => o.id === picked)?.label

  return (
    <CardShell title={entry.title}>
      <p>{entry.body}</p>
      <p className="mt-3 text-heading">{entry.question}</p>
      <div className="mt-3 grid gap-2">
        {entry.options.map((o) => {
          const on = o.id === picked
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => setAnswers((a) => ({ ...a, [entry.date]: o.id }))}
              className={`press min-h-[52px] rounded-full border-2 px-4 text-body font-bold ${on ? 'border-harbour bg-harbour text-foam' : 'border-chip bg-chip text-harbour'}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      {picked && (
        <p className="mt-3 text-center text-label" aria-live="polite">
          בחרת: <b>{pickedLabel}</b>. {entry.afterPickHe ?? 'נבדוק מחר!'}
        </p>
      )}
    </CardShell>
  )
}
