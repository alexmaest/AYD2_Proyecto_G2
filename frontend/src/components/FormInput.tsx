import React from 'react'

interface FormInputProps {
  children: React.ReactNode
  width: string
}

function FormInput ({ children, width }: FormInputProps) {
  return (
    <div className={`${width} flex flex-col gap-2 items-start text-retro-white`}>
      {children}
    </div>
  )
}

export default FormInput
