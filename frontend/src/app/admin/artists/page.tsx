import { fetchTopArtists } from '@/lib/fetchTopArtists'
import { Suspense } from 'react'

export default async function page () {
  const artists: Array<{ idCreator: number, idUsuario: number, plays: number, artist: string }> = await fetchTopArtists()
  return (
    <section className='section-min-height w-4/5 mx-auto my-2 flex flex-col items-start justify-evenly'>
      <h1 className='text-[48px] font-bold text-retro-white text-center'>Top 5 Artistas más Escuchados</h1>
      <Suspense fallback={<p className='text-xl text-retro-white text-bold'>Loading...</p>}>
        <div className='w-4/5 go bg-retro-black-900 rounded-lg mx-auto'>
          {/* table of artists */}
          <table className='w-full text-base text-center rounded-lg text-retro-white'>
            <thead className='w-full text-lg uppercase bg-retro-green text-retro-black rounded-lg'>
              <tr className='rounded-lg'>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  #
                </th>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  ID Artista
                </th>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  ID Usuario
                </th>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  Nombre
                </th>
                <th scope='col' className='px-6 py-3 rounded-lg'>
                  Reproducciones
                </th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, index) => (
                <tr key={artist.idUsuario} className='group rounded-xl cursor-pointer hover:scale-110 hover:bg-retro-black-800'>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {index + 1}
                  </td>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {artist.idCreator}
                  </td>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {artist.idUsuario}
                  </td>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {artist.artist}
                  </td>
                  <td className='px-6 py-4 group-hover:text-retro-orange'>
                    {artist.plays}
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
