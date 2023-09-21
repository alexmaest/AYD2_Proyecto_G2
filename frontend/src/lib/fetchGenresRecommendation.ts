import { apiUrls, baseUrl } from '@/constants/urls'
import { GenresRecommendation } from '@/types/interfaces'

export default async function fetchGenresRecommendations () {
  try {
    const response = await fetch(baseUrl + apiUrls.user.recomendations, {
      cache: 'no-cache'
    })

    const genresRecommendation: GenresRecommendation = await response.json()

    return genresRecommendation
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
