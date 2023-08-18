import ArtistSongs from '@/components/ArtistSongs'
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { Suspense } from 'react'
import Link from 'next/link'

export default async function Tracks () {
  const session = await getServerSession(options)

  return (
    <main className='flex flex-col items-start gap-16 p-16'>
      <Suspense fallback={<div>Loading...</div>}>
        <ArtistSongs
          artistID={session?.user.id ?? 0}
          artistName={session?.user.username ?? 'Unknown'}
        >
          <h3 className='font-bold text-3xl text-white'>Tracks</h3>
          <Link
            href='/artist'
            className='text-white text-xl font-bold hover:underline cursor-pointer'
          >
            Go Back
          </Link>
        </ArtistSongs>
      </Suspense>
    </main>
  )
}
