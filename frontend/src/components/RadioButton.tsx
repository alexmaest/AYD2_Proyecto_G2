import React from 'react'

interface RadioButtonProps {
  label: string
}

function RadioButton ({ label }: RadioButtonProps) {
  return (
    <div className='flex-initial'>
      <input id={label} type='radio' name='default-radio' className='w-4 h-4 text-retro-green checked:bg-retro-green bg-retro-green border-retro-green-300 focus:ring-retro-green focus:ring-2' />
      <label htmlFor={label} className='ml-4 text-[16px] text-retro-white-50'>{label}</label>
    </div>
  )
}

export default RadioButton
