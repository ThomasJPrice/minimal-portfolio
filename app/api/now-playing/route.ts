import { getNowPlaying } from '@/lib/spotify'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await getNowPlaying()

  const deezerSearch = await fetch(
    `https://api.deezer.com/search?q=track:"${encodeURIComponent(data.title)}" artist:"${encodeURIComponent(data.artist)}"`
  ).then((res) => res.json())

  const preview = deezerSearch.data?.[0]?.preview ?? null

  return NextResponse.json({
    ...data,
    preview,
  })
}
