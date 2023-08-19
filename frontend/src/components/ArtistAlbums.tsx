import fetchAlbums from '@/lib/fetchAlbums'
import { Album } from '@/types/interfaces'
import Link from 'next/link'
import ArtistAlbum from './ArtistAlbum'

interface Props {
  artistID: number
  children?: React.ReactNode
}

export default async function ArtistAlbums ({ artistID, children }: Props) {
  const albums = await fetchAlbums(artistID) ?? []

  return (
    <section className='w-full flex flex-col items-start gap-8'>
      <div className=' w-full flex justify-between items-center'>
        {children}
      </div>
      <div className='w-full'>
        {albums.length === 0 && (
          <div className='w-full flex flex-col items-center justify-center'>
            <h3 className='text-white text-2xl font-bold'>No albums created yet</h3>
            <Link
              href='/artist/create-album'
              className='text-white text-xl font-bold hover:underline cursor-pointer'
            >
              Add Album
            </Link>
          </div>
        )}
        {albums.length !== 0 &&
          <div className='flex flex-row items-start gap-16'>
            {albums.map((album: Album) => (
              <ArtistAlbum
                key={album.id}
                albumID={album.id}
                albumName={album.name}
                type={album.type}
                releaseDate={album.releaseDate}
                albumCover={album.albumUrl}
              />
            ))}
          </div>}
      </div>
    </section>
  )
}
