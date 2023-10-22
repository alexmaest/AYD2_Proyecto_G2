import ArtistTable from '@/components/ArtistsTable'

export default function AdminPage () {
  return (
    <div className='bg-gradient-to-b from-retro-black-500 flex flex-1 section-min-height'>
      <section className='mx-7 my-8 rounded-lg bg-retro-black w-full'>
        <h1 data-testid="cypress-artists" className='my-8 mx-8 font-bold text-3xl text-white'>Artistas</h1>
        <div className='relative overflow-x-auto max-h-full px-8 pb-8'>
          <ArtistTable />
        </div>
      </section>
    </div>
  )
}
