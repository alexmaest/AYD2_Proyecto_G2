import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { Suspense } from 'react'
import Link from 'next/link'
import fetchAlbums from '@/lib/fetchAlbums'
import { Album } from '@/types/interfaces'
import ArtistAlbum2 from '@/components/ArtistAlbum2'
import Catalog from '@/components/Catalog'

export default async function Albums () {
  const session = await getServerSession(options)
  const albums = await fetchAlbums(session?.user?.id ?? 0) ?? []

  return (
    <main className='flex flex-col items-start gap-16 p-16'>
      <Suspense fallback={<div>Loading...</div>}>
        <Catalog>
          <Catalog.Header title='Albums'>
            <Link
              href='/artist'
              className='text-white text-xl font-bold hover:underline cursor-pointer'
            >
              Go Back
            </Link>
          </Catalog.Header>
          <div className='w-full'>
            {albums.length === 0 && (
              <Catalog.EmptyContent
                text='You have no albums yet'
                to='/artist/create-album'
                linkText='Add Album'
              />
            )}
            {albums.length !== 0 &&
              <Catalog.Content layout='horizontal'>
                {albums.map((album: Album) => (
                  <ArtistAlbum2
                    key={album.id}
                    artistName={session?.user?.username ?? 'Unknown'}
                    album={album}
                  />
                ))}
              </Catalog.Content>}
          </div>
        </Catalog>
      </Suspense>
    </main>
  )
}
