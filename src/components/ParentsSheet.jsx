import Sheet from './Sheet.jsx'

export default function ParentsSheet({ open, onOpenChange, entry, today }) {
  const sources = entry?.sources ?? []
  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="להורים">
      <h2 className="font-display text-title">להורים</h2>
      <p className="mt-2 text-label text-line">הכרטיס היומי מתעדכן כל בוקר ב־5:30. התאריך היום: <bdi>{today}</bdi></p>
      <h3 className="mt-4 text-heading">מקורות לכרטיס של היום</h3>
      {sources.length === 0 ? (
        <p className="mt-1 text-label text-line">אין עדיין כרטיס להיום.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {sources.map((s) => (
            <li key={s} className="text-label">
              <a href={s} target="_blank" rel="noopener noreferrer" className="break-all underline" dir="ltr">{s}</a>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  )
}
