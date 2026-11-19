import { GLOSSARY } from '../../data/field.js'

export default function Glossary() {
  return (
    <section className="mt-6">
      <h2 className="font-display text-heading">מילון כדורגל</h2>
      <dl className="mt-2 space-y-2">
        {GLOSSARY.map((g) => (
          <div key={g.term} className="card">
            <dt className="font-bold">{g.term}</dt>
            <dd className="text-label">{g.textHe}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
