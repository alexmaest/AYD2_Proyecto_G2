import { apiUrls, baseUrl } from '@/constants/urls'
import { Song } from '@/types/interfaces'

export default async function fetchForYouSongs (id: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.user.songs + `/${id}`)

    const forYouSongs: Song[] = await response.json()

    return forYouSongs
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
