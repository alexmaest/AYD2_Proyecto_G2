import Brand from '@/components/Brand'

export default function AdminLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <nav className='fixed w-full top-0 px-20 py-4 bg-retro-black'>
        <ul className='flex items-center justify-between'>
          <li className='font-semibold'>
            <Brand className='h-[36px] w-[136.8px]' color='#F3EFE0' />
          </li>
          <div className='flex space-x-4'>
            <li className='text-white'>Inicio</li>
          </div>
        </ul>
      </nav>
      {children}
    </main>
  )
}
