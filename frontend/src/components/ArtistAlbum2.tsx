'use client'

import { Album, Song } from '@/types/interfaces'
import Link from 'next/link'
import Button from './Button'
import { useTransition } from 'react'
import { deleteAlbum } from '@/lib/actions'

interface Props {
  artistName: string
  album: Album
}

export default function ArtistAlbum2 ({ artistName, album }: Props) {
  const date = new Date(album.releaseDate)
  const year = date.getFullYear()

  const [isPending, startTransition] = useTransition()
  const onDelete = async () => {
    try {
      await deleteAlbum(album)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full flex flex-row items-start gap-8'>
      <Link href={`/artist/albums/${album.id}`}>
        <img
          className='min-w-[200px] h-[200px] rounded-lg object-cover'
          src={album.albumUrl}
          alt='album cover'
        />
      </Link>
      <div className='w-full'>
        <form className='w-full flex justify-between items-start'>
          <div className='flex flex-col'>
            <Link href='/artist/profile'>
              <p className='text-retro-white text-[16px] hover:underline cursor-pointer'>{artistName}</p>
            </Link>
            <Link href={`/artist/albums/${album.id}`}>
              <h5 className='font-bold text-retro-white text-[20px]'>{album.name}</h5>
            </Link>
            <p className='text-retro-white text-[14px]'>{year} - {album.type}</p>
          </div>
          <Button
            type='secondary'
            onClick={() => startTransition(async () => { await onDelete() })}
          >
            <span className='text-retro-black font-bold text-[16px]'>
              {isPending ? 'Deleting...' : 'Delete'}
            </span>
          </Button>
        </form>

        <div className='w-full flex flex-col items-start border border-retro-black-500 mt-8'>
          {album.songs.map((song: Song, index) => (
            <a
              href={song.songUrl}
              key={song.id}
              target='_blank'
              className='flex gap-4 px-4 py-2 border-b border-retro-black-500 w-full hover:bg-retro-black-500 hover:bg-opacity-10'
              rel='noreferrer'
            >
              <span className='text-retro-white text-[14px]'>{index + 1}. </span>
              <p className='text-retro-white text-[14px]'>{song.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
