'use client'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Alert from '@/components/Alert'

export default function BannerPage () {
  const { data } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [base64Image, setBase64Image] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [success, setSuccess] = useState('')
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false)

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

  const handleUpload = async () => {
    if (file != null) {
      /*
      Enviar la imagen en base64 al servidor
      */
      try {
        const response = await fetch(`${baseUrl}${apiUrls.artist.uploadBanner}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: data?.user.id,
            image: base64Image
          })
        })

        if (!response.ok) {
          setError('Error al subir la imagen')
          setIsAlertOpen(true)
          throw new Error('Error al subir la imagen')
        }

        setSuccess('Imagen subida correctamente')
        setIsSuccessAlertOpen(true)
      } catch (error) {
        setError('Algo salió mal al subir la imagen')
        setIsAlertOpen(true)
      }
    } else {
      setError('No se ha seleccionado una imagen')
      setIsAlertOpen(true)
    }
  }

  return (
    <section className='mt-20 mx-6 flex flex-col items-center'>
      <Alert type='warning' className='w-[450px] absolute' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{error}</p>
      </Alert>
      {success !== '' && (
        <Alert type='success' className='w-[450px] absolute' isOpen={isSuccessAlertOpen} onClick={() => setIsSuccessAlertOpen(false)}>
          <p>{success}</p>
        </Alert>
      )}
      <div className='flex items-center justify-center w-full'>
        <label htmlFor='dropzone-file' className='flex flex-col items-center justify-center w-1/2 h-44 border-2 border-dashed rounded-lg cursor-pointer bg-retro-black-800 border-retro-black-600 hover:border-retro-black-500 hover:bg-retro-black-600'>
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg className='w-8 h-8 mb-4 text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2' />
            </svg>
            <p className='mb-2 text-sm text-gray-400'><span className='font-semibold'>Click to upload</span></p>
            <p className='text-xs text-gray-400'>PNG or JPG</p>
          </div>
          <input id='dropzone-file' type='file' className='hidden' onChange={handleFileChange} />
        </label>
        <div className='flex items-center justify-center flex-1'>
          <button
            className='rounded w-2/4 h-10 bg-retro-orange-400 shadow-lg shadow-orange-300/50'
            onClick={handleUpload}
          >
            Subir
          </button>
        </div>
      </div>
      {base64Image != null && (
        <div className='w-full mt-4'>
          <h2 className='text-retro-white text-lg font-bold'>Previsualización</h2>
          <img
            className='w-full h-96 object-cover rounded-lg'
            src={base64Image} alt='Previsualización de la imagen'
          />
        </div>
      )}
    </section>
  )
}
