import { fetchSpotifyMinutesThisYear } from '@/lib/lastfm'
import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const minutes = await fetchSpotifyMinutesThisYear()
    await redis.set('spotify:minutes', minutes)
    return NextResponse.json({ ok: true, minutes })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Failed to update' }, { status: 500 })
  }
}

export async function GET() {
  const minutes = await redis.get<number>('spotify:minutes')
  return NextResponse.json({ minutes: minutes || 0 })
}
