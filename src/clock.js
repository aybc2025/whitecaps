import { TZ } from './constants.js'

const dateFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' })

/** YYYY-MM-DD in Vancouver time. */
export function pacificDate(d) {
  return dateFmt.format(d)
}

/** Whole calendar days from a to b (Vancouver dates). */
export function calendarDaysBetween(a, b) {
  const da = Date.parse(pacificDate(a) + 'T00:00:00Z')
  const db = Date.parse(pacificDate(b) + 'T00:00:00Z')
  return Math.round((db - da) / 86400000)
}

// B.C. has been on year-round Pacific Time (UTC-7) since Nov 2026.
const VAN_OFFSET = '-07:00'

/**
 * Current time, with test overrides:
 *   ?now=2026-11-22T17:12   (Vancouver local time)
 *   ?day=2026-11-22         (that day at 08:00 Vancouver)
 */
export function readOverride() {
  try {
    const p = new URLSearchParams(window.location.search)
    const now = p.get('now')
    const day = p.get('day')
    if (now && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(now)) return new Date(now + ':00' + VAN_OFFSET)
    if (day && /^\d{4}-\d{2}-\d{2}$/.test(day)) return new Date(day + 'T08:00:00' + VAN_OFFSET)
  } catch { /* ignore */ }
  return null
}

const whenFmt = new Intl.DateTimeFormat('he-IL', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'numeric' })
const timeFmt = new Intl.DateTimeFormat('he-IL', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

export function formatGameDay(iso) {
  return whenFmt.format(new Date(iso))
}
export function formatGameTime(iso) {
  return timeFmt.format(new Date(iso))
}
