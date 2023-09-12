'use client'
import Brand from '@/components/Brand'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Dropdown from '@/components/Dropdown'
import Button from './Button'

export default function AdminNavbar () {
  return (
    <header>
      <nav className='flex flex-row px-16 py-2 bg-[#1D1D1D] items-center justify-between sticky top-0 z-50'>
        <Link href='/artist'>
          <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
        </Link>
        <ul className='flex items-center gap-4'>
          <li>
            <Dropdown size='md'>
              <Dropdown.Trigger>
                <span className='py-2'>
                  Reportes
                </span>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    href='/admin/songs'
                    className='flex items-center justify-center px-[48px] py-[12px]'
                  >
                    Canciones
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    href='/admin/albums'
                    className='flex items-center justify-center px-[48px] py-[12px]'
                  >
                    Álbumes
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    href='/admin/artists'
                    className='flex items-center justify-center px-[48px] py-[12px]'
                  >
                    Artistas
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
  )
}
