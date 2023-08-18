'use client'

import Image from 'next/image'
import Button from './Button'
import { TbCircleFilled, TbPlayerPlayFilled } from 'react-icons/tb'

interface Pops {
  name: string
  artist: string
  duration: string
}

function ArtistSong ({ name, artist, duration }: Pops) {
  return (
    <div className='w-full flex flex-row items-center justify-between'>
      <div className='flex items-start gap-6'>
        <Image
          width={96}
          height={96}
          src='/images/album-cover.png'
          alt='album cover'
        />
        <div className='flex flex-col h-24 justify-between'>
          <h4 className='text-retro-white text-[18px] font-bold'>{name}</h4>
          <p className='text-retro-white text-[16px]'>{artist}</p>
          <div className='flex gap-2 items-center'>
            <TbPlayerPlayFilled className='text-retro-white' />
            <p className='text-retro-white text-[16px]'>0</p>
            <TbCircleFilled className='text-retro-white text-[5px]' />
            <p className='text-retro-white text-[16px]'>{duration}</p>
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
        >
          <span className='text-retro-black text-center font-bold text-[16px]'>Delete</span>
        </Button>
      </div>
    </div>
  )
}

export default ArtistSong