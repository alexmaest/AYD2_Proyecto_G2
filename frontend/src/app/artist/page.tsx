import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { Suspense } from 'react'
import Link from 'next/link'
import fetchSongs from '@/lib/fetchSongs'
import fetchAlbums from '@/lib/fetchAlbums'
import Catalog from '@/components/Catalog'
import ArtistAlbum from '@/components/ArtistAlbum'
import { Album, Song } from '@/types/interfaces'
import ArtistSong from '@/components/ArtistSong'

export default async function ArtistPage () {
  const session = await getServerSession(options)
  const songs = await fetchSongs(session?.user.id ?? 0) ?? []
  const albums = await fetchAlbums(session?.user.id ?? 0) ?? []

  if (songs.length > 3) {
    songs.splice(3)
  }

  if (albums.length > 5) {
    albums.splice(3)
  }

  return (
    <>
      <main className='flex flex-col items-start gap-16 p-16'>
        <Suspense fallback={<div>Loading...</div>}>
          <Catalog>
            <Catalog.Header title='Songs'>
              <Link
                href='/artist/tracks'
                className='text-white text-xl font-bold hover:underline cursor-pointer'
              >
                See All
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
        <Suspense fallback={<div>Loading...</div>}>
          <Catalog>
            <Catalog.Header title='Albums'>
              <Link
                href='/artist/albums'
                className='text-white text-xl font-bold hover:underline cursor-pointer'
              >
                See All
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
                    <ArtistAlbum
                      key={album.id}
                      album={album}
                    />
                  ))}
                </Catalog.Content>}
            </div>
          </Catalog>
        </Suspense>
        <section className='w-full flex flex-col items-start gap-8'>
          <div className=' w-full flex justify-between items-center'>
            <h3 className='font-bold text-3xl text-white'>Do you want to add an Album?</h3>
            <Link
              href='/artist/create-album'
              className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-retro-blue hover:brightness-90 hover:scale-105 text-retro-white text-center font-bold text-[16px]'
            >
              Add Album
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
