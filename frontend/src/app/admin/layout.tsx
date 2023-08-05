
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
            <div className='flex items-center space-x-4'>
              <p className='text-white text-xl'>
                RetroMusic
              </p>
            </div>
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
