import { ForYouAlbum } from '@/types/interfaces'
import Link from 'next/link'
import { FaPlayCircle } from 'react-icons/fa'

export default function Album (album: ForYouAlbum) {
  return (
    <Link href={`/user/album/${album.id}`}>
      <div
        className='album-card rounded-lg w-56 py-5 bg-retro-black-900 hover:bg-retro-black-800 transition duration-500 cursor-pointer'
      >
        <div className='flex flex-col items-center relative'>
          <div className='absolute flex flex-col items-end w-40 h-40 justify-end'>
            <FaPlayCircle className='text-5xl text-retro-orange-600 shadow-2xl opacity-0 play-icon transition duration-500' />
          </div>
          <img src={album.cover} alt={album.title} className='w-44 h-44 rounded-lg' />
        </div>
        <div className='mx-6'>
          <p className='text-retro-white font-bold py-2 truncate'>{album.title}</p>
          <p className='text-retro-black-300 text-sm'>{album.artist ?? ''}<span> • {album.type}</span></p>
        </div>
      </div>
    </Link>
  )
}
