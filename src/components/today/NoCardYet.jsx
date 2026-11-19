export default function NoCardYet({ goTo, seasonOver }) {
  if (seasonOver) {
    return (
      <article className="card py-8 text-center">
        <h1 className="font-display text-title">העונה נגמרה</h1>
        <p className="mt-2">תודה שעודדת איתנו! אפשר עדיין לבקר את השחקנים בלשונית ההרכב.</p>
        <button type="button" className="btn-primary mt-4" onClick={() => goTo('lineup')}>להרכב</button>
      </article>
    )
  }
  return (
    <article className="card py-8 text-center">
      <h1 className="font-display text-title">הכרטיס של היום עוד בדרך</h1>
      <p className="mt-2">בינתיים: מי הכובש הכי טוב בקבוצה?</p>
      <button type="button" className="btn-primary mt-4" onClick={() => goTo('lineup')}>לפגוש את ההרכב</button>
    </article>
  )
}
