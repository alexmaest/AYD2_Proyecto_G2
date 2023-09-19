import SongsTable from '@/components/SongsTable'
import fetchGenresRecommendation from '@/lib/fetchGenresRecommendation'
import { SongWithCover } from '@/types/interfaces'

export default async function GenrePage ({ params }: { params: { slug: string } }) {
  const genresRecommendation = await fetchGenresRecommendation()

  let songs: SongWithCover[] = []

  switch (params.slug) {
    case 'Dance-Pop':
      songs = genresRecommendation?.['Dance-Pop'] ?? []
      break
    case 'Disco-Funk':
      songs = genresRecommendation?.['Disco/Funk'] ?? []
      break
    case 'Electronica':
      songs = genresRecommendation?.Electronica ?? []
      break
    case 'Hard-Rock':
      songs = genresRecommendation?.['Hard Rock'] ?? []
      break
    case 'Hip-Hop':
      songs = genresRecommendation?.['Hip-Hop'] ?? []
      break
    case 'Pop':
      songs = genresRecommendation?.Pop ?? []
      break
    case 'RAndB':
      songs = genresRecommendation?.['R&B'] ?? []
      break
    case 'Rock-Pop':
      songs = genresRecommendation?.['Rock/Pop'] ?? []
      break
    case 'Soul':
      songs = genresRecommendation?.Soul ?? []
      break
    case 'Synth-Pop':
      songs = genresRecommendation?.['Synth-Pop'] ?? []
      break
    default:
      songs = []
      break
  }

  return (
    <main className='flex flex-col items-center'>
      <article className='flex flex-row items-center w-2/4'>
        <div className='flex flex-row mt-20'>
          <h1 className='text-4xl text-retro-white font-bold'>{params?.slug}</h1>
        </div>
        <div className='flex flex-col justify-center mt-20 ml-6' />
        {
          /*
          Canciones del album
          */
        }
      </article>

      <div className='relative overflow-x-auto w-2/4'>
        <SongsTable songs={songs} />
      </div>

    </main>
  )
}
