const columns = [
  { name: 'Id', uid: 'id' },
  { name: 'Nombre', uid: 'nombre' },
  { name: 'Email', uid: 'email' },
  { name: 'Status', uid: 'status' }
]

const data = [
  { id: 1, nombre: 'Juan', email: 'juan@gmail.com', status: 'Activo' },
  { id: 2, nombre: 'Pedro', email: 'pedro@gmail.com', status: 'Activo' },
  { id: 3, nombre: 'Maria', email: 'maria@gmail.com', status: 'Activo' }
]

export default function AdminPage () {
  return (
    <div className='bg-gradient-to-b from-retro-black-500 flex flex-1 h-screen'>
      <section className='m-7 mt-20 rounded-lg bg-retro-black w-full'>
        <h1 className='my-4 mx-7 font-bold text-3xl text-white'>Artistas</h1>

        <div className='relative overflow-x-auto max-h-full p-7'>
          <table className='w-full text-sm text-left text-gray-400'>
            <thead className='text-xs uppercase bg-retro-green text-gray-400'>
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
                    {user.nombre}
                  </th>
                  <td className='px-6 py-4'>
                    {user.email}
                  </td>
                  <td className='px-6 py-4'>
                    {user.status}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <a href='#' className='font-medium'>Edit</a>
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
