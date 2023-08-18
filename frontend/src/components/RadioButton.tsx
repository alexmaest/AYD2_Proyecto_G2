import React from 'react'

interface RadioButtonProps {
  label: string
  value: string
  entryGender: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function RadioButton ({ label, value, entryGender, onChange }: RadioButtonProps) {
  return (
    <div className='flex-initial'>
      <input
        id={label}
        type='radio'
        name='default-radio'
        className='w-4 h-4 text-retro-green checked:bg-retro-green bg-retro-green border-retro-green-300 focus:ring-retro-green focus:ring-2'
        value={value}
        onChange={onChange}
        defaultChecked={entryGender === value}
      />
      <label htmlFor={label} className='ml-4 text-[16px]'>{label}</label>
    </div>
  )
}

export default RadioButton
