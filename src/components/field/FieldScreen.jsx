import { useState } from 'react'
import InteractivePitch from './InteractivePitch.jsx'
import StadiumFacts from './StadiumFacts.jsx'
import Glossary from './Glossary.jsx'
import { ZONES } from '../../data/field.js'

export default function FieldScreen() {
  const [active, setActive] = useState('penaltyBox')
  const zone = ZONES[active]
  return (
    <div>
      <h1 className="font-display text-title">המגרש</h1>
      <p className="mb-3 text-label text-mist">לוחצים על חלק במגרש</p>
      <InteractivePitch active={active} onPick={setActive} zones={ZONES} />
      <article className="card mt-3" aria-live="polite">
        <h2 className="font-display text-heading">{zone.nameHe}</h2>
        <p className="mt-1">{zone.textHe}</p>
      </article>
      <StadiumFacts />
      <Glossary />
    </div>
  )
}
