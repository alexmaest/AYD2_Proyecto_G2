import { apiUrls, baseUrl } from '@/constants/urls'
import { ForYouAlbum } from '@/types/interfaces'

export default async function fetchForYouAlbums (id: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.user.albums + `/${id}`)

    const forYouAlbums: ForYouAlbum[] = await response.json()

    return forYouAlbums
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
