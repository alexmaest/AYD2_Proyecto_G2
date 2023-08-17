'use client'
import { apiUrls, baseUrl } from '@/constants/urls'
import { useEffect, useState } from 'react'
import Alert from './Alert'

const columns = [
  { name: 'Id', uid: 'id' },
  { name: 'Nombre', uid: 'nombre' },
  { name: 'Email', uid: 'email' },
  { name: 'Status', uid: 'status' }
]

interface Artist {
  id: number
  nombre: string
  email: string
  estado: number
  linkPhoto: string
}

export default function ArtistTable () {
  const [data, setData] = useState<Artist[]>([])
  const [error, setError] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)

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

  useEffect(() => {
    void getArtists()
  }, [])

  const handleStatus = async (userId: number) => {
    try {
      const response = await fetch(`${baseUrl}${apiUrls.admin.artistsManagment}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId
        })
      })

      if (!response.ok) {
        console.log({ response })
        setError('Error updating status')
        setIsAlertOpen(true)
      } else {
        void getArtists()
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (data.length === 0) {
    return (
      <p className='font-semibold text-white'>
        Loading...
      </p>
    )
  }
  return (
    <>
      <Alert type='danger' className='w-[450px] h-11 absolute' isOpen={isAlertOpen} onClick={() => setIsAlertOpen(false)}>
        <p>{error}</p>
      </Alert>
      <table className='w-full text-sm text-left text-gray-400'>
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
                <section className='flex items-center space-x-2'>
                  <img className='w-10 h-10 rounded-full border-2 border-retro-blue-400' src={user.linkPhoto} alt='Rounded avatar' />
                  <p>
                    {user.nombre}
                  </p>
                </section>
              </th>
              <td className='px-6 py-4'>
                {user.email}
              </td>
              <td className='px-6 py-4'>
                {
                  user?.estado === 0
                    ? (
                      <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-retro-green-800 text-green-200'>Enabled</span>
                      )
                    : (
                      <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-red-800 text-red-200'>Disabled</span>
                      )
                }
              </td>
              <td className='px-6 py-4 text-right'>
                <button
                  className='font-bold'
                  onClick={async () => await handleStatus(user?.id)}
                >{user?.estado === 0 ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
