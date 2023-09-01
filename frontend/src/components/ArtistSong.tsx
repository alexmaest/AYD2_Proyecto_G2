'use client'

import Image from 'next/image'
import Button from './Button'
import { TbCircleFilled, TbPlayerPlayFilled } from 'react-icons/tb'
import { Song } from '@/types/interfaces'
import { deleteSong } from '@/lib/actions'
import { useTransition } from 'react'

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
    <form className='w-full flex flex-row items-center justify-between'>
      <div className='flex items-start gap-6'>
        <Image
          width={96}
          height={96}
          src='/images/album-cover.png'
          alt='album cover'
        />
        <div className='flex flex-col h-24 justify-between'>
          <h4 className='text-retro-white text-[18px] font-bold'>{song.name}</h4>
          <p className='text-retro-white text-[16px]'>{artist}</p>
          <div className='flex gap-2 items-center'>
            <TbPlayerPlayFilled className='text-retro-white' />
            <p className='text-retro-white text-[16px]'>0</p>
            <TbCircleFilled className='text-retro-white text-[5px]' />
            <p className='text-retro-white text-[16px]'>{song.duration}</p>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-6'>
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
      </div>
    </form>
  )
}

export default ArtistSong
