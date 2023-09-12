'use client'
import { SongWithCover } from '@/types/interfaces'
import useMusicStore from '@/store/store'

export default function SongsTable ({ songs, cover, artist }: { songs?: SongWithCover[], cover?: string, artist?: string }) {
  const { play } = useMusicStore()

  const handlePlaySong = (songId: Number) => {
    const song = songs?.find(song => song.id === songId)
    if (song !== undefined) {
      play(song)
    }
  }
  return (
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
                <tr
                  key={song?.id} className='hover:bg-retro-black-600 transition duration-500 cursor-default'
                  onClick={() => handlePlaySong(song?.id)}
                >
                  <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-retro-white'>
                    {index + 1}
                  </th>
                  <td className='px-6 py-4'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 w-10 h-10'>
                        {cover !== undefined && <img className='w-10 h-10 rounded-lg' src={cover} alt='' />}
                        {cover === undefined && song?.cover != null && <img className='w-10 h-10 rounded-lg' src={song?.cover} alt='' />}
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-retro-white'>{song?.name}</div>
                        {artist !== undefined && <div className='text-sm text-gray-400'>{artist}</div>}
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
  )
}