import { useEffect, useRef, useState } from 'react'
import CardShell from './CardShell.jsx'
import { useKidStore } from '../../hooks/useKidStore.js'
import { drawSign, SIGN_COLORS, STICKERS } from './signCanvas.js'

const STICKER_HE = { wave: 'גל', ball: 'כדור', star: 'כוכב', mountains: 'הרים' }
const COLOR_HE = { harbour: 'כחול כהה', sky: 'תכלת', foam: 'לבן' }

export default function SignMakerCard({ entry }) {
  const phrases = entry.phrases ?? ['קדימה וייטקאפס!']
  const [draft, setDraft] = useKidStore('signDraft', { phrase: phrases[0], color: 'harbour', stickers: ['wave', 'star'] })
  const canvas = useRef(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (canvas.current) drawSign(canvas.current, draft) }, [draft])

  const toggle = (k) => setDraft((d) => ({ ...d, stickers: d.stickers.includes(k) ? d.stickers.filter((x) => x !== k) : [...d.stickers, k] }))

  const save = () => {
    setSaving(true)
    canvas.current.toBlob(async (blob) => {
      const file = new File([blob], 'whitecaps-sign.png', { type: 'image/png' })
      try {
        if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file] })
        else {
          const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; a.click()
          setTimeout(() => URL.revokeObjectURL(a.href), 2000)
        }
      } catch { /* share cancelled */ }
      setSaving(false)
    }, 'image/png')
  }

  return (
    <CardShell title={entry.title}>
      {entry.body && <p>{entry.body}</p>}
      <canvas ref={canvas} width={1080} height={1080} className="mt-3 aspect-square w-full rounded-card" aria-label={`שלט: ${draft.phrase}`} />
      <p className="mt-3 text-label font-bold">מה כתוב?</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {phrases.map((p) => (
          <button key={p} type="button" aria-pressed={draft.phrase === p} onClick={() => setDraft((d) => ({ ...d, phrase: p }))}
            className={`press min-h-[44px] rounded-full px-3 text-label ${draft.phrase === p ? 'bg-harbour text-foam' : 'bg-chip text-harbour'}`}>{p}</button>
        ))}
      </div>
      <p className="mt-3 text-label font-bold">צבע</p>
      <div className="mt-1 flex gap-2">
        {Object.keys(SIGN_COLORS).map((k) => (
          <button key={k} type="button" aria-label={COLOR_HE[k]} aria-pressed={draft.color === k} onClick={() => setDraft((d) => ({ ...d, color: k }))}
            className={`press h-11 w-11 rounded-full border-[3px] ${draft.color === k ? 'border-harbour' : 'border-chip'}`} style={{ background: SIGN_COLORS[k].bg }} />
        ))}
      </div>
      <p className="mt-3 text-label font-bold">מדבקות</p>
      <div className="mt-1 flex flex-wrap gap-2">
        {STICKERS.map((k) => (
          <button key={k} type="button" aria-pressed={draft.stickers.includes(k)} onClick={() => toggle(k)}
            className={`press min-h-[44px] rounded-full px-4 text-label ${draft.stickers.includes(k) ? 'bg-harbour text-foam' : 'bg-chip text-harbour'}`}>{STICKER_HE[k]}</button>
        ))}
      </div>
      <button type="button" className="btn-primary mt-4" onClick={save} disabled={saving}>{saving ? 'שומר…' : 'לשמור את השלט'}</button>
    </CardShell>
  )
}
