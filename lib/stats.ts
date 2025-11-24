import { headers } from "next/headers"
import { redis } from "./redis"

const GITHUB_USERNAME = 'thomasjprice'

export async function getGithubCommitsThisYear(): Promise<number> {
  const year = new Date().getFullYear()
  const token = process.env.GITHUB_TOKEN

  if (!token) return 0

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  })

  if (!res.ok) return 0

  const data = await res.json()
  return data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0
}


export async function getSpotifyMinutesThisYear(): Promise<number> {
  const host = (await headers()).get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const res = await fetch(`${protocol}://${host}/api/spotify-minutes`)

  if (!res.ok) {
    throw new Error('Failed to fetch Spotify minutes')
  }

  const data = await res.json()
  return data.minutes || 0
}

export async function estimateTabsOpened(): Promise<number> {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1)
  const now = new Date()
  const days = Math.floor((+now - +startOfYear) / (1000 * 60 * 60 * 24))
  const estimatedTabsPerDay = 40

  return days * estimatedTabsPerDay
}

export async function getTotalViews(): Promise<number> {
  const count = await redis.get<number>('site:views')
  return count || 0
}