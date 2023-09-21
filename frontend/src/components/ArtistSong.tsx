'use client'

import Image from 'next/image'
import Button from './Button'
import { TbCircleFilled, TbPlayerPlayFilled } from 'react-icons/tb'
import { Song } from '@/types/interfaces'
import { deleteSong } from '@/lib/actions'
import { useTransition } from 'react'
import Link from 'next/link'

interface Props {
  song: Song
  artist: string
}

function ArtistSong ({ song, artist }: Props) {
  const [isPending, startTransition] = useTransition()
  const onDelete = async () => {
    try {
      await deleteSong(song)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full gap-4 flex flex-row items-center justify-between bg-retro-black-900 rounded'>
      <Link
        href={song.songUrl}
        className='w-full flex items-start gap-6 group p-4'
        target='_blank'
        rel='noreferrer'
      >
        <div
          className='w-[80px] h-[80px] rounded-lg overflow-hidden relative transition-all duration-300 group-hover:scale-105 ease-out'
        >
          <Image
            width={80}
            height={80}
            src='/images/album-cover.png'
            alt='album cover'
            className='object-fit'
          />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible rounded-full bg-retro-green p-2'>
            <TbPlayerPlayFilled
              className=' text-retro-black text-[32px]'
            />
          </div>
        </div>
        <div className='flex flex-col h-16 justify-between'>
          <h4 className='text-retro-white text-[18px] font-bold group-hover:text-retro-orange'>{song.name}</h4>
          <p className='text-retro-white text-[16px]'>{artist}</p>
          <div className='flex gap-2 items-center'>
            <TbPlayerPlayFilled className='text-retro-white' />
            <p className='text-retro-white text-[16px]'>0</p>
            <TbCircleFilled className='text-retro-white text-[5px]' />
            <p className='text-retro-white text-[16px]'>{song.duration}</p>
          </div>
        </div>
      </Link>
      <div className='w-1 h-[96px] bg-retro-black' />
      <form className='flex items-center gap-6 p-4'>
        <Button
          type='primary'
        >
          <span className='text-retro-white text-center font-bold text-[16px]'>Edit</span>
        </Button>
        <Button
          type='secondary'
          onClick={() => startTransition(async () => await onDelete())}
        >
          <span className='text-retro-black text-center font-bold text-[16px]'>
            {isPending ? 'Deleting...' : 'Delete'}
          </span>
        </Button>
      </form>
    </div>
  )
}

export default ArtistSong
