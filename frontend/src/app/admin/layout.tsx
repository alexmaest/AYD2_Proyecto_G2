
export default function AdminLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='h-screen'>
      <nav className='fixed w-full top-0 p-4'>
        <ul>
          <li>Retro Music</li>
        </ul>
      </nav>
      <section className='mt-14'>
        {children}
      </section>
    </main>
  )
}
