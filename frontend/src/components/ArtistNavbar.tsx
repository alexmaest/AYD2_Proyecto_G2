'use client'
import Brand from '@/components/Brand'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import Dropdown from '@/components/Dropdown'
import { useEffect, useState } from 'react'

function ArtistNavbar () {
  const { data: session } = useSession()
  const [photo, setPhoto] = useState('logo.svg')

  useEffect(() => {
    if (session != null) {
      setPhoto(session.user.photo ?? 'logo.svg')
    }
  }, [session])

  return (
    <header>
      <nav className='flex flex-row px-16 py-2 bg-[#1D1D1D] items-center justify-between sticky top-0 z-50'>
        <Link href='/artist'>
          <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
        </Link>
        <ul className='flex items-center gap-4'>
          <li>
            <Link
              href='/artist/upload'
              className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-[#1D1D1D] hover:brightness-90 hover:scale-105'
            >
              <span className='text-retro-white text-center font-bold text-[16px]'>Upload</span>
            </Link>
          </li>
          <li>
            <Link
              href='/artist/create-album'
              className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-[#1D1D1D] hover:brightness-90 hover:scale-105'
            >
              <span className='text-retro-white text-center font-bold text-[16px]'>Create Album</span>
            </Link>
          </li>
          <Dropdown>
            <Dropdown.Trigger>
              <img src={photo} alt='profile' className='w-10 h-10 rounded-full' />
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  href='/artist/profile'
                  className='flex items-center justify-center px-[48px] py-[12px]'
                >
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  href='/artist/profile/edit'
                  className='flex items-center justify-center px-[48px] py-[12px]'
                >
                  Edit profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  className='flex items-center justify-center px-[48px] py-[12px]'
                  href='/artist/profile/banner'
                >
                  Banner
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  type='button'
                  className='w-full flex items-center justify-center px-[48px] py-[12px]'
                  onClick={async () => await signOut()}
                >
                  Sign out
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
      </nav>
    </header>
  )
}

export default ArtistNavbar
