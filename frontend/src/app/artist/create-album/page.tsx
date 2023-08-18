'use client'
import { useEffect, useState } from 'react'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useSession } from 'next-auth/react'
import UploadImage from '@/components/UploadImage'
import Alert from '@/components/Alert'

interface Song {
  duration: string
  id: number
  genre: string
  name: string
  songUrl: string
}

export default function Page () {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const [songs, setSongs] = useState<Song[]>([])
  const [alertType, setAlertType] = useState<'danger' | 'success'>('danger')
  const [alertMessage, setAlertMessage] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [checkedState, setCheckedState] = useState<boolean[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file != null) {
      const reader = new FileReader()

      reader.onload = (e) => {
        if (e.target?.result != null) {
          const base64Data = e.target.result as string
          setFile(file)
          setBase64Image(base64Data)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await fetch(baseUrl + apiUrls.artist.songs + `/${String(session?.user?.id)}`)

        if (!response.ok) {
          throw new Error('Something went wrong')
        }

        const data = await response.json()

        setSongs(data)
      } catch (error: any) {
        setAlertType('danger')
        setAlertMessage(error.message)
        setIsAlertOpen(true)
      }
    }

    if (session?.user != null) void getSongs()
  }, [session?.user])

  useEffect(() => {
    if (songs.length > 0) {
      const checkedState = new Array(songs.length).fill(false)
      setCheckedState(checkedState)
    }
  }, [songs])

  useEffect(() => {
    console.log({ checkedState })
    console.log({ songs })
  }, [checkedState, songs])

  return (
    <section className='mt-5 flex justify-center'>
      <Alert type={alertType} className='w-[450px]' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{alertMessage}</p>
      </Alert>
      <div className='flex flex-col w-2/4'>
        <div className='flex flex-col items-center'>
          <h1 className='text-retro-white text-center font-bold text-2xl'>Create Album</h1>
          <article className='flex flex-col mt-5'>
            <form className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='album-name' className='text-retro-white text-lg'>Album name</label>
                <input type='text' id='album-name' className='rounded-full px-4 py-2 bg-[#1D1D1D] text-retro-white' />
              </div>
              <UploadImage
                title='Click to upload album cover'
                className='w-full'
                handleFileChange={handleFileChange}
              >
                <h2 className='text-white font-bold'>Profile photo</h2>
                {
                file == null
                  ? (
                    <p className='text-white text-sm'>No file updated</p>
                    )
                  : (
                    <p className='text-white text-sm'>{file.name}</p>
                    )
            }
              </UploadImage>

              <h2>Select songs for your album</h2>
            </form>
          </article>
        </div>
      </div>
      <div className='flex flex-col w-2/4'>
        <h1 className='text-retro-white text-center font-bold text-2xl'>Previsualización</h1>
      </div>
    </section>
  )
}
