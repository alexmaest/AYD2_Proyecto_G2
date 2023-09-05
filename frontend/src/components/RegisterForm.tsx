'use client'
import { useEffect, useMemo, useState } from 'react'
import { TbEye, TbEyeOff } from 'react-icons/tb'
import { baseUrl, apiUrls } from '@/constants/urls'
import Button from '@/components/Button'
import FormInput from '@/components/FormInput'
import RadioButton from '@/components/RadioButton'
import Input from '@/components/Input'
import Select from '@/components/Select'
import InputError from '@/components/InputError'
import { signIn } from 'next-auth/react'
import Alert from './Alert'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
]

const genders = ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say']

function RegisterForm ({ artistRegister }: { artistRegister: boolean }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [gender, setGender] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertType, setAlertType] = useState<'danger' | 'success'>('danger')
  const [errorMonth, setErrorMonth] = useState('')
  const [errorGender, setErrorGender] = useState('')

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

  const validationStateUsername = useMemo(() => {
    const validateUsername = (username: string) => username.length >= 2
    if (username === '') return undefined

    return (validateUsername(username)) ? 'valid' : 'invalid'
  }, [username])

  const validationStateDay = useMemo(() => {
    const validateDay = (day: string) => day.match(/^(0[1-9]|[12][0-9]|3[01])$/)
    if (day === '') return undefined

    return (validateDay(day) != null) ? 'valid' : 'invalid'
  }, [day])

  const validationStateYear = useMemo(() => {
    const validateYear = (year: string) => year.match(/^(19[0-9][0-9]|20[0-2][0-9]|2030)$/)
    if (year === '') return undefined

    return (validateYear(year) != null) ? 'valid' : 'invalid'
  }, [year])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let allValid = true
    if (validationStateEmail === 'invalid') {
      allValid = false
    }

    if (validationStatePassword === 'invalid') {
      allValid = false
    }

    if (validationStateUsername === 'invalid') {
      allValid = false
    }

    if (validationStateDay === 'invalid') {
      allValid = false
    }

    if (validationStateYear === 'invalid') {
      allValid = false
    }

    if (month === '') {
      setErrorMonth('Please select a month!')
      allValid = false
    }

    if (gender === '') {
      setErrorGender('Please select a gender!')
      allValid = false
    }

    if (!allValid) return

    try {
      const formattedMonth = `${months.indexOf(month) + 1}`.padStart(2, '0')
      const birthday = `${year}-${formattedMonth}-${day}`
      const formData = {
        email,
        password,
        username,
        birthday,
        gender
      }

      const regEndpoint = artistRegister ? apiUrls.auth.register : apiUrls.auth.userRegister
      const response = await fetch(baseUrl + regEndpoint, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })

      if (response.status !== 200) {
        let message = ''
        switch (response.status) {
          case 501:
            message = 'This email is already registered!'
            break
          case 502:
            message = 'This username is already registered!'
            break
          default:
            message = 'Something went wrong!'
            break
        }
        throw new Error(message)
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

  useEffect(() => {
    setErrorMonth('')
  }, [month])

  useEffect(() => {
    setErrorGender('')
  }, [gender])
  return (
    <>
      <Alert type={alertType} className='w-[450px]' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{alertMessage}</p>
      </Alert>
      <form action='post' className='flex flex-col items-center gap-6' onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id='email'
          type='email'
          label='What&apos;s your email?'
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
          label='Create a password'
          placeholder='Create a password.'
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
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          id='username'
          type='text'
          label='What should we call you?'
          placeholder='Enter a profile name.'
          autoComplete='off'
          isValid={validationStateUsername !== 'invalid'}
          note='This appears on your profile.'
          errorMessage='Please enter a valid username.'
          isRequired
        />
        <FormInput width='w-[450px]'>
          <label htmlFor='date' className='font-bold text-[16px]'>
            What&apos;s your date of birth?
          </label>
          <div className='w-full flex justify-between'>
            <Input
              value={day}
              onChange={(event) => setDay(event.target.value)}
              id='day'
              type='text'
              label='Day'
              placeholder='DD'
              width='w-1/5'
              autoComplete='off'
              isValid={validationStateDay !== 'invalid'}
              isRequired
            />
            <Select
              values={months}
              onChange={(event) => setMonth(event.target.value)}
              id='month'
              label='Month'
              width='w-[45%]'
              isRequired
              isValid={errorMonth === ''}
            />
            <Input
              value={year}
              onChange={(event) => setYear(event.target.value)}
              id='year'
              type='text'
              label='Year'
              placeholder='YYYY'
              width='w-1/4'
              autoComplete='off'
              isValid={validationStateYear !== 'invalid'}
              isRequired
            />
          </div>
          {validationStateDay === 'invalid' && (<InputError message='Please enter a valid day.' />)}
          {errorMonth !== '' && (<InputError message={errorMonth} />)}
          {validationStateYear === 'invalid' && (<InputError message='Please enter a valid year.' />)}
        </FormInput>
        <FormInput width='w-[450px]'>
          <label htmlFor='gender' className='font-bold text-[16px]'>
            What&apos;s your gender?
          </label>
          <div className='flex flex-wrap flex-row items-start gap-4'>
            {genders.map((gender, index) => (
              <RadioButton
                key={index}
                label={gender}
                value={gender}
                entryGender=''
                onChange={(event) => setGender(event.target.value)}
              />
            ))}
          </div>
          {errorGender !== '' && (<InputError message={errorGender} />)}
        </FormInput>
        <Button type='primary'>
          <span className='text-retro-white text-center font-bold text-[16px]'>Sign Up</span>
        </Button>
        <div className='flex flex-col w-full items-center gap-6'>
          <div>
            <span className='text-retro-white text-[16px]'>Already have an account?&nbsp;</span>
            <button
              className='text-retro-orange underline text-[16px] font-bold hover:scale-105'
              onClick={async () => await signIn()}
              type='button'
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default RegisterForm
