import React from 'react'

interface InputWrapperProps {
  children: React.ReactNode
  width: string
}

function InputWrapper ({ children, width }: InputWrapperProps) {
  return (
    <div className={`${width} flex flex-col gap-2 items-start`}>
      {children}
    </div>
  )
}

export default InputWrapper
