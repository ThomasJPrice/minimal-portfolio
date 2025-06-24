'use client'

import { section } from 'framer-motion/client'
import { useEffect, useState } from 'react'

type Stats = {
  githubCommits: number
  spotifyMinutes: number
  tabsOpened: number
  totalViews: number
}

export default function StatsThisYear() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/stats-this-year')
      const data = await res.json()
      setStats(data)
    }

    fetchStats()
  }, [])

  if (!stats) return null

  return (
    <section className='mt-12'>
      <h2>so far this year</h2>

      <div>        <div className="grid grid-cols-2 gap-x-4">
          <p style={{ color: 'var(--secondary-color)' }}>GitHub commits</p>
          <p>{stats.githubCommits.toLocaleString()}</p>

          <p style={{ color: 'var(--secondary-color)' }}>Spotify minutes</p>
          <p>{stats.spotifyMinutes.toLocaleString()}</p>

          <p style={{ color: 'var(--secondary-color)' }}>Tabs opened</p>
          <p>{stats.tabsOpened.toLocaleString()}</p>

          <p style={{ color: 'var(--secondary-color)' }}>Page views</p>
          <p>{stats.totalViews.toLocaleString()}</p>
        </div>
      </div>
    </section>
  )
}
