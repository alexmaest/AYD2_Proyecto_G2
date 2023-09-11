import { options } from '@/app/api/auth/[...nextauth]/options'
import fetchUserProfileData from '@/lib/fetchUserProfileData'
import { getServerSession } from 'next-auth'

export default async function ProfilePage () {
  const session = await getServerSession(options)

  const user = await fetchUserProfileData(session?.user?.id ?? 0)

  console.log({ user })
  return (
    <main className='flex flex-row items-center justify-center m-12'>
      <div className='flex flex-row items-center justify-center'>
        <div className='flex flex-col items-center space-y-5'>
          <img
            className='w-40 h-40'
            src={user?.photo ?? `https://robohash.org/${user?.nombre as string}`} alt='Profile photo'
          />
          <div className='bg-retro-black-800 p-4 rounded-full'>
            <h1 className='font-extrabold text-2xl text-retro-white'>{user?.nombre}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <h2 className='font-bold text-lg text-retro-white'>Information</h2>
            <div className='flex flex-col items-center space-y-2'>
              <div className='flex flex-row items-center space-x-2'>
                <h3 className='font-bold text-lg text-retro-white-200'>Name:</h3>
                <h3 className='font-bold text-lg text-retro-white'>{user?.nombre}</h3>
              </div>
              <div className='flex flex-row items-center space-x-2'>
                <h3 className='font-bold text-lg text-retro-white-200'>Birthday:</h3>
                <h3 className='font-bold text-lg text-retro-white'>{user?.day}/{user?.month}/{user?.year}</h3>
              </div>
              <div className='flex flex-row items-center space-x-2'>
                <h3 className='font-bold text-lg text-retro-white-200'>Email:</h3>
                <h3 className='font-bold text-lg text-retro-white'>{user?.email}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
