import { apiUrls, baseUrl } from '@/constants/urls'

export const fetchTopAlbums = async () => {
  const response = await fetch(`${baseUrl}${apiUrls.admin.topAlbums}`)
  const data = await response.json()
  return data
}
