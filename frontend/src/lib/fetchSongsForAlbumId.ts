import { apiUrls, baseUrl } from '@/constants/urls'
import { Song } from '@/types/interfaces'

export default async function fetchSongsForAlbumId (albumId: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.user.songsForAlbumId + `/${albumId}`)

    const songsForAlbumId: Song[] = await response.json()

    return songsForAlbumId
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
