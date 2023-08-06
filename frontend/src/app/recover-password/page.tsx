'use client'
import Brand from '@/components/Brand'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { apiUrls, baseUrl } from '@/constants/urls'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

function RecoverPassword () {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validationStateEmail = useMemo(() => {
    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
    if (email === '') return undefined

    return (validateEmail(email) != null) ? 'valid' : 'invalid'
  }, [email])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validationStateEmail === 'invalid') {
      return
    }

    try {
      const response = await fetch(`${baseUrl}/${apiUrls.auth.recoverPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (response.status === 200) {
        alert('Registro realizado con éxito')
      } else {
        const { error } = await response.json()
        setError(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header className='flex px-16 py-6 bg-[#1D1D1D] justify-center box-border border-b-2 border-retro-black-500'>
        <Link href='/' passHref>
          <Brand className='h-[48px] w-[182.4px]' color='#F3EFE0' />
        </Link>
      </header>
      <main className='flex flex-col items-center justify-center mx-auto w-1/2 gap-12 section-min-height'>
        <h2 className='text-4xl font-bold text-retro-white'>Recover Your Password</h2>
        {error !== '' && (
          <p className='border-2 border-red-500 text-red-500 text-lg text-center italic p-2'>{error}</p>
        )}
        <p className='w-[400px] text-center font-normal text-base text-retro-white'>
          Enter your RetroMusic <b>email address</b> that you used to register.
          We'll send you an email with your username and a link to reset your password.
        </p>
        <form action='post' method='post' className='flex flex-col gap-12 items-center' onSubmit={handleSubmit}>
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
          <Button
            type='primary'
          >
            <span className='text-retro-white text-center font-bold text-[16px]'>Send</span>
          </Button>
        </form>
      </main>
    </>
  )
}

export default RecoverPassword
