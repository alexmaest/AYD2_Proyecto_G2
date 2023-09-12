import AdminNavbar from '@/components/AdminNavbar'

export default function AdminLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <AdminNavbar />
      {children}
    </main>
  )
}
