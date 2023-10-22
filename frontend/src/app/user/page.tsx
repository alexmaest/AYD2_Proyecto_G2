import fetchForYouAlbums from '@/lib/fetchForYouAlbums'
import fetchForYouSongs from '@/lib/fetchForYouSongs'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import Album from '@/components/Album'
import fetchArtist from '@/lib/fetchArtists'
import Artist from '@/components/Artist'
import SongsTable from '@/components/SongsTable'
import fetchGenresRecommendation from '@/lib/fetchGenresRecommendation'
import GenreRecommendation from '@/components/GenreRecommendation'

export default async function Page () {
  const session = await getServerSession(options)
  const albums = await fetchForYouAlbums(session?.user?.id ?? 0) ?? []
  const songs = await fetchForYouSongs(session?.user?.id ?? 0) ?? []
  const artists = await fetchArtist() ?? []
  const genresRecommendation = await fetchGenresRecommendation()

  return (
    <main className='flex flex-row w-full gap-8 items-center justify-center section-min-height-2'>
      <div className='flex w-1/12 items-center justify-center'>
        <img src='/images/ad1.png' alt='ad1' className='w-[128px] h-[512px]' />
      </div>
      <section className='flex flex-col gap-8 w-3/4 section-max-height overflow-y-auto py-8'>
        <h1 data-testid="cypress-recommendations" className='font-extrabold text-2xl text-retro-white'>Recommendations</h1>
        <div className='max-w-full flex flex-row justify-center'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <GenreRecommendation genreName='Dance-Pop' songs={genresRecommendation?.['Dance-Pop'] ?? []} backgroundColor='bg-retro-orange-600/60' />
            <GenreRecommendation genreName='Disco-Funk' songs={genresRecommendation?.['Disco/Funk'] ?? []} backgroundColor='bg-retro-green-600/60' />
            <GenreRecommendation genreName='Electronica' songs={genresRecommendation?.Electronica ?? []} backgroundColor='bg-retro-yellow-600/60' />
            <GenreRecommendation genreName='Hard-Rock' songs={genresRecommendation?.['Hard Rock'] ?? []} backgroundColor='bg-red-300/60' />
            <GenreRecommendation genreName='Hip-Hop' songs={genresRecommendation?.['Hip-Hop'] ?? []} backgroundColor='bg-green-300/60' />
            <GenreRecommendation genreName='Pop' songs={genresRecommendation?.Pop ?? []} backgroundColor='bg-blue-300/60' />
            <GenreRecommendation genreName='RAndB' songs={genresRecommendation?.['R&B'] ?? []} backgroundColor='bg-gray-300/60' />
            <GenreRecommendation genreName='Rock-Pop' songs={genresRecommendation?.['Rock/Pop'] ?? []} backgroundColor='bg-pink-300/60' />
            <GenreRecommendation genreName='Soul' songs={genresRecommendation?.Soul ?? []} backgroundColor='bg-orange-300/60' />
            <GenreRecommendation genreName='Synth-Pop' songs={genresRecommendation?.['Synth-Pop'] ?? []} backgroundColor='bg-red-300/60' />
          </div>
        </div>
        <h1 className='font-extrabold text-2xl text-retro-white'>Albums you might like</h1>
        <div className='max-w-full flex flex-row justify-center'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {albums?.slice(0, 8).map(album => (
              <Album key={album.id} {...album} />
            ))}
          </div>
        </div>
        <h1 className='font-extrabold text-2xl text-retro-white'>Songs you might like</h1>
        <div className='max-w-full flex flex-row justify-center'>
          <SongsTable songs={songs?.slice(0, 10)} />
        </div>
        <h1 className='font-extrabold text-2xl text-retro-white'>Artist for you</h1>
        <div className='max-w-full flex flex-row justify-center'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {artists?.sort(() => Math.random() - 0.5)?.slice(0, 8).map(artist => (
              <Artist key={artist.id} {...artist} />
            ))}
          </div>
        </div>
      </section>
      <div className='flex w-1/12 items-center justify-center'>
        <img src='/images/ad2.png' alt='ad2' className='w-[128px] h-[512px]' />
      </div>
    </main>
  )
}
