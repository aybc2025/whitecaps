export default function CardShell({ title, chip = 'הכרטיס של היום', children }) {
  return (
    <article className="card">
      <span className="chip-label">{chip}</span>
      <h1 className="mt-2 font-display text-title">{title}</h1>
      <div className="mt-2">{children}</div>
    </article>
  )
}
