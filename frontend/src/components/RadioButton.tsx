import React from 'react'

interface RadioButtonProps {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function RadioButton ({ label, value, onChange }: RadioButtonProps) {
  return (
    <div className='flex-initial'>
      <input
        id={label}
        type='radio'
        name='default-radio'
        className='w-4 h-4 text-retro-green checked:bg-retro-green bg-retro-green border-retro-green-300 focus:ring-retro-green focus:ring-2'
        value={value}
        onChange={onChange}
      />
      <label htmlFor={label} className='ml-4 text-[16px]'>{label}</label>
    </div>
  )
}

export default RadioButton
