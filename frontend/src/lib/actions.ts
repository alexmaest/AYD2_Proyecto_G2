'use server'

import { apiUrls, baseUrl } from '@/constants/urls'
import { Song } from '@/types/interfaces'
import { revalidateTag } from 'next/cache'

export async function deleteSong (song: Song) {
  const res = await fetch(baseUrl + apiUrls.artist.deleteSong + `/${song.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await res.json()
  revalidateTag('songs')
}
