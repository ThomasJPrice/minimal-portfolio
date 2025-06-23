import { redis } from "./redis"

export async function getGithubCommitsThisYear(): Promise<number> {
  const username = 'thomasjprice'
  const year = new Date().getFullYear()

  const res = await fetch(`https://api.github.com/search/commits?q=author:${username}+committer-date:${year}-01-01..${year}-12-31`, {
    headers: {
      Accept: 'application/vnd.github.cloak-preview',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })

  if (!res.ok) return 0

  const data = await res.json()
  return data.total_count || 0
}


export async function getSpotifyMinutesThisYear(): Promise<number> {
  return 42100 // or fetch from API if you've saved data elsewhere
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