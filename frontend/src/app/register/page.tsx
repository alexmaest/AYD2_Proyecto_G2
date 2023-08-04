'use client'
import Brand from '@/components/Brand'
import Button from '@/components/Button'
import FormInput from '@/components/FormInput'
import RadioButton from '@/components/RadioButton'
import Link from 'next/link'
import Input from '@/components/Input'
import { useMemo, useState } from 'react'
import { TbEye, TbEyeOff } from 'react-icons/tb'
import Select from '@/components/Select'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
]

const genders = ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say']

function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [gender, setGender] = useState('')
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
    console.log(email)
    console.log(password)
    console.log(username)
    console.log(day)
    console.log(month)
    console.log(year)
    console.log(gender)
  }

  return (
    <section className='flex flex-col gap-12 items-center my-16'>
      <Link href='/' passHref>
        <Brand className='text-retro-white w-[182.4px] h-[48px]' color='#F3EFE0' />
      </Link>
      <h4 className='text-retro-white font-bold text-[25px]'>Sign up for free to start listening.</h4>
      <form action='post' className='flex flex-col items-start gap-6' onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id='email'
          type='email'
          label='What&apos;s your email?'
          placeholder='Enter your email.'
          autoComplete='email'
          isValid={validationStateEmail === undefined ? true : validationStateEmail === 'valid'}
          note={validationStateEmail === 'invalid' ? 'Please enter a valid email.' : undefined}
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
          isValid={validationStatePassword === undefined ? true : validationStatePassword === 'valid'}
          note={validationStatePassword === 'invalid' ? 'Your password must be at least 8 characters long.' : undefined}
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
          isValid={validationStateUsername === undefined ? true : validationStateUsername === 'valid'}
          note={validationStateUsername === 'invalid' ? 'Your username must be at least 2 characters long.' : 'This appears on your profile.'}
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
              isValid={validationStateDay === undefined ? true : validationStateDay === 'valid'}
              note={validationStateDay === 'invalid' ? 'Please enter a valid day.' : undefined}
            />
            <Select
              values={months}
              onChange={(event) => setMonth(event.target.value)}
              id='month'
              label='Month'
              width='w-[45%]'
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
              isValid={validationStateYear === undefined ? true : validationStateYear === 'valid'}
              note={validationStateYear === 'invalid' ? 'Please enter a valid year.' : undefined}
            />
          </div>
        </FormInput>
        <FormInput width='w-[450px]'>
          <label htmlFor='gender' className='font-bold text-[16px]'>
            What&apos;s your gender?
          </label>
          <div className='flex flex-wrap flex-row items-start gap-4'>
            {genders.map((gender, index) => (
              <RadioButton
                label={gender}
                value={gender}
                onChange={(event) => setGender(event.target.value)}
                key={index}
              />
            ))}
          </div>
        </FormInput>
        <div className='flex flex-col w-full items-center gap-6'>
          <Button type='primary'>
            <span className='text-retro-white text-center font-bold text-[16px]'>Sign Up</span>
          </Button>
          <div>
            <span className='text-retro-white text-[16px]'>Already have an account?&nbsp;</span>
            <Link href='/login' passHref className='text-retro-orange underline text-[16px] font-bold hover:scale-105'>
              Log in
            </Link>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Register
