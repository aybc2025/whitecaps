import { useState } from 'react'
import CardShell from './CardShell.jsx'
import SeriesBalls from './SeriesBalls.jsx'

export default function FactCard({ entry, series }) {
  const facts = entry.facts ?? []
  const [i, setI] = useState(-1)
  const showing = i >= 0 ? facts[i] : null
  const last = i >= facts.length - 1

  return (
    <CardShell title={entry.title}>
      <p>{entry.body}</p>
      {entry.big && (
        <p className="mt-3 text-center">
          <span className="block font-display text-hero">{entry.big}</span>
          <span className="text-label text-line">{entry.bigLabel}</span>
        </p>
      )}
      {entry.visual === 'series' && <SeriesBalls series={series} />}
      {showing && (
        <p key={i} className="mt-3 rounded-card bg-chip p-3" aria-live="polite">
          <span className="font-bold">עובדה {i + 1} מתוך {facts.length}: </span>{showing}
        </p>
      )}
      {facts.length > 0 && (
        <button type="button" className="btn-primary mt-4" onClick={() => setI(last ? 0 : i + 1)}>
          {i < 0 ? 'עובדה מעניינת' : last ? 'שוב מההתחלה' : 'עוד עובדה'}
        </button>
      )}
    </CardShell>
  )
}
