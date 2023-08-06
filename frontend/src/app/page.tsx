import Brand from '@/components/Brand'
import Logo from '@/components/Logo'
import Image from 'next/image'
import Link from 'next/link'

export default function Home () {
  return (
    <>
      <header className='flex flex-row px-16 py-6 bg-[#1D1D1D] items-center justify-between box-border border-b-2 border-retro-black-500 sticky top-0 z-50'>
        <Link href='/' passHref>
          <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
        </Link>
        <div className='flex items-center gap-8'>
          <Link href='/login' passHref className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-[#1D1D1D] hover:brightness-90 hover:scale-105'>
            <span className='text-retro-white text-center font-bold text-[16px]'>Login</span>
          </Link>
          <Link href='/register' passHref className='group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out bg-retro-white hover:brightness-90 hover:scale-105'>
            <span className='text-retro-black text-center font-bold text-[16px]'>Register</span>
          </Link>
        </div>
      </header>
      <main className='section-min-height flex flex-col relative xl:static'>
        <div className='flex flex-col xl:flex-row justify-center gap-16 w-full py-24 items-center px-[64px] z-10'>
          <Image
            src='cassette.svg'
            alt='RetroMusic'
            width={512}
            height={335}
            className='object-contain xl:rotate-[-20deg] xl:order-first order-last animate-wiggle-once'
          />
          <div className='flex flex-col gap-8 w-full xl:w-1/3'>
            <h1 className='text-[48px] font-bold text-retro-white text-center'>Welcome to RetroMusic!</h1>
            <p className='text-xl text-center font-semibold text-retro-white-200'>Sing up to get unlimited songs and podcasts with occasional adds. No credit card needed</p>
          </div>
        </div>
        <div className='spacer absolute bottom-0 xl:static' />
      </main>
      <footer
        className='bg-retro-orange text-retro-black font-bold w-full flex flex-col'
      >
        <div className='flex w-full px-16 justify-between'>
          <div className='flex flex-col items-center justify-center py-8'>
            <ul className='flex flex-col gap-4'>
              <Link href='/' passHref className='underline hover:scale-105'>
                Who are we?
              </Link>
              <Link href='/team' passHref className='underline hover:scale-105'>
                Team
              </Link>
              <Link href='/' passHref className='underline hover:scale-105'>
                Contact
              </Link>
              <Link href='/' passHref className='underline hover:scale-105'>
                Terms of use
              </Link>
              <Link href='/' passHref className='underline hover:scale-105'>
                Privacy policy
              </Link>
            </ul>
          </div>
          <Logo className='h-[200px] w-[200px] hover:animate-spin-slow' color='#222222' />
        </div>
        <div className='flex flex-col items-center justify-center py-8'>
          <p className='text-xl font-semibold'>RetroMusic</p>
          <p className='text-lg font-semibold'>© 2021 RetroMusic, Inc.</p>
        </div>
      </footer>
    </>
  )
}
