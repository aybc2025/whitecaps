import { useEffect, useRef } from 'react'

const COUNT = 16

/** Gold foam burst. Particles are created once and recycled on every trigger. */
export default function GoalBurst({ nonce }) {
  const root = useRef(null)

  useEffect(() => {
    if (!nonce || !root.current) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const parts = root.current.children
    for (let i = 0; i < parts.length; i++) {
      const el = parts[i]
      el.getAnimations().forEach((a) => a.cancel())
      if (reduce) continue
      const angle = (i / parts.length) * Math.PI * 2 + Math.random() * 0.3
      const dist = 90 + Math.random() * 60
      const x = Math.cos(angle) * dist
      const y = Math.sin(angle) * dist
      el.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 1 },
          { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, opacity: 0 },
        ],
        { duration: 700, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'forwards' },
      )
    }
  }, [nonce])

  return (
    <div ref={root} className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
      {Array.from({ length: COUNT }, (_, i) => (
        <span
          key={i}
          className="absolute left-0 top-0 block rounded-full"
          style={{ width: i % 3 ? 14 : 22, height: i % 3 ? 14 : 22, background: i % 2 ? '#FFC23A' : '#F5F9FD', opacity: 0 }}
        />
      ))}
    </div>
  )
}
