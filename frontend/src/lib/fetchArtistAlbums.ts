import { apiUrls, baseUrl } from '@/constants/urls'
import { ForYouAlbum, Album } from '@/types/interfaces'

export default async function fetchArtistAlbums (artistId: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.user.artistAlbums + `/${artistId}`)

    const data = await response.json()

    const albums: ForYouAlbum[] = data.map((album: Album) => ({
      id: album.id,
      title: album.name,
      cover: album.albumUrl,
      type: album.type
    }))

    return albums
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
