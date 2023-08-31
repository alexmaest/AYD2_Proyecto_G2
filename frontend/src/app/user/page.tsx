import { FaPlayCircle } from 'react-icons/fa'

const albums = [
  {
    id: 1,
    title: 'Beerbongs & Bentleys',
    artist: 'Post Malone',
    cover: 'https://images.genius.com/ef176757a5735c7a104dd735543c1d20.1000x1000x1.png',
    type: 'Álbum'
  }, {
    id: 2,
    title: 'Stoney',
    artist: 'Post Malone',
    cover: 'https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg',
    type: 'Álbum'
  },
  {
    id: 3,
    title: 'Hollywood\'s Bleeding',
    artist: 'Post Malone',
    cover: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png',
    type: 'Álbum'
  },
  {
    id: 4,
    title: 'the bends',
    artist: 'Radiohead',
    cover: 'https://upload.wikimedia.org/wikipedia/en/5/55/Radioheadthebends.png',
    type: 'Álbum'
  },
  {
    id: 5,
    title: 'Battle Born (Deluxe Edition)',
    artist: 'The Killers',
    cover: 'https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/8d/52/d6/8d52d6a2-396b-ae4e-5b69-d277cd4fa76d/00602537141661.rgb.jpg/1200x1200bf-60.jpg',
    type: 'Álbum'
  },
  {
    id: 6,
    title: 'Legends Never Die',
    artist: 'Juice WRLD',
    cover: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Juice_Wrld_-_Legends_Never_Die.png',
    type: 'Álbum'
  }
]

export default async function Page () {
  return (
    <main>
      <section className='px-6 pt-4'>
        <h1 className='font-extrabold text-4xl text-retro-white'>For you</h1>
        <div className='ml-28'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {albums.map(album => (
              <div key={album.id} className='w-1/2 p-2'>
                <div className='flex flex-col items-center justify-center'>
                  <div className='album-card rounded-lg w-56 py-5 bg-retro-black-900 hover:bg-retro-black-800 transition duration-500 cursor-pointer'>
                    <div className='flex flex-col items-center'>
                      <div className='absolute flex flex-col items-end w-40 h-40 justify-end'>
                        <FaPlayCircle className='text-5xl text-retro-orange-600 shadow-2xl opacity-0 play-icon transition duration-500' />
                      </div>
                      <img src={album.cover} alt={album.title} className='w-44 h-44 rounded-lg' />
                    </div>
                    <div className='mx-6'>
                      <p className='text-retro-white font-bold py-2 truncate'>{album.title}</p>
                      <p className='text-retro-black-300 text-sm'>{album.artist}<span> • {album.type}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
