import { apiUrls, baseUrl } from '@/constants/urls'
import { SongWithCover } from '@/types/interfaces'

export default async function fetchArtistSongs (artistId: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.user.artistSongs + `/${artistId}`, {
      cache: 'no-cache'
    })

    const songs: SongWithCover[] = await response.json()

    return songs
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
