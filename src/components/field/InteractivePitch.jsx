const LINE = '#BFE0CD'
const ON = '#FFC23A'

function Zone({ id, active, onPick, children, label }) {
  const on = active === id
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={on}
      onClick={() => onPick(id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(id) } }}
      className="cursor-pointer outline-none"
      style={{ '--z': on ? ON : LINE }}
    >
      {children}
    </g>
  )
}

/** Horizontal pitch with tappable parts. Order matters: smaller zones sit on top. */
export default function InteractivePitch({ active, onPick, zones }) {
  const z = (id, el) => <Zone id={id} active={active} onPick={onPick} label={zones[id].nameHe}>{el}</Zone>
  const stroke = { stroke: 'var(--z)', strokeWidth: 1, fill: 'none' }
  const hit = { stroke: 'transparent', strokeWidth: 7, fill: 'none' }

  return (
    <svg viewBox="0 0 150 100" className="block w-full rounded-card border-[3px] border-[#8FC3A7] bg-pitch" dir="ltr">
      {z('touchline', <><line x1="4" y1="4" x2="146" y2="4" {...hit} /><line x1="4" y1="96" x2="146" y2="96" {...hit} />
        <line x1="4" y1="4" x2="146" y2="4" {...stroke} /><line x1="4" y1="96" x2="146" y2="96" {...stroke} /></>)}
      <g stroke={LINE} strokeWidth="1" fill="none">
        <line x1="4" y1="4" x2="4" y2="96" /><line x1="146" y1="4" x2="146" y2="96" />
        <rect x="124" y="22" width="22" height="56" /><rect x="138" y="36" width="8" height="28" />
        <circle cx="131" cy="50" r="0.9" fill={LINE} /><rect x="146" y="44" width="3" height="12" />
      </g>
      {z('halfway', <><line x1="75" y1="4" x2="75" y2="96" {...hit} /><line x1="75" y1="4" x2="75" y2="96" {...stroke} /></>)}
      {z('centerCircle', <><circle cx="75" cy="50" r="11" fill="transparent" stroke="transparent" strokeWidth="6" /><circle cx="75" cy="50" r="11" {...stroke} /></>)}
      {z('penaltyBox', <rect x="4" y="22" width="22" height="56" fill="var(--z)" fillOpacity="0.12" stroke="var(--z)" strokeWidth="1" />)}
      {z('goalArea', <rect x="4" y="36" width="8" height="28" fill="var(--z)" fillOpacity="0.15" stroke="var(--z)" strokeWidth="1" />)}
      {z('penaltySpot', <><circle cx="19" cy="50" r="7" fill="transparent" /><circle cx="19" cy="50" r="1.6" fill="var(--z)" /></>)}
      {z('goal', <><rect x="0" y="40" width="6" height="20" fill="transparent" /><rect x="0.5" y="44" width="3.5" height="12" fill="var(--z)" fillOpacity="0.5" stroke="var(--z)" strokeWidth="1" /></>)}
      {z('corner', <><rect x="130" y="80" width="16" height="16" fill="transparent" />
        <path d="M141 96 A5 5 0 0 1 146 91" {...stroke} /><line x1="146" y1="96" x2="146" y2="86" stroke="var(--z)" strokeWidth="1" />
        <path d="M146 86 l-4 2 l4 2z" fill="var(--z)" /></>)}
    </svg>
  )
}
