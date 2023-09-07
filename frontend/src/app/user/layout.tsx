'use client'
import Brand from '@/components/Brand'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Button from '@/components/Button'

export default function ArtistLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <nav className='flex flex-row px-16 py-2 bg-[#1D1D1D] items-center justify-between sticky top-0 z-50'>
          <ul className='flex items-center gap-4'>
            <li>
              <Link href='/user'>
                <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
              </Link>
            </li>
          </ul>
          <ul className='flex items-center gap-4'>
            <li>
              <Link
                href='/user/profile'
                className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-[#1D1D1D] hover:brightness-90 hover:scale-105'
              >
                <span className='text-retro-white text-center font-bold text-[16px]'>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href='/user/profile/edit'
                className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-[#1D1D1D] hover:brightness-90 hover:scale-105'
              >
                <span className='text-retro-white text-center font-bold text-[16px]'>Edit Profile</span>
              </Link>
            </li>
            <li>
              <Button
                type='white'
                onClick={async () => await signOut()}
              >
                <span className='text-retro-black text-center font-bold text-[16px]'>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </>
  )
}
