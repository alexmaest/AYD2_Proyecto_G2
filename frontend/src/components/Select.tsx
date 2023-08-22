import InputWrapper from './InputWrapper'
import FormInput from './FormInput'
import { TbChevronDown } from 'react-icons/tb'

interface SelectProps {
  values: string[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  id: string
  label: string
  isValid: boolean
  isRequired?: boolean
  width?: string
  entryMonth?: string
}

function Select ({ values, onChange, id, label, isValid, isRequired, width, entryMonth }: SelectProps) {
  if (entryMonth === '') return null
  return (
    <FormInput width={(width == null) ? 'w-[450px]' : width}>
      <label htmlFor={id}>{label}</label>
      <InputWrapper className='relative'>
        <select
          name={id}
          id={id}
          className='w-full py-2 px-3 border-none rounded-md focus:outline-none h-full appearance-none bg-retro-black'
          onChange={onChange}
          defaultValue={entryMonth}
          required={isRequired}
        >
          <option className='relative' value='none' disabled>{label}</option>
          {values.map((value, index) => (
            <option key={index} value={value}>{value}</option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center'>
          <TbChevronDown className='h-8 w-8 opacity-70 my-2 mx-3' />
        </div>
      </InputWrapper>
    </FormInput>
  )
}

export default Select
