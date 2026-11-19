export default function Jersey({ num }) {
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden="true">
      <path d="M30 12 L42 8 Q50 16 58 8 L70 12 L90 28 L80 42 L72 36 L72 92 L28 92 L28 36 L20 42 L10 28Z" fill="#F5F9FD" stroke="#13305A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M28 58 Q39 50 50 58 T72 58" stroke="#9DC4EC" strokeWidth="5" fill="none" />
      <text x="50" y="84" textAnchor="middle" fontSize="24" fontFamily="'Secular One', Rubik, sans-serif" fill="#13305A">{num}</text>
    </svg>
  )
}
