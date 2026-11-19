import { gameOutcome } from '../../seriesHelpers.js'

const LABEL = { win: 'ניצחון', loss: 'הפסד', pending: '' }

export default function SeriesBalls({ series }) {
  const games = series?.games ?? []
  if (games.length < 2) return null
  return (
    <ul className="my-3 flex justify-center gap-3" aria-label="משחקי הסדרה">
      {games.map((g) => {
        const o = gameOutcome(g)
        const fill = o === 'win' ? 'bg-harbour text-foam' : 'bg-foam text-harbour'
        const border = g.ifNeeded && o === 'pending' ? 'border-dashed' : 'border-solid'
        return (
          <li key={g.n} className={`flex h-[84px] w-[84px] flex-col items-center justify-center rounded-full border-[3px] border-harbour text-center text-meta leading-tight ${fill} ${border} ${o === 'loss' ? 'opacity-60' : ''}`}>
            <span className="font-bold">משחק {g.n}</span>
            <span>{LABEL[o] || (g.home ? 'אצלנו' : 'בחוץ')}</span>
            {g.ifNeeded && o === 'pending' && <span>אם צריך</span>}
          </li>
        )
      })}
    </ul>
  )
}
