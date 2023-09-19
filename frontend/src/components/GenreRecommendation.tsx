import { SongWithCover } from '@/types/interfaces'
import Link from 'next/link'
import { FaPlayCircle } from 'react-icons/fa'

export default function GenreRecommendation ({ genreName, songs, backgroundColor }: { genreName: string, songs: SongWithCover[], backgroundColor: string }) {
  console.log({ songs })
  return (
    <Link href={`/user/genre/${genreName}`}>
      <div
        className='album-card rounded-lg w-56 py-5 bg-retro-black-900 hover:bg-retro-black-800 transition duration-500 cursor-pointer'
      >
        <div className='flex flex-col items-center relative'>
          <div className='absolute flex flex-col items-end w-40 h-40 justify-end z-30'>
            <FaPlayCircle className='text-5xl text-retro-orange-600 shadow-2xl opacity-0 play-icon transition duration-500' />
          </div>
          <div className='flex flex-row items-center justify-center'>
            <div className={`backdrop-blur-md ${backgroundColor} w-44 h-44 rounded absolute`} />
            <img src={songs?.[0]?.cover} alt={genreName} className='w-44 h-44 rounded' />
            <p className='text-retro-white text-xl font-extrabold py-2 truncate absolute'>{genreName}</p>
          </div>
        </div>
        <div className='mx-6' />
      </div>
    </Link>
  )
}
