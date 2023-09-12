import { apiUrls, baseUrl } from '@/constants/urls'

export const fetchTopFiveSongs = async () => {
  const response = await fetch(`${baseUrl}${apiUrls.admin.topSongs}`)
  const data = await response.json()
  return data
}
