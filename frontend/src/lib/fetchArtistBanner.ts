import { apiUrls, baseUrl } from '@/constants/urls'

export default async function fetchArtistBanner (artistId: number) {
  try {
    const response = await fetch(baseUrl + apiUrls.artist.banner + `/${artistId}`)

    const banner = await response.json()

    return banner?.image
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
