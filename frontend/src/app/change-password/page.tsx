'use client'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useMemo, useState } from 'react'
import { TbEye, TbEyeOff } from 'react-icons/tb'

function RecoverPassword () {
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [alertType, setAlertType] = useState<'danger' | 'success'>('danger')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const validationStatePassword = useMemo(() => {
    const validatePassword = (password: string) => password.length >= 8
    if (password === '') return undefined

    return (validatePassword(password)) ? 'valid' : 'invalid'
  }, [password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validationStatePassword === 'invalid') {
      return
    }

    try {
      const response = await fetch(baseUrl + apiUrls.auth.updatePassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword: password, token })
      })

      if (response.status !== 200) {
        throw new Error("We couldn't update your password.")
      }
      setAlertType('success')
      setAlertMessage('Your password has been changed successfully!')
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
      <h2 className='text-4xl font-bold text-retro-white'>Set a New Password</h2>
      <form action='post' method='post' className='flex flex-col gap-12 items-center' onSubmit={handleSubmit}>
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id='password'
          type='password'
          label='New password'
          placeholder='Create a new password.'
          isPassword={showPassword}
          autoComplete='off'
          isValid={validationStatePassword !== 'invalid'}
          errorMessage='Your password must be at least 8 characters long.'
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
        <Input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          id='token'
          type='text'
          label='Token'
          placeholder='Enter your token.'
          autoComplete='off'
          isRequired
        />
        <Button
          type='primary'
          className='w-full'
        >
          <span data-testid="cypress-recoveryPassword-ChangeButton" className='text-retro-white text-center font-bold text-[16px]'>Change Password</span>
        </Button>
      </form>
    </main>
  )
}

export default RecoverPassword
