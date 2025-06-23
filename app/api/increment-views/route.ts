import { redis } from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function POST() {
  await redis.incr('site:views')
  return NextResponse.json({ ok: true })
}

export async function GET() {
  const count = await redis.get<number>('site:views')
  return NextResponse.json({ count: count || 0 })
}
