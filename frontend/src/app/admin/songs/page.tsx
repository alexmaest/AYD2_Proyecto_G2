const mockSongs = [
  {
    id: 1,
    name: 'Canción 1',
    artist: 'Artista 1',
    plays: 100
  },
  {
    id: 2,
    name: 'Canción 2',
    artist: 'Artista 2',
    plays: 200
  },
  {
    id: 3,
    name: 'Canción 3',
    artist: 'Artista 3',
    plays: 313
  },
  {
    id: 4,
    name: 'Canción 4',
    artist: 'Artista 4',
    plays: 225
  },
  {
    id: 5,
    name: 'Canción 5',
    artist: 'Artista 5',
    plays: 500
  }
]

export default function page () {
  const sortedSongs = mockSongs.sort((a, b) => b.plays - a.plays)
  const maxPlays = sortedSongs[0].plays
  return (
    <section className='section-min-height w-4/5 mx-auto my-2 flex flex-col items-start justify-around'>
      <h1 className='text-[48px] font-bold text-retro-white text-center'>Top 5 Canciones más Escuchadas</h1>
      <div className='w-4/5 go bg-retro-black-900 p-8 rounded-lg mx-auto'>
        <div className='w-full h-80 flex flex-row justify-around items-end'>
          {sortedSongs.map((song) => (
            <div key={song.id} className='w-1/5 h-full flex flex-col items-center justify-end gap-4'>
              <div
                key={song.id}
                className='peer flex w-3/4 p-4 overflow-visible relative bg-retro-green rounded hover:scale-110 transition-all ease-in-out'
                style={{ height: (song.plays * 100 / maxPlays).toString() + '%' }}
              >
                <div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
                  <h2 className='text-xl font-bold text-retro-white text-center'>{song.plays}</h2>
                </div>
              </div>
              <h2 key={song.id} className='text-xl font-bold text-retro-white text-center peer-hover:text-retro-orange'>{song.name}<br />{song.artist}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
