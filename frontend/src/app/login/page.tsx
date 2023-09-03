'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TbEye, TbEyeOff } from 'react-icons/tb'
import Alert from '@/components/Alert'

function Login () {
  const { data: session } = useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await signIn('credentials', {
        email,
        pwd: password,
        redirect: false
      })

      if (response?.error !== '') {
        throw new Error('Incorrect username or password.')
      }
    } catch (error: any) {
      setError(error.message)
      setIsAlertOpen(true)
    }
  }
  useEffect(() => {
    setError('')
  }, [email, password])

  useEffect(() => {
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
  }, [session])

  return (

    <main className='flex items-center justify-center my-16'>
      <form
        action='post'
        className='flex p-16 gap-12 flex-col items-center bg-[#1D1D1D]'
        onSubmit={handleSubmit}
      >
        <Alert type='danger' className='w-[450px]' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
          <p>{error}</p>
        </Alert>
        <h2 className='text-4xl font-bold text-retro-white'>Login to RetroMusic</h2>
        <section className='flex flex-col items-start gap-6'>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id='email'
            type='email'
            label='Email'
            placeholder='Enter your email.'
            autoComplete='email'
            isRequired
          />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id='password'
            type='password'
            label='Password'
            placeholder='Password.'
            isPassword={showPassword}
            autoComplete='off'
            isRequired
          >
            <button type='button' onClick={() => setShowPassword(!showPassword)}>
              {showPassword
                ? (
                  <TbEye className='h-8 w-8 opacity-70 my-2 mx-3 hover:opacity-100 hover:scale-110' />)
                : (
                  <TbEyeOff className='h-8 w-8 opacity-70 my-2 mx-3 hover:opacity-100 hover:scale-110' />)}
            </button>
          </Input>
        </section>
        <div className='flex flex-col gap-6 items-center'>
          <Button
            type='primary'
            className='w-[450px]'
          >
            <span className='text-retro-white text-center font-bold text-[16px]'>Log In</span>
          </Button>
          <Link
            href='/recover-password'
            className='text-retro-white underline text-[16px] font-bold hover:scale-105'
          >
            Forgot your password?
          </Link>
        </div>
        <div className='w-[400px] h-[1px] bg-retro-white' />
        <div className='flex flex-row gap-1 text-retro-white'>
          <p>Don’t have an account?</p>
          <Link
            href='/register'
            className='text-retro-orange underline text-[16px] font-bold hover:scale-105'
          >
            Sign up
          </Link>
        </div>
      </form>
    </main>
  )
}

export default Login
