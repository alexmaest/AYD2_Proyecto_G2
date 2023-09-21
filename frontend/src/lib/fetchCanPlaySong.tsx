import { apiUrls, baseUrl } from '@/constants/urls'
import { CanPlaySong } from '@/types/interfaces'

export default async function fetchCanPlaySong (userId: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.user.userLimit + `/${userId}`, {
      cache: 'no-cache'
    })

    const canPlay: CanPlaySong = await response.json()
    return canPlay
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
