'use client'
interface ButtonProps {
  type: 'primary' | 'secondary' | 'black' | 'white'
  className?: string
  onClick?: () => void
  dataTestId: string
  children: React.ReactNode
}

const buttonStyles = {
  primary: 'bg-retro-green hover:brightness-90 hover:scale-105',
  secondary: 'bg-retro-orange hover:brightness-110 hover:scale-105',
  black: 'bg-[#1D1D1D] hover:brightness-110 hover:scale-105',
  white: 'bg-retro-white hover:brightness-90 hover:scale-105'
}

function Button ({ type, className, onClick, dataTestId, children }: ButtonProps) {
  return (
    <button
      data-testid={dataTestId}
      className={`group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out ${buttonStyles[type]} ${className !== undefined ? className : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
