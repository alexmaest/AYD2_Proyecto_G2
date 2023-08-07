import Logo from '@/components/Logo'
import Image from 'next/image'
import Link from 'next/link'

export default function Home () {
  return (
    <>
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
