import FormInput from './FormInput'
import InputWrapper from './InputWrapper'

interface InputProps {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  type: string
  label: string
  placeholder: string
  isPassword?: boolean
  autoComplete?: string
  note?: string
  width?: string
  isValid: boolean
  children?: React.ReactNode
}

function Input ({
  value,
  onChange,
  id,
  type,
  label,
  placeholder,
  isPassword,
  autoComplete,
  note,
  width,
  isValid,
  children
}: InputProps) {
  return (
    <FormInput width={(width == null) ? 'w-[450px]' : width}>
      <label htmlFor={id} className='font-bold text-[16px]'>
        {label}
      </label>
      <InputWrapper className={isValid ? 'border-retro-white' : 'border-red-500'}>
        <input
          type={(isPassword ?? false) ? 'text' : type}
          id={id}
          placeholder={placeholder}
          className='w-full py-2 px-3 placeholder:text-retro-white placeholder:opacity-70 bg-transparent border-none focus:outline-none h-full'
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        {children}
      </InputWrapper>
      {(note != null) && <p className={`text-[14px] ${isValid ? '' : 'text-red-400'}`}>{note}</p>}
    </FormInput>
  )
}

export default Input
