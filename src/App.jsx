import { useEffect, useState } from 'react'
import TideHeader from './components/TideHeader.jsx'
import BottomNav from './components/BottomNav.jsx'
import UpdateBanner from './components/UpdateBanner.jsx'
import ParentsSheet from './components/ParentsSheet.jsx'
import TodayScreen from './components/today/TodayScreen.jsx'
import LineupScreen from './components/lineup/LineupScreen.jsx'
import FieldScreen from './components/field/FieldScreen.jsx'
import RoadScreen from './components/road/RoadScreen.jsx'
import { useContent } from './hooks/useContent.js'
import { useNow } from './hooks/useNow.js'
import { useCountdown } from './hooks/useCountdown.js'
import { pacificDate } from './clock.js'
import { TABS } from './constants.js'

function tabFromHash() {
  const id = window.location.hash.replace('#', '')
  return TABS.some((t) => t.id === id) ? id : 'today'
}

export default function App() {
  const [tab, setTabState] = useState(tabFromHash)
  const [parentsOpen, setParentsOpen] = useState(false)
  const series = useContent('series')
  const daily = useContent('daily')
  const squad = useContent('squad')

  // Tick every second only when kickoff is close.
  const coarse = useNow(60000)
  const near = useCountdown(series.data, coarse).phase === 'today'
  const now = useNow(near ? 1000 : 60000)
  const countdown = useCountdown(series.data, now)
  const today = pacificDate(now)
  const entry = daily.data?.entries?.find((e) => e.date === today) ?? null

  const setTab = (id) => {
    setTabState(id)
    window.history.replaceState(null, '', `${window.location.search}#${id}`)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const onHash = () => setTabState(tabFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <TideHeader countdown={countdown} series={series.data} onLongPress={() => setParentsOpen(true)} />
      <main className="flex-1 px-4 pb-28 pt-4">
        {tab === 'today' && (
          <TodayScreen entry={entry} loading={!daily.data && !daily.error} series={series.data} countdown={countdown} goTo={setTab} />
        )}
        {tab === 'lineup' && <LineupScreen squad={squad.data} error={squad.error} />}
        {tab === 'field' && <FieldScreen />}
        {tab === 'road' && <RoadScreen series={series.data} error={series.error} />}
      </main>
      <BottomNav tab={tab} setTab={setTab} />
      <UpdateBanner />
      <ParentsSheet open={parentsOpen} onOpenChange={setParentsOpen} entry={entry} today={today} />
    </div>
  )
}
