// Draws the fan sign onto a canvas. Shapes are original (wave, ball, star, mountains).
export const SIGN_COLORS = {
  harbour: { bg: '#13305A', fg: '#F5F9FD', accent: '#9DC4EC' },
  sky: { bg: '#9DC4EC', fg: '#13305A', accent: '#F5F9FD' },
  foam: { bg: '#F5F9FD', fg: '#13305A', accent: '#9DC4EC' },
}
export const STICKERS = ['wave', 'ball', 'star', 'mountains']

function wave(ctx, c, s) {
  ctx.fillStyle = c.accent
  ctx.beginPath(); ctx.moveTo(0, s * 0.86)
  for (let x = 0; x <= s; x += s / 8) ctx.quadraticCurveTo(x + s / 16, s * 0.80, x + s / 8, s * 0.86)
  ctx.lineTo(s, s); ctx.lineTo(0, s); ctx.fill()
}
function ball(ctx, c, s) {
  const r = s * 0.075, cx = s * 0.16, cy = s * 0.17
  ctx.fillStyle = '#F5F9FD'; ctx.strokeStyle = '#13305A'; ctx.lineWidth = s * 0.008
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  ctx.fillStyle = '#13305A'; ctx.beginPath()
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; ctx.lineTo(cx + Math.cos(a) * r * 0.42, cy + Math.sin(a) * r * 0.42) }
  ctx.fill()
}
function star(ctx, c, s) {
  const cx = s * 0.84, cy = s * 0.17, R = s * 0.08
  ctx.fillStyle = '#FFC23A'; ctx.strokeStyle = '#13305A'; ctx.lineWidth = s * 0.006; ctx.beginPath()
  for (let i = 0; i < 10; i++) { const r = i % 2 ? R * 0.45 : R; const a = -Math.PI / 2 + (i * Math.PI) / 5; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) }
  ctx.closePath(); ctx.fill(); ctx.stroke()
}
function mountains(ctx, c, s) {
  ctx.fillStyle = c.fg; ctx.globalAlpha = 0.18; ctx.beginPath()
  ctx.moveTo(0, s * 0.80); ctx.lineTo(s * 0.22, s * 0.58); ctx.lineTo(s * 0.38, s * 0.72); ctx.lineTo(s * 0.6, s * 0.52)
  ctx.lineTo(s * 0.82, s * 0.74); ctx.lineTo(s, s * 0.62); ctx.lineTo(s, s * 0.86); ctx.lineTo(0, s * 0.86); ctx.fill()
  ctx.globalAlpha = 1
}
const DRAW = { wave, ball, star, mountains }

function wrap(ctx, text, maxW) {
  const words = text.split(' '); const lines = []; let line = ''
  for (const w of words) {
    const t = line ? `${line} ${w}` : w
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w } else line = t
  }
  if (line) lines.push(line)
  return lines
}

export async function drawSign(canvas, { phrase, color, stickers }) {
  const s = canvas.width
  const ctx = canvas.getContext('2d')
  const c = SIGN_COLORS[color] ?? SIGN_COLORS.harbour
  try { await document.fonts.load(`${Math.round(s * 0.1)}px "Secular One"`, phrase) } catch { /* fallback font */ }
  ctx.fillStyle = c.bg; ctx.fillRect(0, 0, s, s)
  if (stickers.includes('mountains')) mountains(ctx, c, s)
  if (stickers.includes('wave')) wave(ctx, c, s)
  if (stickers.includes('ball')) ball(ctx, c, s)
  if (stickers.includes('star')) star(ctx, c, s)
  ctx.fillStyle = c.fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = 'rtl'
  let size = s * 0.13
  let lines
  do { ctx.font = `${size}px "Secular One", Rubik, sans-serif`; lines = wrap(ctx, phrase, s * 0.82); size *= 0.92 } while (lines.length > 3)
  const lh = size * 1.25
  lines.forEach((l, i) => ctx.fillText(l, s / 2, s * 0.47 + (i - (lines.length - 1) / 2) * lh))
}
