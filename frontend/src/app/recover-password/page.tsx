'use client'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useMemo, useState } from 'react'

function RecoverPassword () {
  const [email, setEmail] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'danger' | 'success'>('danger')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

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
      const response = await fetch(baseUrl + apiUrls.auth.recoverPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      if (response.status !== 200) {
        throw new Error("We couldn't find an account with that email address.")
      }
      setAlertType('success')
      setAlertMessage('You have successfully registered!')
      setIsAlertOpen(true)
    } catch (error: any) {
      setAlertType('danger')
      setAlertMessage(error.message)
      setIsAlertOpen(true)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center mx-auto w-1/2 gap-12 section-min-height'>
      <Alert type={alertType} className='w-[450px]' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{alertMessage}</p>
      </Alert>
      <h2 className='text-4xl font-bold text-retro-white'>Recover Your Password</h2>
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
  )
}

export default RecoverPassword
