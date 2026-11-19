import { useMemo } from 'react'
import { calendarDaysBetween } from '../clock.js'
import { GAME_LENGTH_MS, TIDE_WINDOW_MS } from '../constants.js'

/**
 * Next relevant game and how far away it is.
 * phase: 'days' | 'today' | 'live' | 'none'
 */
export function useCountdown(series, now) {
  return useMemo(() => {
    const games = (series?.games ?? [])
      .filter((g) => g.us === null && Date.parse(g.kickoff) + GAME_LENGTH_MS > now.getTime())
      .sort((a, b) => Date.parse(a.kickoff) - Date.parse(b.kickoff))
    const game = series?.eliminated ? null : games[0] ?? null
    if (!game) return { phase: 'none', game: null, pct: 1 }

    const kickoff = new Date(game.kickoff)
    const msLeft = kickoff.getTime() - now.getTime()
    const daysLeft = calendarDaysBetween(now, kickoff)
    const pct = Math.min(1, Math.max(0.12, 1 - msLeft / TIDE_WINDOW_MS))

    if (msLeft <= 0) return { phase: 'live', game, pct: 1, msLeft: 0, daysLeft: 0 }
    if (daysLeft === 0) return { phase: 'today', game, pct, msLeft, daysLeft }
    return { phase: 'days', game, pct, msLeft, daysLeft }
  }, [series, now])
}
