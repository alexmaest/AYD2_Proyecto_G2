import { BsFillPatchCheckFill } from 'react-icons/bs'

export default function ProfilePage () {
  return (
    <div className=''>
      <section className='m-6 mt-20'>
        <article className='relative -z-10 shadow-2xl shadow-red-500'>
          <div className='flex absolute bottom-1/2 ml-6 space-x-3'>
            <BsFillPatchCheckFill className='w-6 h-6 text-retro-orange-500' />
            <p className='text-white'>Artista verificado</p>
          </div>
          <h1 className='absolute bottom-1/3 ml-6 font-extrabold text-6xl text-white'>Post Malone</h1>
          <img
            className='block w-full h-96 object-cover rounded-lg'
            src='https://www.udiscovermusic.com/wp-content/uploads/2022/06/Post-Malone-Adam-De-Gross-copy.jpg' alt='Artist banner'
          />
        </article>
      </section>
    </div>
  )
}
