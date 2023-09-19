import { options } from '@/app/api/auth/[...nextauth]/options'
import SongsTable from '@/components/SongsTable'
import fetchForYouAlbums from '@/lib/fetchForYouAlbums'
import fetchSongsForAlbumId from '@/lib/fetchSongsForAlbumId'
import { getServerSession } from 'next-auth'

export default async function AlbumPage ({ params }: { params: { slug: string } }) {
  const session = await getServerSession(options)
  const albums = await fetchForYouAlbums(session?.user?.id ?? 0) ?? []

  const album = albums.find(album => album.id === Number(params.slug))

  const songs = await fetchSongsForAlbumId(album?.id ?? 0)
  return (
    <main className='flex flex-col items-center justify-center section-min-height-2 section-max-height overflow-y-auto py-8'>
      <article className='flex flex-row items-center w-2/4'>
        <div className='flex flex-row'>
          <img src={album?.cover} alt={album?.title} className='w-52 h-52 rounded-lg' />
        </div>
        <div className='flex flex-col justify-center mx-6'>
          <h3 className='font-bold text-sm text-retro-white'>{album?.type}</h3>
          <h1 className='text-4xl font-bold text-retro-white'>{album?.title}</h1>
          <h2 className='font-bold text-retro-white'>{album?.artist}</h2>
        </div>
        {
          /*
          Canciones del album
          */
        }
      </article>

      <div className='relative overflow-x-auto w-2/4'>
        <SongsTable songs={songs} cover={album?.cover} artist={album?.artist} />
      </div>

    </main>
  )
}
