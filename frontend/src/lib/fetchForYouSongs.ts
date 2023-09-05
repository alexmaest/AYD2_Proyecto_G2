import { apiUrls, baseUrl } from '@/constants/urls'
import { SongWithCover } from '@/types/interfaces'

export default async function fetchForYouSongs (id: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.user.songs + `/${id}`)

    const forYouSongs: SongWithCover[] = await response.json()

    return forYouSongs.sort(() => Math.random() - 0.5)
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
