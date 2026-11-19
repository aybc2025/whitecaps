import { useEffect, useState } from 'react'
import { BASE } from '../constants.js'

/** Loads public/content/<name>.json. The service worker serves it network-first. */
export function useContent(name) {
  const [state, setState] = useState({ data: null, error: null })

  useEffect(() => {
    let alive = true
    fetch(`${BASE}content/${name}.json`, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => alive && setState({ data, error: null }))
      .catch((error) => alive && setState({ data: null, error }))
    return () => { alive = false }
  }, [name])

  return state
}
