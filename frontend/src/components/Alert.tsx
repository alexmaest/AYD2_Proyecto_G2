'use client'

import { TbX } from 'react-icons/tb'

interface AlertProps {
  type: 'danger' | 'success' | 'warning'
  className?: string
  isOpen: boolean
  onClick: () => void
  children: React.ReactNode
}

const alertStyles = {
  danger: 'bg-red-300 border-red-700 border-2 text-red-700',
  success: 'bg-green-300 border-green-700 border-2 text-green-700',
  warning: 'bg-yellow-300 border-yellow-700 border-2 text-yellow-700'
}

function Alert ({ type, className, isOpen, onClick, children }: AlertProps) {
  return (
    <div
      className={`${className !== undefined ? className : ''} ${alertStyles[type]} flex justify-between items-center p-4 m-2 rounded backdrop-blur-sm text-lg ${isOpen ? 'inline-flex' : 'hidden'}`}
    >
      {children}
      <button onClick={onClick}>
        <TbX className='w-8 h-8' />
      </button>
    </div>
  )
}

export default Alert
