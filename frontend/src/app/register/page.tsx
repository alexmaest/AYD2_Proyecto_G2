import Brand from '@/components/Brand'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputWrapper from '@/components/InputWrapper'
import RadioButton from '@/components/RadioButton'
import Link from 'next/link'

function Register () {
  return (
    <section className='flex flex-col gap-12 items-center my-16'>
      <Link href='/' passHref>
        <Brand className='text-retro-white w-[182.4px] h-[48px]' color='#F3EFE0' />
      </Link>
      <h4 className='text-retro-white font-bold text-[25px]'>Sign up for free to start listening.</h4>
      <form action='post' className='flex flex-col items-start gap-6'>
        <InputWrapper width='w-[450px]'>
          <label htmlFor='email' className='text-retro-white font-bold text-[16px]'>
            What&apos;s your email?
          </label>
          <Input type='email' placeholder='Enter your email' />
        </InputWrapper>
        <InputWrapper width='w-[450px]'>
          <label htmlFor='password' className='text-retro-white font-bold text-[16px]'>
            Create a password
          </label>
          <Input type='password' placeholder='Create a password' />
        </InputWrapper>
        <InputWrapper width='w-[450px]'>
          <label htmlFor='username' className='text-retro-white font-bold text-[16px]'>
            What should we call you?
          </label>
          <Input type='text' placeholder='Enter a profile name' />
        </InputWrapper>
        <InputWrapper width='w-[450px]'>
          <label htmlFor='date' className='text-retro-white font-bold text-[16px]'>
            What&apos;s your date of birth?
          </label>
          <div className='w-full flex justify-between'>
            <InputWrapper width='w-1/5'>
              <label htmlFor='day' className='text-retro-white'>Day</label>
              <Input type='text' placeholder='DD' />
            </InputWrapper>
            <InputWrapper width='w-[45%]'>
              <label htmlFor='month' className='text-retro-white'>Month</label>
              <Input type='text' placeholder='MM' />
            </InputWrapper>
            <InputWrapper width='w-1/4'>
              <label htmlFor='year' className='text-retro-white'>Year</label>
              <Input type='text' placeholder='YYYY' />
            </InputWrapper>
          </div>
        </InputWrapper>
        <InputWrapper width='w-[450px]'>
          <label htmlFor='gender' className='text-retro-white font-bold text-[16px]'>
            What&apos;s your gender?
          </label>
          <div className='flex flex-wrap flex-row items-start gap-4'>
            <RadioButton label='Male' />
            <RadioButton label='Female' />
            <RadioButton label='Non-binary' />
            <RadioButton label='Other' />
            <RadioButton label='Prefer not to say' />
          </div>
        </InputWrapper>
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
