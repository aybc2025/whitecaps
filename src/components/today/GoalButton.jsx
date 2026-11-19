import { useState } from 'react'
import GoalBurst from './GoalBurst.jsx'
import { useKidStore } from '../../hooks/useKidStore.js'

export default function GoalButton({ gameKey }) {
  const [taps, setTaps] = useKidStore('goalTaps')
  const [nonce, setNonce] = useState(0)
  const [flash, setFlash] = useState(false)
  const count = taps[gameKey] ?? 0

  const goal = () => {
    setTaps((t) => ({ ...t, [gameKey]: (t[gameKey] ?? 0) + 1 }))
    setNonce(Date.now())
    setFlash(true)
    setTimeout(() => setFlash(false), 220)
    try { navigator.vibrate?.(60) } catch { /* not supported */ }
  }

  return (
    <div className="mt-4 text-center">
      <div className="relative mx-auto h-48 w-48">
        <button
          type="button"
          onClick={goal}
          className={`press relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-full font-display text-display leading-none text-harbour ${flash ? 'bg-foam' : 'bg-gold'}`}
          style={{ boxShadow: '0 0 0 10px rgba(255,194,58,0.28)', transition: 'background-color 160ms ease' }}
        >
          גוֹל!
          <span className="mt-1 font-body text-meta">לוחצים כשהוייטקאפס מבקיעים</span>
        </button>
        <GoalBurst nonce={nonce} />
      </div>
      <p className="mt-4 text-label" aria-live="polite">גולים שחגגת: <b>{count}</b></p>
      {count > 0 && (
        <button type="button" className="mt-1 text-meta text-line underline" onClick={() => setTaps((t) => ({ ...t, [gameKey]: Math.max(0, (t[gameKey] ?? 0) - 1) }))}>
          לחצתי בטעות
        </button>
      )}
    </div>
  )
}
