'use client'
import Brand from '@/components/Brand'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

function RecoverPassword () {
  const [email, setEmail] = useState('')

  const validationStateEmail = useMemo(() => {
    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
    if (email === '') return undefined

    return (validateEmail(email) != null) ? 'valid' : 'invalid'
  }, [email])
  return (
    <>
      <header className='flex px-16 py-6 bg-[#1D1D1D] justify-center box-border border-b-2 border-retro-black-500'>
        <Link href='/' passHref>
          <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
        </Link>
      </header>
      <main className='flex flex-col items-center justify-center mx-auto w-1/2 gap-12 section-min-height'>
        <h2 className='text-4xl font-bold text-retro-white'>Recover Your Password</h2>
        <p className='w-[400px] text-center font-normal text-base text-retro-white'>Enter your RetroMusic <b>email address</b> that you used to register. We'll send you an email with your username and a link to reset your password.</p>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id='email'
          type='email'
          label='Email'
          placeholder='Enter your email.'
          autoComplete='email'
          isValid={validationStateEmail === undefined ? true : validationStateEmail === 'valid'}
          note={validationStateEmail === 'invalid' ? 'Please enter a valid email.' : undefined}
        />
        <Button
          type='primary'
        >
          <span className='text-retro-white text-center font-bold text-[16px]'>Send</span>
        </Button>
      </main>
    </>
  )
}

export default RecoverPassword
