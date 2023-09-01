import { Suspense } from 'react'
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import fetchSongs from '@/lib/fetchSongs'
import Catalog from '@/components/Catalog'
import ArtistSong from '@/components/ArtistSong'
import { Song } from '@/types/interfaces'

export default async function Tracks () {
  const session = await getServerSession(options)
  const songs = await fetchSongs(session?.user.id ?? 0) ?? []

  return (
    <main className='flex flex-col items-start gap-16 p-16'>
      <Suspense fallback={<div>Loading...</div>}>
        <Catalog>
          <Catalog.Header title='Songs'>
            <Link
              href='/artist'
              className='text-white text-xl font-bold hover:underline cursor-pointer'
            >
              Go Back
            </Link>
          </Catalog.Header>
          <div className='w-full'>
            {songs.length === 0 && (
              <Catalog.EmptyContent
                text='You have no songs yet'
                to='/artist/upload'
                linkText='Upload a Song'
              />
            )}
            {songs.length !== 0 &&
              <Catalog.Content layout='vertical'>
                {songs.map((song: Song) => (
                  <ArtistSong
                    key={song.id}
                    song={song}
                    artist={session?.user?.username ?? 'Unknown'}
                  />
                ))}
              </Catalog.Content>}
          </div>
        </Catalog>
      </Suspense>
    </main>
  )
}
