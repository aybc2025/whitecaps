export function opponentName(series, fallback = 'היריבה') {
  if (!series?.opponent) return fallback
  return series.candidates?.find((c) => c.id === series.opponent)?.nameHe ?? fallback
}

export function gameByNumber(series, n) {
  return series?.games?.find((g) => g.n === n) ?? null
}

/** 'win' | 'loss' | 'pending' for one series game (penalties decide ties). */
export function gameOutcome(g) {
  if (!g || g.us === null || g.them === null) return 'pending'
  if (g.us !== g.them) return g.us > g.them ? 'win' : 'loss'
  if (g.pensUs === null || g.pensThem === null) return 'pending'
  return g.pensUs > g.pensThem ? 'win' : 'loss'
}

export function seriesTally(series) {
  const games = series?.games ?? []
  return {
    wins: games.filter((g) => gameOutcome(g) === 'win').length,
    losses: games.filter((g) => gameOutcome(g) === 'loss').length,
  }
}
