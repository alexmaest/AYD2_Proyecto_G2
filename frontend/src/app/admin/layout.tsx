
export default function AdminLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='h-screen'>
      <nav />
      {children}
    </main>
  )
}
