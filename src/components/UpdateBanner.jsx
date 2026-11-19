import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateBanner() {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_url, reg) {
      if (reg) setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000)
    },
  })
  if (!needRefresh) return null
  return (
    <div className="fixed inset-x-0 bottom-[84px] z-30 mx-auto max-w-md px-4">
      <div className="card flex items-center justify-between gap-3 shadow-lg">
        <p className="text-label">יש גרסה חדשה לאפליקציה</p>
        <button type="button" className="btn-soft shrink-0 py-2" onClick={() => updateServiceWorker(true)}>לרענן</button>
      </div>
    </div>
  )
}
