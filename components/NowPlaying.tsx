'use client'

import { useEffect, useRef, useState } from 'react'
import { SpotifyIcon } from './SpotifyIcon'

type NowPlayingTrack = {
  isPlaying: boolean
  title: string
  artist: string
  url: string
  preview?: string
}

export default function NowPlaying() {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const previousTrackUrlRef = useRef<string | null>(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const res = await fetch('/api/now-playing')
      const data = await res.json()
      setTrack(data)
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!track?.preview) return

    const audio = audioRef.current

    if (previousTrackUrlRef.current && previousTrackUrlRef.current !== track.preview) {
      audio?.pause()
      setIsPreviewPlaying(false)
    }

    previousTrackUrlRef.current = track.preview

    const handleEnded = () => {
      setIsPreviewPlaying(false)
    }

    if (audio) {
      audio.volume = 0.4
      audio.addEventListener('ended', handleEnded)
    }

    return () => {
      audio?.removeEventListener('ended', handleEnded)
      audio?.pause()
    }
  }, [track])

  const togglePlayback = () => {
    if (!track?.preview || !audioRef.current) return

    if (isPreviewPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPreviewPlaying(!isPreviewPlaying)
  }

  if (!track) return null
  return (
    <div
      className="group flex items-center gap-2 text-sm mt-4 cursor-pointer transition-colors duration-200 hover-accent"
      style={{ color: 'var(--secondary-color)' }}
      onClick={togglePlayback}
    >
      {track.preview && isPreviewPlaying ? (
        <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 4h2v12H6zm6 0h2v12h-2z" />
        </svg>
      ) : (
        <SpotifyIcon className="w-4 h-4 opacity-70" />
      )}
      <p>
        {track.title} - {track.artist}
      </p>
      <span 
        className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ color: 'var(--muted-color)' }}
      >
        {track.isPlaying ? '(Now playing)' : '(last played)'}
      </span>
      {track.preview && (
        <audio ref={audioRef} src={track.preview} preload="none" />
      )}
    </div>
  )
}
