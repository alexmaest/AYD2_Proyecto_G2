import ArtistTable from '@/components/ArtistsTable'

export default function AdminPage () {
  return (
    <div className='bg-gradient-to-b from-retro-black-500 flex flex-1 h-screen'>
      <section className='m-7 mt-20 rounded-lg bg-retro-black w-full'>
        <h1 className='my-4 mx-7 font-bold text-3xl text-white'>Artistas</h1>
        <div className='relative overflow-x-auto max-h-full p-7'>
          <ArtistTable />
        </div>
      </section>
    </div>
  )
}
