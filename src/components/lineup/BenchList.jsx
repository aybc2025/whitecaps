export default function BenchList({ players, onPick }) {
  return (
    <ul className="mt-2 grid grid-cols-2 gap-2">
      {players.map((p) => (
        <li key={p.num}>
          <button type="button" onClick={() => onPick(p)} className="press flex min-h-[52px] w-full items-center gap-2 rounded-card bg-foam/10 px-3 text-start">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foam font-display text-label text-harbour">{p.num}</span>
            <span className="text-label leading-tight">{p.nameHe}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
