'use client'
import { useEffect, useState } from 'react'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useSession } from 'next-auth/react'
import UploadImage from '@/components/UploadImage'
import Alert from '@/components/Alert'
import Button from '@/components/Button'

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
  const [selectedSongs, setSelectedSongs] = useState<number[]>([])
  const [albumName, setAlbumName] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(baseUrl + apiUrls.artist.createAlbum, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: albumName,
          releaseDate: new Date(),
          type: selectedSongs.length > 1 ? 2 : 1,
          userId: session?.user?.id,
          songs: selectedSongs,
          image: base64Image
        })
      })

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      setAlertType('success')
      setAlertMessage('Album created successfully')
      setIsAlertOpen(true)
    } catch (error: any) {
      setAlertType('danger')
      setAlertMessage(error?.message)
      setIsAlertOpen(true)
    }
  }

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

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item)

    setCheckedState(updatedCheckedState)

    for (let i = 0; i < updatedCheckedState.length; i++) {
      if (updatedCheckedState[i]) {
        setSelectedSongs([...selectedSongs, songs[i].id])
      }
    }
  }

  const handleAlbumName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumName(event.target.value)
  }

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await fetch(baseUrl + apiUrls.artist.getAvailableSongs + `/${String(session?.user?.id)}`)

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

  return (
    <>
      <Alert type={alertType} className='w-[450px]' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{alertMessage}</p>
      </Alert>
      <section className='mt-5 flex justify-center'>
        <div className='flex flex-col w-2/4'>
          <div className='flex flex-col items-center'>
            <h1 className='text-retro-orange text-center font-bold text-2xl'>Create Album</h1>
            <article className='flex flex-col mt-5'>
              <form className='flex flex-col gap-4' action='post' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2'>
                  <label htmlFor='album-name' className='text-retro-white text-lg'>Album name</label>
                  <input
                    type='text' id='album-name' className='rounded-full px-4 py-2 bg-[#1D1D1D] text-retro-white'
                    value={albumName}
                    onChange={handleAlbumName}
                  />
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
                <h2 className='text-white'>Select songs for your album</h2>
                <ul>
                  {
                  songs?.length > 0 && songs.map((song, index) => (
                    <li key={song.id}>
                      <input
                        type='checkbox'
                        id={`song-${index}`}
                        name={song.name}
                        value={song.name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                      />
                      <span className='ml-2 text-white'>{song.name}</span>

                    </li>
                  ))
                }
                </ul>
                <Button type='secondary'>
                  <span className='text-retro-white text-center font-bold text-[16px]'>Create</span>
                </Button>
              </form>
            </article>
          </div>
        </div>
        <div className='flex flex-col w-2/4 items-center'>
          <h1 className='text-retro-orange text-center font-bold text-2xl pb-12'>Preview</h1>
          <article className='flex items-center'>
            {base64Image != null && <img className='w-72 h-72 object-cover rounded-lg' src={base64Image} alt='Preview' />}
            <h2 className='text-white font-extrabold text-xl ml-5'>{albumName}</h2>
          </article>
        </div>
      </section>
    </>
  )
}
