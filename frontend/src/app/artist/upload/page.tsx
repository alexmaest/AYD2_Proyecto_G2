'use client'

import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputWrapper from '@/components/InputWrapper'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useRef } from 'react'

function Upload () {
  const { data: session, status } = useSession()
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('00:00')
  const [file, setFile] = useState<null | File>(null)
  const [fileName, setFileName] = useState('')
  const [fileDataURL, setFileDataURL] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [genre, setGenre] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'danger' | 'success'>('danger')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const trackChange = (e: any) => {
    const _file = e.target.files[0]
    setFileName(_file.name)
    setFile(_file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = session?.user.id
    if (id == null) { return }
    try {
      const formData = new FormData()
      formData.append('userId', `${id}`)
      formData.append('name', name)
      formData.append('duration', duration)
      formData.append('genre', genre)
      formData.append('track', file as File)
      const response = await fetch(baseUrl + apiUrls.artist.uploadSong, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (response.ok) {
        setAlertType('success')
        setAlertMessage(data.message)
        setIsAlertOpen(true)
        setName('')
        setDuration('00:00')
        setFile(null)
        setFileName('')
        setFileDataURL('')
        setGenre('')
        if (audioRef.current != null) {
          audioRef.current.src = ''
        }
      } else {
        setAlertType('danger')
        setAlertMessage(data.message)
        setIsAlertOpen(true)
      }
    } catch (error: any) {
      setAlertType('danger')
      setAlertMessage(error.message)
      setIsAlertOpen(true)
    }
  }

  useEffect(() => {
    let fileReader: FileReader | null = null
    let isCancel = false
    if (file != null) {
      fileReader = new FileReader()
      fileReader.onload = (e: any) => {
        const { result } = e.target
        if ((Boolean(result)) && !isCancel) {
          setFileDataURL(result)
          if (audioRef.current != null) { audioRef.current.src = result }
        }
        if (audioRef.current != null) {
          audioRef.current.onloadedmetadata = () => {
            if (audioRef.current == null) { return }
            const minutes = Math.floor(audioRef.current.duration / 60)
            const seconds = Math.floor(audioRef.current.duration - minutes * 60)
            setDuration(`${minutes}:${seconds}`)
          }
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if ((fileReader != null) && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [file])

  if (status === 'loading') {
    return 'Loading or not authenticated...'
  }

  return (
    <main className='flex flex-col items-center justify-center mx-auto w-1/2 gap-12 section-min-height'>
      <audio className='hidden' ref={audioRef} src={fileDataURL} />
      <Alert type={alertType} className='w-[450px]' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{alertMessage}</p>
      </Alert>
      <h2 className='text-4xl font-bold text-retro-white'>Track Upload</h2>
      <form action='post' method='post' className='flex flex-col gap-12 items-center' onSubmit={handleSubmit}>
        <InputWrapper>
          <p className='py-2 px-3 text-[16px] text-retro-white text-start w-[300px] truncate'>{fileName}</p>
          <label
            className='w-[150px] flex items-center justify-center text-center h-full rounded-sm cursor-pointer bg-retro-white text-retro-black'
            htmlFor='track'
          >Select Track
            <input
              className='hidden'
              type='file'
              id='track'
              accept='.wav, .mp3'
              multiple={false}
              onChange={trackChange}
            />
          </label>
        </InputWrapper>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          id='name'
          type='text'
          label='Name'
          placeholder='Track Name.'
          autoComplete='off'
          isRequired
        />
        <p className='text-[16px] font-bold text-retro-white w-full text-start'>Duration: {duration}</p>
        <Input
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          id='genre'
          type='text'
          label='Genre'
          placeholder='Track Genre.'
          autoComplete='off'
          isRequired
        />
        <Button
          type='primary'
        >
          <span className='text-retro-white text-center font-bold text-[16px]'>Upload</span>
        </Button>
      </form>
    </main>
  )
}

export default Upload
