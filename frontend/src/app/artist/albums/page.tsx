import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { Suspense } from 'react'
import Link from 'next/link'
import fetchAlbums from '@/lib/fetchAlbums'
import { Album } from '@/types/interfaces'
import ArtistAlbum2 from '@/components/ArtistAlbum2'

export default async function Albums () {
  const session = await getServerSession(options)
  const albums = await fetchAlbums(session?.user?.id ?? 0) ?? []

  return (
    <main className='flex flex-col items-start gap-16 p-16'>
      <Suspense fallback={<div>Loading...</div>}>
        <section className='w-full flex flex-col items-start gap-8'>
          <div className=' w-full flex justify-between items-center'>
            <h3 className='font-bold text-3xl text-white'>Albums</h3>
            <Link
              href='/artist'
              className='text-white text-xl font-bold hover:underline cursor-pointer'
            >
              Go Back
            </Link>
          </div>
          <div className='w-full'>
            {albums.length === 0 && (
              <div className='w-full flex flex-col items-center justify-center'>
                <h3 className='text-white text-2xl font-bold'>No albums created yet</h3>
                <Link
                  href='/artist/create-album'
                  className='text-white text-xl font-bold hover:underline cursor-pointer'
                >
                  Add Album
                </Link>
              </div>
            )}
            {albums.length !== 0 &&
              <div className='flex flex-col items-start gap-16 px-48'>
                {albums.map((album: Album) => (
                  <ArtistAlbum2
                    key={album.id}
                    artistName={session?.user?.username ?? 'Unknown'}
                    albumID={album.id}
                    albumName={album.name}
                    type={album.type}
                    releaseDate={album.releaseDate}
                    albumCover={album.albumUrl}
                    songs={album.songs}
                  />
                ))}
              </div>}
          </div>
        </section>
      </Suspense>
    </main>
  )
}
