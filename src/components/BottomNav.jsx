import { TABS } from '../constants.js'

const ICONS = {
  today: <><path d="M2 15c3-3 5-3 8 0s5 3 8 0 3-2 4-2" /><path d="M2 20c3-3 5-3 8 0s5 3 8 0" /><path d="M12 3v5M9.5 5.5h5" /></>,
  lineup: <><circle cx="12" cy="7" r="3" /><path d="M6 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /></>,
  field: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 12h18" /><circle cx="12" cy="12" r="3" /></>,
  road: <><path d="M8 4h8v5a4 4 0 0 1-8 0z" /><path d="M16 6h2a2 2 0 0 1-2 3M8 6H6a2 2 0 0 0 2 3" /><path d="M12 13v4M9 20h6" /></>,
}

export default function BottomNav({ tab, setTab }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 bg-deep pb-[env(safe-area-inset-bottom)]" aria-label="ניווט">
      <ul className="mx-auto flex max-w-md">
        {TABS.map((t) => {
          const on = t.id === tab
          return (
            <li key={t.id} className="flex-1">
              <button
                type="button"
                onClick={() => setTab(t.id)}
                aria-current={on ? 'page' : undefined}
                className={`press flex min-h-[64px] w-full flex-col items-center justify-center gap-1 text-meta ${on ? 'text-sky' : 'text-mist'}`}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[t.id]}
                </svg>
                {t.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
