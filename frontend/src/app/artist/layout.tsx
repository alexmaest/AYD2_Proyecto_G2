import ArtistNavbar from '@/components/ArtistNavbar'

export default function ArtistLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ArtistNavbar />
      {children}
    </>
  )
}
