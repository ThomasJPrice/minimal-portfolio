import { NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/spotify'
import { estimateTabsOpened, getGithubCommitsThisYear, getSpotifyMinutesThisYear, getTotalViews } from '@/lib/stats'

export async function GET() {
  const [githubCommits, spotifyMinutes, tabsOpened, totalViews] = await Promise.all([
    getGithubCommitsThisYear(),
    getSpotifyMinutesThisYear(),
    estimateTabsOpened(),
    getTotalViews(),
  ])

  return NextResponse.json({ githubCommits, spotifyMinutes, tabsOpened, totalViews })
}
