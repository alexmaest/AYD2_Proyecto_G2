import React from 'react'

interface InputProps {
  type: string
  placeholder: string
}

function Input ({ type, placeholder }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='w-full text-[16px] text-retro-white bg-retro-black border-2 py-2 border-retro-white pl-8 h-[48px] focus:outline-none focus:ring-1 focus:ring-retro-white hover:ring-1 hover:ring-retro-white-300 active:border-retro-white-50 placeholder:text-retro-white'
    />
  )
}

export default Input
