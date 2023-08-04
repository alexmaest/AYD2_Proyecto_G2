interface ButtonProps {
  type: 'primary' | 'secondary'
  children: React.ReactNode
}

const buttonStyles = {
  primary: 'bg-retro-green hover:brightness-90 hover:scale-105',
  secondary: 'bg-retro-orange hover:brightness-110 hover:scale-105'
}

function Button ({ type, children }: ButtonProps) {
  return (
    <button
      className={`group box-border flex items-center justify-center gap-4 rounded-full px-[48px] py-[12px] transition-all duration-300 ease-in-out ${buttonStyles[type]}`}
    >
      {children}
    </button>
  )
}

export default Button
