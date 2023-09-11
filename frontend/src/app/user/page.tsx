import fetchForYouAlbums from '@/lib/fetchForYouAlbums'
import fetchForYouSongs from '@/lib/fetchForYouSongs'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import Album from '@/components/Album'
import fetchArtist from '@/lib/fetchArtists'
import Artist from '@/components/Artist'
import SongsTable from '@/components/SongsTable'

export default async function Page () {
  const session = await getServerSession(options)
  const albums = await fetchForYouAlbums(session?.user?.id ?? 0) ?? []
  const songs = await fetchForYouSongs(session?.user?.id ?? 0) ?? []
  const artists = await fetchArtist() ?? []

  return (
    <main>
      <section className='px-6 pt-4'>
        <h1 className='font-extrabold text-2xl text-retro-white'>Albums you might like</h1>
        <div className='flex flex-row justify-center mt-3'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {albums?.slice(0, 10).map(album => (
              <Album key={album.id} {...album} />
            ))}
          </div>
        </div>
        <h1 className='font-extrabold text-2xl text-retro-white mt-5'>Songs you might like</h1>
        <div className='flex flex-row justify-center mt-5'>
          <div className='relative overflow-x-auto w-3/4'>
            <SongsTable songs={songs?.slice(0, 10)} />
          </div>
        </div>
        <h1 className='font-extrabold text-2xl text-retro-white'>Artist for you</h1>
        <div className='flex flex-row justify-center mt-5'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {artists?.sort(() => Math.random() - 0.5)?.slice(0, 10).map(artist => (
              <Artist key={artist.id} {...artist} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
