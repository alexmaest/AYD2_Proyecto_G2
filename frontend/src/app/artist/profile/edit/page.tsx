'use client'
import { useEffect, useMemo, useState } from 'react'
import { TbEye, TbEyeOff } from 'react-icons/tb'
import { baseUrl, apiUrls } from '@/constants/urls'
import { useSession } from 'next-auth/react'
import Button from '@/components/Button'
import FormInput from '@/components/FormInput'
import RadioButton from '@/components/RadioButton'
import Input from '@/components/Input'
import Select from '@/components/Select'
import InputError from '@/components/InputError'
import Alert from '@/components/Alert'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
]

const genders = ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say']

function RegisterForm () {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [gender, setGender] = useState('')
  const [entryGender, setEntryGender] = useState<number>(0)
  const [showPassword, setShowPassword] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertType, setAlertType] = useState<'danger' | 'success'>('danger')
  const [errorMonth, setErrorMonth] = useState('')
  const [errorGender, setErrorGender] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file != null) {
      const reader = new FileReader()

      reader.onload = (e) => {
        if (e.target?.result != null) {
          const base64Data = e.target.result as string
          setFile(file)
          setBase64Image(base64Data)
        }
      }

      reader.readAsDataURL(file)
    }
  }

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

    if (!allValid) return

    try {
      const formattedMonth = `${months.indexOf(month) + 1}`.padStart(2, '0')
      const birthday = `${year}-${formattedMonth}-${day}`
      const formData = {
        userId: session?.user?.id,
        flagPassword: password !== '',
        flagEmail: email !== session?.user?.email,
        flagUsername: username !== session?.user?.username,
        email,
        password,
        username,
        birthday,
        gender: genders.indexOf(gender) + 1,
        image: base64Image
      }

      const response = await fetch(baseUrl + apiUrls.artist.profileConfig, {
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
      setAlertMessage('You have successfully updated your profile!')
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

  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const response = await fetch(baseUrl + apiUrls.artist.profile, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ userId: session?.user?.id })
        })

        if (response.status !== 200) {
          throw new Error('Something went wrong!')
        }

        const data = await response.json()

        setEmail(data.email)
        setUsername(data.nombre)
        setEntryGender(data.gender)
        setGender(genders[entryGender - 1])
        setYear(String(data.year))
        const formmatedDay = `${data.day as string}`.padStart(2, '0')
        setDay(formmatedDay)
        setMonth(months[data.month - 1])
      } catch (error: any) {
        setAlertType('danger')
        setAlertMessage(error.message)
        setIsAlertOpen(true)
      }
    }
    if (session?.user != null) void getArtistInfo()

    console.log({ session })
  }, [session, entryGender])

  if (session?.user == null) return <h1 className='text-white font-bold'>Loading...</h1>

  return (
    <>
      <Alert type={alertType} className='w-[450px]' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{alertMessage}</p>
      </Alert>
      <form action='post' className='flex flex-col items-center gap-6 mt-5' onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id='email'
          type='email'
          label='Update your email'
          placeholder='Enter your email.'
          autoComplete='email'
          isValid={validationStateEmail !== 'invalid'}
          errorMessage='Please enter a valid email address.'
        />
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id='password'
          type='password'
          label='Update your password'
          placeholder='Create a password.'
          isPassword={showPassword}
          autoComplete='off'
          isValid={validationStatePassword !== 'invalid'}
          errorMessage='Your password must be at least 8 characters long.'
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
          label='Update your name'
          placeholder='Enter a profile name.'
          autoComplete='off'
          isValid={validationStateUsername !== 'invalid'}
          note='This appears on your profile.'
          errorMessage='Please enter a valid username.'
        />
        <FormInput width='w-[450px]'>
          <label htmlFor='date' className='font-bold text-[16px]'>
            Update your date of birth
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
            />
            <Select
              values={months}
              onChange={(event) => setMonth(event.target.value)}
              id='month'
              label='Month'
              width='w-[45%]'
              isRequired
              entryMonth={month}
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
            />
          </div>
          {validationStateDay === 'invalid' && (<InputError message='Please enter a valid day.' />)}
          {errorMonth !== '' && (<InputError message={errorMonth} />)}
          {validationStateYear === 'invalid' && (<InputError message='Please enter a valid year.' />)}
        </FormInput>
        <FormInput width='w-[450px]'>
          <label htmlFor='gender' className='font-bold text-[16px]'>
            Do you want to update your gender?
          </label>
          <div className='flex flex-wrap flex-row items-start gap-4'>
            {genders.map((gender_, index) => {
              return (
                <RadioButton
                  label={gender_}
                  value={gender_}
                  onChange={(event) => setGender(event.target.value)}
                  key={index}
                  entryGender={genders[entryGender]}
                />
              )
            })}
          </div>
          {errorGender !== '' && (<InputError message={errorGender} />)}
        </FormInput>
        <div className='flex flex-col w-1/3 flex-1'>
          <h2 className='text-white font-bold'>Profile photo</h2>
          {
                file == null
                  ? (
                    <p className='text-white text-sm'>No file updated</p>
                    )
                  : (
                    <p className='text-white text-sm'>{file.name}</p>
                    )
            }
          <div className='flex items-center justify-center'>
            <label htmlFor='dropzone-file' className='flex flex-col items-center justify-center w-1/2 h-44 border-2 border-dashed rounded-lg cursor-pointer bg-retro-black-800 border-retro-black-600 hover:border-retro-black-500 hover:bg-retro-black-600'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg className='w-8 h-8 mb-4 text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2' />
                </svg>
                <p className='mb-2 text-sm text-gray-400'><span className='font-semibold'>Click to upload your profile photo</span></p>
                <p className='text-xs text-gray-400'>PNG or JPG</p>
              </div>
              <input id='dropzone-file' type='file' className='hidden' onChange={handleFileChange} />
            </label>
          </div>
        </div>
        <Button type='primary'>
          <span className='text-retro-white text-center font-bold text-[16px]'>Update your profile</span>
        </Button>
      </form>
    </>
  )
}

export default RegisterForm
