import { apiUrls, baseUrl } from '@/constants/urls'
import { UserProfile } from '@/types/interfaces'

export default async function fetchUserProfileData (userId: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.artist.profile, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })

    const user: UserProfile = await response.json()

    return user
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
