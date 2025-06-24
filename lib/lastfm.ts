const API_KEY = process.env.LASTFM_API_KEY
const USERNAME = process.env.LASTFM_USERNAME

const year = new Date().getFullYear()
const FROM = Math.floor(new Date(`${year}-01-01`).getTime() / 1000)

const AVG_TRACK_DURATION = 210 // seconds (3.5 min)

export async function fetchSpotifyMinutesThisYear(): Promise<number> {
  let page = 1
  let totalPages = 1
  let totalSeconds = 0

  do {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&from=${FROM}&limit=200&page=${page}`)
    const data = await res.json()

    if (!data.recenttracks?.track) break
    totalPages = parseInt(data.recenttracks['@attr'].totalPages)

    for (const track of data.recenttracks.track) {
      const dur = track.duration ? parseInt(track.duration) / 1000 : AVG_TRACK_DURATION
      totalSeconds += dur
    }

    page++
  } while (page <= totalPages)

  return Math.round(totalSeconds / 60)
}
