import Brand from '@/components/Brand'
import Link from 'next/link'

export default function ArtistLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <nav className='fixed w-full top-0 px-20 py-4 bg-retro-black'>
        <ul className='flex items-center justify-between'>
          <li className='font-semibold'>
            <Brand className='h-[36px] w-[136.8px]' color='#F3EFE0' />
          </li>
          <div className='flex space-x-4'>
            <Link href='/artist'>
              <li className='text-white font-bold'>Inicio</li>
            </Link>
            <Link href='/artist/profile/banner'>
              <li className='text-white font-bold'>Banner</li>
            </Link>

          </div>
        </ul>
      </nav>
      {children}
    </main>
  )
}
