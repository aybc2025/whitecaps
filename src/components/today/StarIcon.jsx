export default function StarIcon({ filled = true, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"
        fill={filled ? '#FFC23A' : 'none'}
        stroke={filled ? '#13305A' : '#5D6F86'}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
