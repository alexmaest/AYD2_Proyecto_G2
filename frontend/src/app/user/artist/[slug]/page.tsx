import Album from '@/components/Album'
import SongsTable from '@/components/SongsTable'
import fetchArtistAlbums from '@/lib/fetchArtistAlbums'
import fetchArtistBanner from '@/lib/fetchArtistBanner'
import fetchArtistSongs from '@/lib/fetchArtistSongs'
import fetchArtist from '@/lib/fetchArtists'
import { BsFillPatchCheckFill } from 'react-icons/bs'

export default async function ArtistPage ({ params }: { params: { slug: string } }) {
  const banner = await fetchArtistBanner(Number(params.slug))
  const artists = await fetchArtist()
  const artist = artists?.find(artist => artist.id === Number(params.slug))

  const songs = await fetchArtistSongs(artist?.id ?? 0)
  const albums = await fetchArtistAlbums(artist?.id ?? 0)
  return (
    <main className='section-max-height overflow-y-auto flex flex-col gap-6 items-center'>
      <article className='w-full relative -z-10 shadow-header shadow-retro-white-200/20'>
        <div className='flex absolute bottom-1/2 ml-6 space-x-3'>
          <BsFillPatchCheckFill className='w-6 h-6 text-retro-orange-500' />
          <p className='text-white'>Artista verificado</p>
        </div>
        <h1 className='absolute bottom-1/3 ml-6 font-extrabold text-6xl text-white'>{artist?.nombre}</h1>
        {banner != null && banner !== ''
          ? (
            <img
              className='block w-full h-96 object-cover'
              src={banner} alt='Artist banner'
            />
            )
          : (
            <div className='block w-full h-96 object-cover' />
            )}
      </article>
      <div className='flex flex-col gap-8 w-3/4 my-8'>
        <h1 className='font-extrabold text-3xl text-white'>Popular songs</h1>
        <div className='flex flex-row items-center justify-center'>
          <div className='relative overflow-x-auto w-3/4'>
            <SongsTable songs={songs} />
          </div>
        </div>
        <h1 className='font-extrabold text-3xl text-white'>Discography</h1>
        <div className='flex flex-row justify-center mt-3'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {albums?.map(album => (
              <Album key={album.id} {...album} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
