/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      harbour: '#13305A', // main background; text on foam
      deep: '#0E2648',    // bottom nav only
      sky: '#9DC4EC',     // accent, the wave, active tab
      foam: '#F5F9FD',    // cards; text on harbour
      mist: '#A9B8CC',    // secondary text on harbour only (>=13px)
      chip: '#DCE9F7',    // soft fills inside foam cards
      line: '#5D6F86',    // secondary text on foam (5.3:1)
      pitch: '#2F7D5B',   // field drawings only
      gold: '#FFC23A',    // goals, stars, wins only — never text on foam
    },
    fontFamily: {
      display: ['"Secular One"', 'Rubik', 'sans-serif'],
      body: ['Rubik', 'sans-serif'],
    },
    fontSize: {
      meta: ['13px', '1.4'],
      label: ['15px', '1.45'],
      body: ['17px', '1.55'],
      heading: ['21px', '1.25'],
      title: ['27px', '1.15'],
      display: ['34px', '1.1'],
      hero: ['52px', '1'],
    },
    borderRadius: { none: '0', card: '20px', sheet: '28px', full: '9999px' },
    extend: {
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
