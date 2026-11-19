import { useRef } from 'react'

/** Pointer handlers that fire `onLong` after a sustained press. */
export function useLongPress(onLong, ms = 700) {
  const timer = useRef(null)
  const clear = () => { clearTimeout(timer.current); timer.current = null }
  return {
    onPointerDown: () => { clear(); timer.current = setTimeout(onLong, ms) },
    onPointerUp: clear,
    onPointerLeave: clear,
    onPointerCancel: clear,
    onContextMenu: (e) => e.preventDefault(),
  }
}
