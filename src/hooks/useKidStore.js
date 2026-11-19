import { useCallback, useState } from 'react'
import { STORE_PREFIX } from '../constants.js'

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(STORE_PREFIX + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

/** A small object map kept on this device only, e.g. answers by date. */
export function useKidStore(key, fallback = {}) {
  const [value, setValue] = useState(() => read(key, fallback))

  const update = useCallback((next) => {
    setValue((prev) => {
      const v = typeof next === 'function' ? next(prev) : next
      try { window.localStorage.setItem(STORE_PREFIX + key, JSON.stringify(v)) } catch { /* storage full or blocked */ }
      return v
    })
  }, [key])

  return [value, update]
}
