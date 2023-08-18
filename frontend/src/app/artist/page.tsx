'use client'

import ArtistSong from '@/components/ArtistSong'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ArtistPage () {
  const { data: session, status } = useSession()
  const [songs, setSongs] = useState([])

  const id = ((session?.user?.id) != null) ? session.user.id : 0

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(baseUrl + apiUrls.artist.getSongs + `/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          setSongs(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (id !== 0) void fetchSongs()
  }, [id])

  if (status === 'loading') {
    return (
      <p>Loading ...</p>
    )
  }

  return (
    <main className='flex flex-col items-start gap-16 p-16'>
      <section className='w-full flex flex-col items-start gap-8'>
        <div className=' w-full flex justify-between items-center'>
          <h3 className='font-bold text-3xl text-white'>Tracks</h3>
          <Link
            href='/artist/tracks'
            className='text-white text-xl font-bold hover:underline cursor-pointer'
          >
            See All
          </Link>
        </div>
        <div className='w-full'>
          {songs.length === 0 && (
            <div className='w-full flex flex-col items-center justify-center'>
              <h3 className='text-white text-2xl font-bold'>No songs uploaded yet</h3>
              <Link
                href='/artist/upload'
                className='text-white text-xl font-bold hover:underline cursor-pointer'
              >
                Upload
              </Link>
            </div>
          )}

          {songs.length !== 0 &&
            <div className='flex flex-col items-start gap-8'>
              {songs.map((song: any) => (
                <ArtistSong
                  key={song.id}
                  name={song.name}
                  artist={session?.user.username ?? 'Unknown'}
                  duration={song.duration}
                />
              ))}
            </div>}
        </div>
      </section>
    </main>
  )
}
