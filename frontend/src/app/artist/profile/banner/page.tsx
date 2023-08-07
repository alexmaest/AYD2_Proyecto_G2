'use client'
import { useState } from 'react'

export default function BannerPage () {
  const [file, setFile] = useState<File | null>(null)
  const [base64Image, setBase64Image] = useState<string | null>(null)

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

    console.log(file)
    console.log(base64Image)
  }

  console.log(base64Image)

  return (
    <section className='mt-20 mx-6 flex flex-col items-center'>
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
          <button className='rounded w-2/4 h-10 bg-retro-orange-400 shadow-lg shadow-orange-300/50'>
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
