import { apiUrls, baseUrl } from '@/constants/urls'
import { Artist } from '@/types/interfaces'

export default async function fetchArtist () {
  try {
    const response = await fetch(baseUrl + apiUrls.user.artists)

    const artists: Artist[] = await response.json()

    return artists
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
