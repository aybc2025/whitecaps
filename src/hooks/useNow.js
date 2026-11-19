import { useEffect, useState } from 'react'
import { readOverride } from '../clock.js'

/** Ticking clock. A ?now= / ?day= override freezes it for testing. */
export function useNow(intervalMs = 60000) {
  const [override] = useState(readOverride)
  const [now, setNow] = useState(() => override ?? new Date())

  useEffect(() => {
    if (override) return undefined
    const id = setInterval(() => setNow(new Date()), intervalMs)
    const onVisible = () => { if (!document.hidden) setNow(new Date()) }
    document.addEventListener('visibilitychange', onVisible)
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', onVisible) }
  }, [override, intervalMs])

  return now
}
