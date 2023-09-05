import fetchForYouAlbums from '@/lib/fetchForYouAlbums'
import fetchForYouSongs from '@/lib/fetchForYouSongs'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import Album from '@/components/Album'
import Link from 'next/link'
import Song from '@/components/Song'

export default async function Page () {
  const session = await getServerSession(options)
  const albums = await fetchForYouAlbums(session?.user?.id ?? 0) ?? []
  const songs = await fetchForYouSongs(session?.user?.id ?? 0) ?? []
  return (
    <main>
      <section className='px-6 pt-4'>
        <div className='flex justify-evenly items-center pb-5'>
          <h1 className='font-extrabold text-2xl text-retro-orange-400'>Albums you might like</h1>
          <Link href='/user/albumsForYou'>
            <h1 className='font-light underline text-xl text-orange-400'>See all</h1>
          </Link>
        </div>
        <div className='ml-28'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {albums?.slice(0, 10).map(album => (
              <Album key={album.id} {...album} />
            ))}
          </div>
        </div>
        <div className='flex justify-evenly items-center pb-5'>
          <h1 className='font-extrabold text-2xl text-retro-orange-400'>Songs you might like</h1>
          <Link href='/user/songsForYou'>
            <h1 className='font-light underline text-xl text-orange-400'>See all</h1>
          </Link>
        </div>
        <div className='ml-28'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {songs?.slice(0, 10).map(song => (
              <Song key={song.id} {...song} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
