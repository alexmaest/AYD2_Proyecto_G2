import { apiUrls, baseUrl } from '@/constants/urls'
import { Album } from '@/types/interfaces'

export default async function fetchAlbums (id: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.artist.getAlbums + `/${id}`)

    const albums: Album[] = await response.json()

    return albums
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
