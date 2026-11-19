import { useState } from 'react'
import PitchFormation from './PitchFormation.jsx'
import BenchList from './BenchList.jsx'
import PlayerSheet from './PlayerSheet.jsx'

export default function LineupScreen({ squad, error }) {
  const [player, setPlayer] = useState(null)
  if (error) return <p className="card">אי אפשר לטעון את ההרכב כרגע. נסו שוב כשיש אינטרנט.</p>
  if (!squad) return <div className="card h-96 opacity-60" aria-busy="true" />
  return (
    <div>
      <h1 className="font-display text-title">ההרכב</h1>
      <p className="mb-3 text-label text-mist">{squad.sourceHe} · לוחצים על שחקן</p>
      <PitchFormation players={squad.starters} onPick={setPlayer} />
      <h2 className="mt-6 text-heading">עוד שחקנים בסגל</h2>
      <BenchList players={squad.others} onPick={setPlayer} />
      <PlayerSheet player={player} onClose={() => setPlayer(null)} />
    </div>
  )
}
