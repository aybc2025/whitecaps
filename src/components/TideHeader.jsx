import { useEffect, useState } from 'react'
import { useLongPress } from '../hooks/useLongPress.js'
import { formatGameTime } from '../clock.js'

function Wave({ pct }) {
  const [risen, setRisen] = useState(false)
  useEffect(() => { const id = requestAnimationFrame(() => setRisen(true)); return () => cancelAnimationFrame(id) }, [])
  // pct 0..1 → how much of the 64px band the water fills.
  const offset = risen ? (1 - pct) * 46 : 64
  return (
    <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full" viewBox="0 0 375 64" preserveAspectRatio="none" aria-hidden="true">
      <g className="tide-rise" style={{ transform: `translateY(${offset}px)` }}>
        <path d="M0 10 Q47 0 94 8 T188 6 T282 4 T375 7 V80 H0Z" fill="#9DC4EC" opacity="0.35" />
        <path d="M0 16 Q47 6 94 14 T188 12 T282 11 T375 13 V80 H0Z" fill="#9DC4EC" />
        <path d="M0 16 Q47 6 94 14 T188 12 T282 11 T375 13" fill="none" stroke="#F5F9FD" strokeWidth="2.5" opacity="0.8" />
      </g>
    </svg>
  )
}

function pad(n) { return String(n).padStart(2, '0') }

function headline(c) {
  if (c.phase === 'none') return { label: 'הוייטקאפס', big: 'נתראה בעונה הבאה', small: '' }
  if (c.phase === 'live') return { label: `משחק ${c.game.n}`, big: 'המשחק עכשיו!', small: '' }
  if (c.phase === 'today') {
    const h = Math.floor(c.msLeft / 3600000)
    const m = Math.floor((c.msLeft % 3600000) / 60000)
    const s = Math.floor((c.msLeft % 60000) / 1000)
    return { label: `היום! שריקת פתיחה ב־${formatGameTime(c.game.kickoff)}`, big: h > 0 ? `${h}:${pad(m)}` : `${m}:${pad(s)}`, small: h > 0 ? 'שעות' : 'דקות' }
  }
  const d = c.daysLeft
  return { label: `עד משחק ${c.game.n}`, big: d === 1 ? 'מחר!' : `עוד ${d}`, small: d === 1 ? '' : 'ימים' }
}

export default function TideHeader({ countdown, series, onLongPress }) {
  const press = useLongPress(onLongPress)
  const h = series ? headline(countdown) : { label: 'רגע…', big: '', small: '' }
  return (
    <header {...press} className="relative h-36 select-none overflow-hidden px-5 pt-[max(12px,env(safe-area-inset-top))]" aria-live="polite">
      <p className="text-label text-mist">{h.label}</p>
      <p className="mt-0.5 font-display text-display leading-none">
        {countdown.phase === 'today' ? <bdi dir="ltr">{h.big}</bdi> : h.big}
        {h.small && <span className="ms-2 text-heading text-sky">{h.small}</span>}
      </p>
      <Wave pct={countdown.pct} />
    </header>
  )
}
