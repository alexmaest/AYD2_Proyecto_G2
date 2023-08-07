'use client'
import Button from '@/components/Button'
import Logo from '@/components/Logo'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Page () {
  const { data } = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (data != null) {
      const { role } = data.user
      if (role === 0) {
        router.push('/admin')
      } else {
        router.push('/user')
      }
    } else {
      router.push('/')
    }
  }

  return (
    <>
      <section className='flex flex-col items-center justify-center h-screen mx-auto'>
        <div className='bg-gradient-to-r from-retro-green to-retro-blue bg-clip-text text-transparent flex flex-row items-center w-1/3'>
          <Logo className='h-[200px] w-[200px] mr-4' color='#1B5045' />
          <div className='flex flex-col'>
            <h1 className='text-5xl font-bold text-center self-start'>401</h1>
            <p className='text-6xl font-bold text-center'>RetroMusic</p>
          </div>
        </div>
        <section className='width-4xl bg-gradient-to-r from-retro-green to-retro-blue mt-8 p-8 rounded-lg flex flex-col gap-4 w-1/3'>
          <p className='text-3xl text-retro-white font-bold text-center'>No Autorizado</p>
          <p className='text-xl text-center text-retro-white'>No tienes permiso para acceder a esta página.</p>
          <Button
            type='white'
            className='w-1/2 self-end'
            onClick={handleClick}
          >
            <span className='text-retro-black text-center font-bold text-[16px]'>Back to Home</span>
          </Button>
        </section>
      </section>
    </>
  )
}

export default Page
