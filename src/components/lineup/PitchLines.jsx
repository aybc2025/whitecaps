/** Vertical pitch markings (our goal at the bottom). */
export default function PitchLines() {
  return (
    <svg viewBox="0 0 100 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g fill="none" stroke="#BFE0CD" strokeWidth="0.6" vectorEffect="non-scaling-stroke">
        <rect x="4" y="3" width="92" height="144" />
        <line x1="4" y1="75" x2="96" y2="75" />
        <circle cx="50" cy="75" r="11" />
        <rect x="22" y="3" width="56" height="21" />
        <rect x="36" y="3" width="28" height="8" />
        <rect x="22" y="126" width="56" height="21" />
        <rect x="36" y="139" width="28" height="8" />
      </g>
    </svg>
  )
}
