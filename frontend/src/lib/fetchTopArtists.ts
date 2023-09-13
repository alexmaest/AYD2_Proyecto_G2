import { apiUrls, baseUrl } from '@/constants/urls'

export const fetchTopArtists = async () => {
  const response = await fetch(`${baseUrl}${apiUrls.admin.topArtists}`)
  const data = await response.json()
  return data
}
