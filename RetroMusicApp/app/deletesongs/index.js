import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Button,
  Alert,
  FlatList
} from 'react-native'

// import { Link } from 'expo-router'
// import { ScrollView } from 'react-native-gesture-handler'

const ArtistDeleteSongs = () => {
  // ojo porque cada vez que encienda la EC2 cambia la IP xc
  const EC2 = '3.139.63.102'

  // temporal solo para lo de borrar canciones
  const [idArtist, setIdArtist] = useState('2')
  // para que sea el array de canciones a mostrar con botones, de un artista
  const [songs, setSongs] = useState([])

  // Realiza la petición GET al cargar la vista
  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch('http://' + EC2 + ':5000/artist/songs/' + parseInt(idArtist), {
        cache: 'no-cache',
        next: {
          tags: ['songs']
        }
      })

      const songs = await response.json()
      // console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      // console.log(songs)

      // seteo las canciones con las recolectadas por el backend
      setSongs(songs)
    }

    getSongs()
  }, [])

  // --------------------------------------------------------------------------------

  // temporal solo para lo de borrar canciones
  const handleIdArtistChange = (id) => {
    setIdArtist(id)
  }

  // temporal solo para lo de borrar canciones
  async function obtenerCanciones () {
    console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\ncarga de todas las canciones de ese artista')
    console.log(' >>>> artista con id:' + parseInt(idArtist))

    try {
      const response = await fetch('http://' + EC2 + ':5000/artist/songs/' + parseInt(idArtist), {
        cache: 'no-cache',
        next: {
          tags: ['songs']
        }
      })

      const songs = await response.json()
      // console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      // console.log(songs)

      // seteo las canciones con las recolectadas por el backend
      setSongs(songs)

      // Inicializa la lista de canciones obtenidas en response
      // response()
    } catch (error) {
      console.log(error)
    }
  }

  // temporal solo para lo de borrar canciones
  async function borrarCancion (idCancion) {
    console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nborrar cancion del presente artista')
    console.log(' >>>> artista con id:' + idArtist + '    cancion con id:' + idCancion)

    try {
      const res = await fetch('http://' + EC2 + ':5000/artist/deleteSong/' + parseInt(idCancion), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await res.json()
      obtenerCanciones() // para que carguen de nuevo

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const Song = ({ song }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 2, borderColor: '#ccc' }}>
        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', overflow: 'scroll', flexShrink: 1 }}>{song.name} </Text>
        <Button
          onPress={() => {
            // Imprime el ID de la canción
            Alert.alert('Precausion', 'No pudimos hallar una cuenta con el correo brindado', [
              { text: 'Aceptar', onPress: () => borrarCancion(song.id) }, // aqui ejecuto el ENDPOINT del backend
              { text: 'Cancelar', onPress: () => console.log('borrar cancion se ha cancelado') }// aqui desiste de la accion de borrar cancion
            ])
          }}
          title={String(song.id)} // el titulo del boton a la par de la cancion
        >
          Borrar
        </Button>
      </View>
    )
  }

  // --------------------------------------------------------------------------------

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-retro-black'>
      <ImageBackground
        source={require('../../assets/spacer.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ padding: 25 }}>
          <Text className='text-retro-white text-2xl font-bold text-center' style={{ marginTop: 16 }}>
            Eliminar canciones
          </Text>
        </View>

        <FlatList
          data={songs}
          renderItem={({ item }) => (
            <Song song={item} />
          )}
          width={350}
        />

        <View style={{ padding: 16 }}>
          <Text className='text-retro-white text-lg font-bold'>Id de artista a mostrar canciones</Text>
          <TextInput
            style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
            placeholderTextColor='#FFFFFF'
            placeholder='Ingresa tu correo electrónico'
            color='#FFFFFF'
            onChangeText={handleIdArtistChange}
            value={idArtist}
          />
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 15,
              backgroundColor: '#2196F3',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => { obtenerCanciones(idArtist) }}
          >
            <Text style={{ color: '#fff' }}>Enviar</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default ArtistDeleteSongs
