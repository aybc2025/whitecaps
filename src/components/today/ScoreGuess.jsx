import { useKidStore } from '../../hooks/useKidStore.js'

function Stepper({ label, value, onChange, disabled }) {
  return (
    <div className="flex-1 text-center">
      <p className="text-label">{label}</p>
      <p className="font-display text-hero" aria-live="polite">{value}</p>
      <div className="mt-1 flex justify-center gap-2">
        <button type="button" disabled={disabled || value === 0} onClick={() => onChange(value - 1)} aria-label={`פחות ל${label}`}
          className="press h-11 w-11 rounded-full bg-chip text-heading disabled:opacity-40">−</button>
        <button type="button" disabled={disabled || value === 9} onClick={() => onChange(value + 1)} aria-label={`יותר ל${label}`}
          className="press h-11 w-11 rounded-full bg-chip text-heading disabled:opacity-40">+</button>
      </div>
    </div>
  )
}

export default function ScoreGuess({ gameKey, opponent, locked }) {
  const [guesses, setGuesses] = useKidStore('scoreGuess')
  const g = guesses[gameKey] ?? { us: 0, them: 0 }
  const set = (side) => (v) => setGuesses((all) => ({ ...all, [gameKey]: { ...g, [side]: v } }))
  return (
    <div>
      <div className="flex items-start gap-2">
        <Stepper label="וייטקאפס" value={g.us} onChange={set('us')} disabled={locked} />
        <p className="pt-10 font-display text-display">:</p>
        <Stepper label={opponent} value={g.them} onChange={set('them')} disabled={locked} />
      </div>
      {locked && <p className="mt-2 text-center text-meta text-line">הניחוש ננעל בשריקת הפתיחה</p>}
    </div>
  )
}
