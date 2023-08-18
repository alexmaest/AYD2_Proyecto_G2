import Link from 'next/link'
import ArtistSong from './ArtistSong'
import { apiUrls, baseUrl } from '@/constants/urls'

interface Props {
  artistID: number
  artistName: string
  limit?: number
  children?: React.ReactNode
}

async function getSongs (id: number) {
  const response = await fetch(baseUrl + apiUrls.artist.getSongs + `/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return await response.json()
}

export default async function ArtistSongs ({ artistID, artistName, limit, children }: Props) {
  const songs = await getSongs(artistID)

  if (limit !== undefined && songs.length > limit) {
    songs.splice(limit)
  }

  return (
    <section className='w-full flex flex-col items-start gap-8'>
      <div className=' w-full flex justify-between items-center'>
        {children}
      </div>
      <div className='w-full'>
        {songs.length === 0 && (
          <div className='w-full flex flex-col items-center justify-center'>
            <h3 className='text-white text-2xl font-bold'>No songs uploaded yet</h3>
            <Link
              href='/artist/upload'
              className='text-white text-xl font-bold hover:underline cursor-pointer'
            >
              Upload
            </Link>
          </div>
        )}
        {songs.length !== 0 &&
          <div className='flex flex-col items-start gap-8'>
            {songs.map((song: any) => (
              <ArtistSong
                key={song.id}
                name={song.name}
                artist={artistName}
                duration={song.duration}
              />
            ))}
          </div>}
      </div>
    </section>
  )
}
