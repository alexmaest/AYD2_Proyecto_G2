'use client'

import { Song } from '@/types/interfaces'
import Link from 'next/link'
import Button from './Button'
import { apiUrls, baseUrl } from '@/constants/urls'
import { revalidatePath } from 'next/cache'

interface Props {
  artistName: string
  albumName: string
  albumID: number
  type: string
  releaseDate: string
  albumCover: string
  songs: Song[]
}

export default function ArtistAlbum2 ({ artistName, albumName, albumID, type, releaseDate, albumCover, songs }: Props) {
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(baseUrl + apiUrls.artist.deleteAlbum + `/${id}`, {
        method: 'DELETE'
      })
      if (response.status !== 200) {
        throw new Error('Error deleting album')
      }
      revalidatePath('/artist/albums')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='w-full flex flex-row items-start gap-8'>
      <Link href={`/artist/albums/${albumID}`}>
        <img
          className='min-w-[200px] h-[200px] rounded-lg object-cover'
          src={albumCover}
          alt='album cover'
        />
      </Link>
      <div className='w-full'>
        <div className='w-full flex justify-between items-start'>
          <div className='flex flex-col'>
            <Link href='/artist/profile'>
              <p className='text-retro-white text-[16px] hover:underline cursor-pointer'>{artistName}</p>
            </Link>
            <Link href={`/artist/albums/${albumID}`}>
              <h5 className='font-bold text-retro-white text-[20px]'>{albumName}</h5>
            </Link>
            <p className='text-retro-white text-[14px]'>{year} - {type}</p>
          </div>
          <Button
            type='secondary'
            onClick={async () => { await handleDelete(albumID) }}
          >
            <span className='text-retro-black font-bold text-[16px]'>Delete</span>
          </Button>
        </div>

        <div className='w-full flex flex-col items-start border border-retro-black-500 mt-8'>
          {songs.map((song: Song, index) => (
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
