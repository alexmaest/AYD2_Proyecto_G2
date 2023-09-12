import { fetchTopFiveSongs } from '@/lib/fetchTopFiveSongs'
import { Suspense } from 'react'

export default async function page () {
  const songs: Array<{ id: number, plays: number, artist: string, name: string }> = await fetchTopFiveSongs()
  const maxPlays = songs[0].plays
  return (
    <section className='section-min-height w-4/5 mx-auto my-2 flex flex-col items-start justify-around'>
      <h1 className='text-[48px] font-bold text-retro-white text-center'>Top 5 Canciones más Escuchadas</h1>
      <Suspense fallback={<p className='text-xl text-retro-white text-bold'>Loading...</p>}>
        <div className='w-4/5 go bg-retro-black-900 p-8 rounded-lg mx-auto'>
          <div className='w-full h-80 flex flex-row justify-around items-end'>
            {songs.map((song) => (
              <div key={song.id} className='w-1/5 h-full flex flex-col items-center justify-end'>
                <div
                  key={song.id}
                  className='flex w-3/4 p-4 overflow-visible relative bg-retro-green rounded hover:scale-110 transition-all ease-in-out'
                  style={{ height: (song.plays * 100 / maxPlays).toString() + '%' }}
                >
                  <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
                    <h2 className='text-xl font-bold text-retro-white text-center'>{song.plays}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='w-full flex flex-row justify-around items-center mt-4'>
            {songs.map((song) => (
              <h2 key={song.id} className='text-base w-1/5 font-bold text-retro-white text-center'>
                {song.name}<br />{song.artist}
              </h2>
            ))}
          </div>
        </div>
      </Suspense>
    </section>
  )
}
