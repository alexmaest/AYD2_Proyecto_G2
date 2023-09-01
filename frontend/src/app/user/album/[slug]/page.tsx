import { options } from '@/app/api/auth/[...nextauth]/options'
import fetchForYouAlbums from '@/lib/fetchForYouAlbums'
import fetchSongsForAlbumId from '@/lib/fetchSongsForAlbumId'
import { getServerSession } from 'next-auth'

export default async function AlbumPage ({ params }: { params: { slug: string } }) {
  const session = await getServerSession(options)
  const albums = await fetchForYouAlbums(session?.user?.id ?? 0) ?? []

  const album = albums.find(album => album.id === Number(params.slug))

  const songs = await fetchSongsForAlbumId(album?.id ?? 0)
  return (
    <main className='flex flex-col items-center'>
      <article className='flex flex-row items-center w-2/4'>
        <div className='flex flex-row mt-20'>
          <img src={album?.cover} alt={album?.title} className='w-52 h-52 rounded-lg' />
        </div>
        <div className='flex flex-col justify-center mt-20 ml-6'>
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
        <table className='w-full text-sm text-left text-gray-400'>
          <thead className='text-xs text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                #
              </th>
              <th scope='col' className='px-6 py-3'>
                Título
              </th>
              <th scope='col' className='px-6 py-3 text-right'>
                Duración
              </th>
            </tr>
          </thead>
          <tbody>
            {
              songs?.map((song, index) => (
                <tr key={song?.id}>
                  <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-retro-white'>
                    {index + 1}
                  </th>
                  <td className='px-6 py-4'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 w-10 h-10'>
                        <img className='w-10 h-10 rounded-lg' src={album?.cover} alt='' />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-retro-white'>{song?.name}</div>
                        <div className='text-sm text-gray-400'>{album?.artist}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    {song?.duration}
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </main>
  )
}
