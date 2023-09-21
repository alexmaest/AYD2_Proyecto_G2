import Brand from '@/components/Brand'
import Link from 'next/link'
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import RegisterForm from '@/components/RegisterForm'

export default async function UserRegister () {
  const session = await getServerSession(options)
  if (session?.user != null) {
    const role = session?.user.role
    if (role === 1) {
      redirect('/admin')
    } else if (role === 2) {
      redirect('/artist')
    } else {
      redirect('/user')
    }
  }

  return (
    <section className='flex flex-col gap-12 items-center my-16'>
      <Link href='/' passHref>
        <Brand className='text-retro-white w-[182.4px] h-[48px]' color='#F3EFE0' />
      </Link>
      <h4 className='text-retro-white font-bold text-[25px]'>Sign up for free to start listening.</h4>
      <RegisterForm artistRegister={false} />
    </section>
  )
}
