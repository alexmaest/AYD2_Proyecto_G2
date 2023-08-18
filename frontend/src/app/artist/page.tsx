import ArtistSongs from '@/components/ArtistSongs'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { Suspense } from 'react'
import Link from 'next/link'

export default async function ArtistPage () {
  const session = await getServerSession(options)

  return (
    <>
      <main className='flex flex-col items-start gap-16 p-16'>
        <Suspense fallback={<div>Loading...</div>}>
          <ArtistSongs
            artistID={session?.user.id ?? 0}
            artistName={session?.user.username ?? 'Unknown'}
          >
            <h3 className='font-bold text-3xl text-white'>Tracks</h3>
            <Link
              href='/artist/tracks'
              className='text-white text-xl font-bold hover:underline cursor-pointer'
            >
              See All
            </Link>
          </ArtistSongs>
        </Suspense>
        <section className='w-full flex flex-col items-start gap-8'>
          <div className=' w-full flex justify-between items-center'>
            <h3 className='font-bold text-3xl text-white'>Albums</h3>
            <Link
              href='/artist/albums'
              className='text-white text-xl font-bold hover:underline cursor-pointer'
            >
              See All
            </Link>
          </div>
        </section>
        <section className='w-full flex flex-col items-start gap-8'>
          <div className=' w-full flex justify-between items-center'>
            <h3 className='font-bold text-3xl text-white'>Do you want to add an Album?</h3>
            <Link
              href='/createAlbum'
              className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-retro-blue hover:brightness-90 hover:scale-105 text-retro-white text-center font-bold text-[16px]'
            >
              Add Album
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
