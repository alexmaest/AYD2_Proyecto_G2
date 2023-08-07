'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { TbEye, TbEyeOff } from 'react-icons/tb'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const validationStateEmail = useMemo(() => {
    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
    if (email === '') return undefined

    return (validateEmail(email) != null) ? 'valid' : 'invalid'
  }, [email])

  const validationStatePassword = useMemo(() => {
    const validatePassword = (password: string) => password.length >= 8
    if (password === '') return undefined

    return (validatePassword(password)) ? 'valid' : 'invalid'
  }, [password])

  return (

    <main className='flex items-center justify-center my-16'>
      <form action='post' className='flex p-16 gap-12 flex-col items-center bg-[#1D1D1D]'>
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
            isValid={validationStateEmail !== 'invalid'}
            errorMessage='Please enter a valid email address.'
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
            isValid={validationStatePassword !== 'invalid'}
            errorMessage='Please enter a valid password.'
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
