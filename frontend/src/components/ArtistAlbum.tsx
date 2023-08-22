'use client'

import Link from 'next/link'

interface Props {
  albumName: string
  albumID: number
  type: string
  releaseDate: string
  albumCover: string
}

export default function ArtistAlbum ({ albumName, albumID, type, releaseDate, albumCover }: Props) {
  const date = new Date(releaseDate)
  const year = date.getFullYear()
  return (
    <Link href={`/artist/albums/${albumID}`}>
      <div className='flex flex-col items-start gap-2'>
        <img
          className='w-[200px] h-[200px] rounded-lg object-cover'
          src={albumCover}
          alt='album cover'
        />
        <h5 className='font-bold text-retro-white text-[20px]'>{albumName}</h5>
        <p className='text-retro-white text-[16px]'>{year} - {type}</p>
      </div>
    </Link>
  )
}
