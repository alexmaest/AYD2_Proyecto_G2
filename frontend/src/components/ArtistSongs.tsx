import Link from 'next/link'
import ArtistSong from './ArtistSong'
import fetchSongs from '@/lib/fetchSongs'
interface Props {
  artistID: number
  artistName: string
  limit?: number
  children?: React.ReactNode
}

export default async function ArtistSongs ({ artistID, artistName, limit, children }: Props) {
  const songs = await fetchSongs(artistID) ?? []
  let content

  if (limit !== undefined && songs.length > limit) {
    songs.splice(limit)
  }

  if (songs === null || songs.length === 0) {
    content = (
      <div className='w-full flex flex-col items-center justify-center'>
        <h3 className='text-white text-2xl font-bold'>No songs uploaded yet</h3>
        <Link
          href='/artist/upload'
          className='text-white text-xl font-bold hover:underline cursor-pointer'
        >
          Upload
        </Link>
      </div>
    )
  } else {
    const reversedSongs = songs.reverse()
    content = (
      <div className='flex flex-col items-start gap-8'>
        {reversedSongs.map((song: any) => (
          <ArtistSong
            key={song.id}
            song={song}
            artist={artistName}
          />
        ))}
      </div>
    )
  }

  return (
    <section className='w-full flex flex-col items-start gap-8'>
      <div className=' w-full flex justify-between items-center'>
        {children}
      </div>
      <div className='w-full'>
        {content}
      </div>
    </section>
  )
}
