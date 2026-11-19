import PitchLines from './PitchLines.jsx'

export default function PitchFormation({ players, onPick }) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-card border-[3px] border-[#8FC3A7] bg-pitch" dir="ltr">
      <PitchLines />
      {players.map((p) => (
        <button
          key={p.num}
          type="button"
          onClick={() => onPick(p)}
          className="press absolute flex w-[76px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          aria-label={`${p.nameHe}, מספר ${p.num}, ${p.posHe}`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-sky bg-foam font-display text-heading text-harbour">{p.num}</span>
          <span className="mt-0.5 rounded-full bg-deep/75 px-1.5 text-meta leading-tight text-foam" dir="rtl">{p.nameHe.split(' ').slice(-1)[0]}</span>
        </button>
      ))}
    </div>
  )
}
