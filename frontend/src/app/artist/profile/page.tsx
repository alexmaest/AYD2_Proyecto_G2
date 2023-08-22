'use client'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { apiUrls, baseUrl } from '@/constants/urls'
import Alert from '@/components/Alert'

export default function ProfilePage () {
  const { data: session } = useSession()

  const [error, setError] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [banner, setBanner] = useState('')

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await fetch(`${baseUrl}${apiUrls.artist.banner}/${session?.user?.id?.toString() as string}`)

        if (!response.ok) {
          setError('Error getting banner')
          setIsAlertOpen(true)
        }

        const data = await response.json()

        return data
      } catch (error) {
        setError('Error getting banner')
        setIsAlertOpen(true)
      }
    }

    if (session?.user != null) {
      const setBannerHandler = async () => {
        const { image } = await getBanner()
        setBanner(image)
      }

      void setBannerHandler()
    }
  }, [session])

  return (
    <div>
      <section className='m-6 mt-20'>
        <Alert type='danger' className='w-[450px] h-11 absolute' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
          <p>{error}</p>
        </Alert>
        <article className='relative -z-10 shadow-header shadow-retro-white-200/20 rounded-lg'>
          <div className='flex absolute bottom-1/2 ml-6 space-x-3'>
            <BsFillPatchCheckFill className='w-6 h-6 text-retro-orange-500' />
            <p className='text-white'>Artista verificado</p>
          </div>
          <h1 className='absolute bottom-1/3 ml-6 font-extrabold text-6xl text-white'>{session?.user?.username}</h1>
          {banner != null && banner !== ''
            ? (
              <img
                className='block w-full h-96 object-cover rounded-lg'
                src={banner} alt='Artist banner'
              />
              )
            : (
              <div className='block w-full h-96 object-cover rounded-lg' />
              )}
        </article>
      </section>
    </div>
  )
}
