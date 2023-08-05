import React from 'react'

interface InputWrapperProps {
  className?: string
  children: React.ReactNode
}

function InputWrapper ({ className, children }: InputWrapperProps) {
  return (
    <div className={`w-full flex items-center text-[16px] text-retro-white border-2 rounded-md  h-[48px] focus:outline-none focus:ring-1 focus:ring-retro-white hover:ring-1 hover:ring-retro-white-300 active:border-retro-white-50 ${className !== undefined ? className : ''}`}>
      {children}
    </div>
  )
}

export default InputWrapper
