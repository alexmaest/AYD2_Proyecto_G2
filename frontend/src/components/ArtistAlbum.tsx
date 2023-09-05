import { Album } from '@/types/interfaces'
import Link from 'next/link'

interface Props {
  album: Album
}

export default function ArtistAlbum ({ album }: Props) {
  const date = new Date(album.releaseDate)
  const year = date.getFullYear()
  return (
    <Link
      href={`/artist/albums/${album.id}`}
      className='p-4 bg-retro-black-900 rounded hover:bg-retro-black-800 group'
    >
      <div className='flex flex-col items-start gap-2'>
        <img
          className='w-[192px] h-[192px] rounded object-cover'
          src={album.albumUrl}
          alt='album cover'
        />
        <h5 className='font-bold text-retro-white text-[20px] group-hover:text-retro-orange'>{album.name}</h5>
        <p className='text-retro-white text-[16px]'>{year} - {album.type}</p>
      </div>
    </Link>
  )
}
