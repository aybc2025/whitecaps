import { STADIUM_FACTS } from '../../data/field.js'

function Roof() {
  return (
    <svg viewBox="0 0 120 50" className="h-16 w-full" aria-hidden="true">
      <path d="M10 44 Q60 4 110 44" fill="none" stroke="#9DC4EC" strokeWidth="3" />
      <path d="M38 22 Q60 12 82 22" fill="none" stroke="#F5F9FD" strokeWidth="3" strokeDasharray="4 3" />
      <line x1="6" y1="44" x2="114" y2="44" stroke="#A9B8CC" strokeWidth="2" />
    </svg>
  )
}

export default function StadiumFacts() {
  return (
    <section className="mt-6">
      <h2 className="font-display text-heading">הבית שלנו: BC Place</h2>
      <Roof />
      <ul className="space-y-2">
        {STADIUM_FACTS.map((f) => (
          <li key={f} className="rounded-card bg-foam/10 p-3 text-label">{f}</li>
        ))}
      </ul>
    </section>
  )
}
