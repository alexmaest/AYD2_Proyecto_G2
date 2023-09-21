import { fetchTopAlbums } from '@/lib/fetchTopAlbums'
import { Suspense } from 'react'

export default async function page () {
  const albums: Array<{ id: number, plays: number, name: string, artist: string }> = await fetchTopAlbums()
  console.log(albums)

  return (
    <section className='section-min-height w-4/5 mx-auto my-2 flex flex-col items-start justify-evenly'>
      <h1 className='text-[48px] font-bold text-retro-white text-center'>Top 5 Álbumes más Escuchados</h1>
      <Suspense fallback={<p className='text-xl text-retro-white text-bold'>Loading...</p>}>
        <div className='w-4/5 bg-retro-black-900 rounded-lg mx-auto'>
          {/* table of albums */}
          <table className='w-full text-base text-center rounded-lg text-retro-white'>
            <thead className='text-lg uppercase bg-retro-green text-retro-black rounded-lg'>
              <tr className='rounded-lg'>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  #
                </th>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  Nombre
                </th>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  Artista
                </th>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  Reproducciones
                </th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album, index) => (
                <tr key={album.id} className='group rounded-xl cursor-pointer hover:scale-110 hover:bg-retro-black-800'>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {index + 1}
                  </td>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {album.name}
                  </td>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {album.artist}
                  </td>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {album.plays}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Suspense>
    </section>
  )
}
