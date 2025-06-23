'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type NowPlayingTrack = {
  isPlaying: boolean
  title: string
  artist: string
  url: string
}

export default function NowPlaying() {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const res = await fetch('/api/now-playing')
      const data = await res.json()
      setTrack(data)
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (!track) return null

  return (
    <div className="group flex items-center gap-2 text-sm text-gray-700 mt-4 cursor-default">
      <Image width={16} height={16} src="/spotify.svg" alt="Spotify" className="w-4 h-4 opacity-60" />
      <p>
        {track.title} - {track.artist}
      </p>
      <span className="ml-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {track.isPlaying ? '(Now playing)' : '(last played)'}
      </span>
    </div>
  )
}
