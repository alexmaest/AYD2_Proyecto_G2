import { TbAlertCircleFilled } from 'react-icons/tb'

interface InputErrorProps {
  message: string
}

function InputError ({ message }: InputErrorProps) {
  return (
    <div className='flex flow-row gap-2 items-center'>
      <TbAlertCircleFilled className='text-red-400' />
      <p className='text-[14px] text-red-400'>{message}</p>
    </div>
  )
}

export default InputError
