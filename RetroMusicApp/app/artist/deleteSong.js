import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Button,
  Alert,
  FlatList
} from 'react-native'

// import { Link } from 'expo-router'
// import { ScrollView } from 'react-native-gesture-handler'
import { baseUrl, apiUrls } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ArtistDeleteSongs = () => {
  // ojo porque cada vez que encienda la EC2 cambia la IP xc
  // const EC2 = '3.139.63.102'

  // temporal solo para lo de borrar canciones
  const [idArtist, setIdArtist] = useState(0)
  // para que sea el array de canciones a mostrar con botones, de un artista
  const [songs, setSongs] = useState([])

  // Realiza la petición GET al cargar la vista
  useEffect(() => {
    const getSongs = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)
      setIdArtist(parseInt(session.id))

      console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      console.log(session)

      const response = await fetch(baseUrl + apiUrls.artist.getSongs + '/' + parseInt(session.id), {
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
  /*
  const handleIdArtistChange = (id) => {
    setIdArtist(id)
  }
*/

  // temporal solo para lo de borrar canciones
  async function obtenerCanciones () {
    console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\ncarga de todas las canciones de ese artista')
    const sessionString = await AsyncStorage.getItem('session')
    const session = await JSON.parse(sessionString)
    console.log(' >>>> artista con id:' + parseInt(session.id))

    try {
      const response = await fetch(baseUrl + apiUrls.artist.getSongs + '/' + parseInt(session.id), {
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
    const sessionString = await AsyncStorage.getItem('session')
    const session = await JSON.parse(sessionString)
    console.log(' >>>> artista con id:' + session.id + '    cancion con id:' + idCancion)

    try {
      const res = await fetch(baseUrl + apiUrls.artist.deleteSong + '/' + parseInt(idCancion), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await res.json()
      // despues de la peticion delete imposible que haga algo mas asique ahi se queda la cosa
      // console.log('...............................')
      // console.log(res)
      /*
      Alert.alert('Cancion borrada', 'La cancion ha sido borrada del sistema', [
        { text: 'Aceptar', onPress: () => console.log('CANCION BORRADA') } // se borro la cancion
      ])
      */
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
            Alert.alert('Precausion', 'Esta seguro que desea eliminar la cancion: ' + song.name + '?', [
              {
                text: 'Aceptar',
                onPress: () => borrarCancion(song.id).then(() => {
                  // obtenerCanciones(session)
                })
              }, // aqui ejecuto el ENDPOINT del backend para borrar cancion
              { text: 'Cancelar', onPress: () => console.log('proceso de borrar cancion se ha cancelado') }// aqui desiste de la accion de borrar cancion
            ])
          }}
          // title={String(song.id)} // el titulo del boton a la par de la cancion
          title='X'
          color='red'
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
          <Text className='text-retro-white text-lg font-bold' style={{ marginTop: 26 }}>Una vez borrada una cancion, porfavor utilice el boton de refrescar para ver la lista actualizada</Text>

          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 15,
              backgroundColor: '#1B5045',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => { obtenerCanciones(idArtist) }}
          >
            <Text style={{ color: '#fff' }}>Refrescar</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default ArtistDeleteSongs
