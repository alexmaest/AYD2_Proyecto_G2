'use client'
import Brand from '@/components/Brand'
import Button from '@/components/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Dropdown from './Dropdown'

function Navbar () {
  const pathname = usePathname()
  return (
    <>
      {pathname === '/' && (<HomeNavbar />)}
      {pathname === '/login' && (<LoginNavbar />)}
      {(pathname === '/recover-password' || pathname === '/change-password') && (<RecoverPasswordNavbar />)}
    </>
  )
}

function HomeNavbar () {
  return (
    <header className='flex flex-row px-16 py-6 bg-[#1D1D1D] items-center justify-between box-border border-b-2 border-retro-black-500 sticky top-0 z-50'>
      <Link href='/' passHref>
        <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
      </Link>
      <div className='flex items-center gap-8'>
        <Dropdown size='md'>
          <Dropdown.Trigger>
            <span className='py-2'>

              Register
            </span>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link
                href='/register'
                className='flex items-center justify-center px-[48px] py-[12px]'
              >
                <span className='text-retro-black text-center font-bold text-[16px]'>Artist</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                href='/register/user'
                className='flex items-center justify-center px-[48px] py-[12px]'
              >
                <span className='text-retro-black text-center font-bold text-[16px]'>User</span>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          type='white'
          onClick={async () => await signIn()}
        >
          <span className='text-retro-black text-center font-bold text-[16px]'>Login</span>
        </Button>
      </div>
    </header>
  )
}

function LoginNavbar () {
  return (
    <header className='flex px-16 py-6 bg-[#1D1D1D] shadow-header'>
      <Link href='/' passHref>
        <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
      </Link>
    </header>
  )
}

function RecoverPasswordNavbar () {
  return (
    <header className='flex px-16 py-6 bg-[#1D1D1D] justify-center box-border border-b-2 border-retro-black-500'>
      <Link href='/' passHref>
        <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
      </Link>
    </header>
  )
}

export default Navbar
