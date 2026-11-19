import Sheet from '../Sheet.jsx'
import Jersey from './Jersey.jsx'

export default function PlayerSheet({ player, onClose }) {
  return (
    <Sheet open={!!player} onOpenChange={(o) => !o && onClose()} title={player?.nameHe ?? 'שחקן'}>
      {player && (
        <div className="text-center">
          <Jersey num={player.num} />
          <h2 className="mt-1 font-display text-title">{player.nameHe}</h2>
          <p className="text-label text-line"><bdi>{player.nameEn}</bdi></p>
          <p className="mt-1 text-label">{player.posHe} · {player.countryHe}</p>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 rounded-card bg-chip p-2">
              <p className="font-display text-display">{player.num}</p>
              <p className="text-meta">מספר חולצה</p>
            </div>
            {player.goals !== null && player.goals !== undefined && (
              <div className="flex-1 rounded-card bg-chip p-2">
                <p className="font-display text-display">{player.goals}</p>
                <p className="text-meta">שערים העונה</p>
              </div>
            )}
          </div>
          <p className="mt-3 text-start"><b>עובדה: </b>{player.factHe}</p>
        </div>
      )}
    </Sheet>
  )
}
