import { apiUrls, baseUrl } from '@/constants/urls'
import { Song } from '@/types/interfaces'

export default async function fetchSongs (id: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.artist.getSongs + `/${id}`)

    const songs: Song[] = await response.json()

    return songs
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
