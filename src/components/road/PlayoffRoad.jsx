export default function PlayoffRoad({ stages, current, eliminated }) {
  const idx = stages.findIndex((s) => s.id === current)
  return (
    <section className="mt-6">
      <h2 className="font-display text-heading">הדרך לגמר MLS</h2>
      <ol className="mt-3 space-y-0">
        {stages.map((s, i) => {
          const reached = i <= idx
          const here = i === idx && !eliminated
          return (
            <li key={s.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border-2 ${reached ? 'border-sky bg-sky' : 'border-mist'} ${here ? 'ring-4 ring-sky/30' : ''}`}>
                  {i === stages.length - 1 && (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={reached ? '#13305A' : '#A9B8CC'} strokeWidth="2" aria-hidden="true"><path d="M8 4h8v5a4 4 0 0 1-8 0zM12 13v4M9 20h6" /></svg>
                  )}
                </span>
                {i < stages.length - 1 && <span className={`w-0.5 flex-1 ${i < idx ? 'bg-sky' : 'bg-mist/40'}`} style={{ minHeight: 28 }} />}
              </div>
              <div className="pb-4">
                <p className={`font-bold ${reached ? 'text-foam' : 'text-mist'}`}>{s.nameHe}{here ? ' · אנחנו כאן' : ''}</p>
                <p className="text-meta text-mist">{s.datesHe} · {s.formatHe}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
