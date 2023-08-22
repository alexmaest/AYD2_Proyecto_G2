'use client'
import Brand from '@/components/Brand'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function AdminLayout ({
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
            <Link href='/admin'>
              <li className='text-white font-bold'>Inicio</li>
            </Link>
            <li
              className='text-white font-bold cursor-pointer'
              onClick={async () => await signOut()}
            >Logout
            </li>
          </div>
        </ul>
      </nav>
      {children}
    </main>
  )
}
