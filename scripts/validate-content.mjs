// Validates public/content/*.json. Run before every commit and in CI.
// Usage: node scripts/validate-content.mjs
import { readFileSync } from 'node:fs'

const errors = []
const fail = (where, msg) => errors.push(`${where}: ${msg}`)
const load = (name) => {
  try { return JSON.parse(readFileSync(new URL(`../public/content/${name}.json`, import.meta.url), 'utf8')) }
  catch (e) { fail(name, `cannot parse JSON (${e.message})`); return null }
}
const isStr = (v, max = 400) => typeof v === 'string' && v.trim().length > 0 && v.length <= max
const isDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))
const isKick = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-07:00$/.test(v)
const isScore = (v) => v === null || (Number.isInteger(v) && v >= 0 && v < 30)
const noMarkup = (where, v) => { if (typeof v === 'string' && /[<>]/.test(v)) fail(where, 'no < or > allowed in text') }

const TEMPLATES = ['fact', 'poll', 'quiz', 'signMaker', 'matchDay', 'recap']

const daily = load('daily')
if (daily) {
  if (!Array.isArray(daily.entries)) fail('daily', 'entries must be an array')
  const seen = new Set()
  for (const [i, e] of (daily.entries ?? []).entries()) {
    const w = `daily.entries[${i}]${e?.date ? ` (${e.date})` : ''}`
    if (!isDate(e.date)) fail(w, 'date must be YYYY-MM-DD')
    if (seen.has(e.date)) fail(w, 'duplicate date')
    seen.add(e.date)
    if (!TEMPLATES.includes(e.template)) fail(w, `template must be one of ${TEMPLATES.join(', ')}`)
    if (!isStr(e.title, 60)) fail(w, 'title: 1-60 chars')
    if (e.body !== undefined && !isStr(e.body, 420)) fail(w, 'body: up to 420 chars')
    for (const [k, v] of Object.entries(e)) {
      if (typeof v === 'string') noMarkup(`${w}.${k}`, v)
    }
    if (!Array.isArray(e.sources) || e.sources.length === 0) fail(w, 'sources: at least one https URL')
    for (const s of e.sources ?? []) if (!/^https:\/\/[^\s<>"]+$/.test(s)) fail(w, `bad source URL: ${s}`)
    if (e.pollRef !== undefined && (!isDate(e.pollRef) || !isStr(e.pollAnswer, 20))) fail(w, 'pollRef needs a date and pollAnswer an option id')

    if (e.template === 'fact') {
      if (!Array.isArray(e.facts)) fail(w, 'fact: facts must be an array')
      for (const f of e.facts ?? []) { if (!isStr(f, 200)) fail(w, 'fact: each fact 1-200 chars'); noMarkup(w, f) }
      if (e.visual !== undefined && e.visual !== 'series') fail(w, 'fact: visual can only be "series"')
      if (e.big !== undefined && (!isStr(e.big, 8) || !isStr(e.bigLabel, 60))) fail(w, 'fact: big (≤8) needs bigLabel (≤60)')
    }
    if (e.template === 'poll') {
      if (!isStr(e.question, 120)) fail(w, 'poll: question required')
      if (!Array.isArray(e.options) || e.options.length < 2 || e.options.length > 4) fail(w, 'poll: 2-4 options')
      for (const o of e.options ?? []) if (!isStr(o.id, 20) || !isStr(o.label, 40)) fail(w, 'poll: option needs id and label')
    }
    if (e.template === 'quiz') {
      if (!Array.isArray(e.questions) || e.questions.length < 2 || e.questions.length > 6) fail(w, 'quiz: 2-6 questions')
      for (const q of e.questions ?? []) {
        if (!isStr(q.q, 140)) fail(w, 'quiz: q required')
        if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) fail(w, 'quiz: 2-4 options')
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) fail(w, 'quiz: answer is the index of the right option')
        if (new Set(q.options ?? []).size !== (q.options ?? []).length) fail(w, 'quiz: options must be unique')
      }
    }
    if (e.template === 'signMaker') {
      if (!Array.isArray(e.phrases) || e.phrases.length < 2 || e.phrases.length > 8) fail(w, 'signMaker: 2-8 phrases')
      for (const p of e.phrases ?? []) if (!isStr(p, 30)) fail(w, 'signMaker: each phrase 1-30 chars')
    }
    if (e.template === 'matchDay' || e.template === 'recap') {
      if (!Number.isInteger(e.gameN) || e.gameN < 1) fail(w, `${e.template}: gameN required`)
      if (!['r1', 'csf', 'cf', 'cup'].includes(e.stage)) fail(w, `${e.template}: stage must be r1, csf, cf or cup`)
    }
    if (e.template === 'recap') {
      if (!isScore(e.us) || !isScore(e.them) || e.us === null || e.them === null) fail(w, 'recap: us and them scores required')
      if ((e.pensUs ?? null) !== null && (!isScore(e.pensUs) || !isScore(e.pensThem))) fail(w, 'recap: pensUs and pensThem must both be set')
    }
    if (e.template === 'matchDay' && e.checklist !== undefined) {
      if (!Array.isArray(e.checklist) || e.checklist.length > 6) fail(w, 'matchDay: checklist up to 6 items')
    }
  }
}

const series = load('series')
if (series) {
  if (typeof series.eliminated !== 'boolean') fail('series', 'eliminated must be true/false')
  const stageIds = (series.stages ?? []).map((s) => s.id)
  if (!stageIds.includes(series.currentStage)) fail('series', 'currentStage must match a stage id')
  const ids = (series.candidates ?? []).map((c) => c.id)
  if (series.opponent !== null && !ids.includes(series.opponent)) fail('series', 'opponent must be null or a candidate id')
  for (const g of series.games ?? []) {
    const w = `series.games n=${g.n}`
    if (!isKick(g.kickoff)) fail(w, 'kickoff must be Vancouver time with -07:00, like 2026-11-22T18:30:00-07:00')
    for (const k of ['us', 'them', 'pensUs', 'pensThem']) if (!isScore(g[k])) fail(w, `${k} must be null or 0-29`)
    if ((g.us === null) !== (g.them === null)) fail(w, 'us and them are both set or both null')
    if (typeof g.home !== 'boolean') fail(w, 'home must be true/false')
  }
}

const squad = load('squad')
if (squad) {
  for (const p of [...(squad.starters ?? []), ...(squad.others ?? [])]) {
    const w = `squad #${p.num}`
    if (!Number.isInteger(p.num)) fail(w, 'num required')
    for (const k of ['nameHe', 'nameEn', 'posHe', 'countryHe', 'factHe']) if (!isStr(p[k], 200)) fail(w, `${k} required`)
  }
  for (const p of squad.starters ?? []) {
    if (!(p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100)) fail(`squad #${p.num}`, 'x and y must be 0-100')
  }
  if ((squad.starters ?? []).length !== 11) fail('squad', 'exactly 11 starters')
}

if (errors.length) {
  console.error(`❌ content invalid (${errors.length}):\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log('✅ content valid')
