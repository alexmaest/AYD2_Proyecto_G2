'use client'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useEffect, useState } from 'react'
import Alert from './Alert'

const columns = [
  { name: 'Id', uid: 'id' },
  { name: 'Nombre', uid: 'nombre' },
  { name: 'Email', uid: 'email' }
]

interface Artist {
  id: number
  nombre: string
  email: string
  linkPhoto: string
}

export default function ArtistTable () {
  const [data, setData] = useState<Artist[]>([])
  const [error, setError] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await fetch(`${baseUrl}${apiUrls.admin.artists}`)

        if (!response.ok) {
          setError('Error getting artists')
          setIsAlertOpen(true)
        }

        const data = await response.json()

        setData(data)
      } catch (error) {
        setError('Error getting artists')
        setIsAlertOpen(true)
      }
    }

    void getArtists()
  })
  return (
    <table className='w-full text-sm text-left text-gray-400'>
      <Alert type='danger' className='w-[450px] h-11 absolute' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{error}</p>
      </Alert>
      <thead className='text-xs uppercase bg-retro-orange text-gray-800 shadow-lg shadow-retro-orange/50 !rounded-lg'>
        <tr>
          {columns.map(column => (
            <th key={column.uid} scope='col' className='px-6 py-3'>
              {column.name}
            </th>
          ))}
          <th scope='col' className='px-6 py-3'>
            <span className='sr-only'>Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <td className='px-6 py-4'>
              {user.id}
            </td>
            <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap text-white'>
              <div className='flex items-center space-x-2'>
                <img className='w-10 h-10 rounded-full border-2 border-retro-blue-400' src={user.linkPhoto} alt='Rounded avatar' />
                <p>
                  {user.nombre}
                </p>
              </div>
            </th>
            <td className='px-6 py-4'>
              {user.email}
            </td>
            {
            /*
            <td className='px-6 py-4'>
              <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-retro-green-800 text-green-200'>{user.status}</span>
            </td>
            */
            }
            <td className='px-6 py-4 text-right'>
              <a href='#' className='font-bold'>Edit</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
