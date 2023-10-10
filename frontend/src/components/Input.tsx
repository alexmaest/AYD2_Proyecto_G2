import FormInput from './FormInput'
import InputError from './InputError'
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
  isValid?: boolean
  isRequired?: boolean
  errorMessage?: string
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
  isRequired,
  errorMessage,
  children
}: InputProps) {
  return (
    <FormInput width={(width == null) ? 'w-[450px]' : width}>
      <label htmlFor={id} className='font-bold text-[16px]'>
        {label}
      </label>
      <InputWrapper className={(isValid ?? true) ? 'border-retro-white' : 'border-red-500'}>
        <input
          data-testid={`cypress-${id}`}
          type={(isPassword ?? false) ? 'text' : type}
          id={id}
          placeholder={placeholder}
          className='w-full py-2 px-3 placeholder:text-retro-white text-white placeholder:opacity-70 bg-transparent border-none focus:outline-none h-full'
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={isRequired}
        />
        {children}
      </InputWrapper>
      {(note != null) && (isValid ?? false) && <p className='text-[14px]'>{note}</p>}
      {(!(isValid ?? false) && errorMessage != null) && <InputError message={errorMessage} />}
    </FormInput>
  )
}

export default Input
