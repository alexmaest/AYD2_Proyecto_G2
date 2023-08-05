const columns = [
  { name: 'Id', uid: 'id' },
  { name: 'Nombre', uid: 'nombre' },
  { name: 'Email', uid: 'email' },
  { name: 'Status', uid: 'status' }
]

const data = [
  { id: 1, nombre: 'Juan', photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', email: 'juan@gmail.com', status: 'Activo' },
  { id: 2, nombre: 'Pedro', photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024a', email: 'pedro@gmail.com', status: 'Activo' },
  { id: 3, nombre: 'Maria', photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024b', email: 'maria@gmail.com', status: 'Activo' },
  { id: 4, nombre: 'Juan', photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024c', email: 'juan@gmail.com', status: 'Activo' },
  { id: 5, nombre: 'Pedro', photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', email: 'pedro@gmail.com', status: 'Activo' },
  { id: 6, nombre: 'Maria', photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024e', email: 'maria@gmail.com', status: 'Activo' }
]

export default function AdminPage () {
  return (
    <div className='bg-gradient-to-b from-retro-black-500 flex flex-1 h-screen'>
      <section className='m-7 mt-20 rounded-lg bg-retro-black w-full'>
        <h1 className='my-4 mx-7 font-bold text-3xl text-white'>Artistas</h1>

        <div className='relative overflow-x-auto max-h-full p-7'>
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
                    <div className='flex items-center space-x-2'>
                      <img className='w-10 h-10 rounded-full border-2 border-retro-blue-400' src={user.photoUrl} alt='Rounded avatar' />
                      <p>
                        {user.nombre}
                      </p>
                    </div>
                  </th>
                  <td className='px-6 py-4'>
                    {user.email}
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-retro-green-800 text-green-200'>{user.status}</span>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <a href='#' className='font-bold'>Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </div>
  )
}
