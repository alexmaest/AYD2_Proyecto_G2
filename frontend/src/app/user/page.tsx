import fetchForYouAlbums from '@/lib/fetchForYouAlbums'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import Album from '@/components/Album'
import Link from 'next/link'

export default async function Page () {
  const session = await getServerSession(options)
  const albums = await fetchForYouAlbums(session?.user?.id ?? 0) ?? []
  return (
    <main>
      <section className='px-6 pt-4'>
        <header className='flex justify-evenly items-center pb-5'>
          <h1 className='font-extrabold text-2xl text-retro-orange-400'>Albums you might like</h1>
          <Link href='/user/albums'>
            <h1 className='font-light underline text-xl text-orange-400'>See all</h1>
          </Link>
        </header>
        <div className='ml-28'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {albums?.slice(0, 10).map(album => (
              <Album key={album.id} {...album} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
