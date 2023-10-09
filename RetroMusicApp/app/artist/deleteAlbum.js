import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Button,
  Alert,
  FlatList
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { baseUrl, apiUrls } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ArtistDeleteAlbums = () => {
  const [idArtist, setIdArtist] = useState(0)
  const [albums, setAlbums] = useState([])

  // Realiza la petición GET al cargar la vista
  useEffect(() => {
    const getAlbums = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)
      setIdArtist(parseInt(session.id))

      console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      console.log(session)

      const response = await fetch(baseUrl + apiUrls.artist.getAlbums + '/' + parseInt(session.id), {
        cache: 'no-cache',
        next: {
          tags: ['albums']
        }
      })

      const albums = await response.json()
      setAlbums(albums)
    }

    getAlbums()
  }, [])

  async function obtenerAlbumes () {
    const sessionString = await AsyncStorage.getItem('session')
    const session = await JSON.parse(sessionString)

    try {
      const response = await fetch(baseUrl + apiUrls.artist.getAlbums + '/' + parseInt(session.id), {
        cache: 'no-cache',
        next: {
          tags: ['albums']
        }
      })

      const albums = await response.json()
      setAlbums(albums)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAlbum = async (idAlbum) => {
    try {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)
      console.log(' >>>> artista con id:' + session.id + '    album con id:' + idAlbum)
      const res = await fetch(baseUrl + apiUrls.artist.deleteAlbum + '/' + parseInt(idAlbum), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status !== 200) {
        setAlbums(albums.filter(album => album.id !== idAlbum))
      } else {
        console.log('::::::::::::::No se borro::::')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const Album = ({ album }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 2, borderColor: '#ccc' }}>
        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', overflow: 'scroll', flexShrink: 1 }}>{album.name} </Text>
        <Button
          onPress={() => {
            Alert.alert('Precaución', '¿Está seguro que desea eliminar el album: ' + album.name + '?', [
              {
                text: 'Aceptar',
                onPress: () => deleteAlbum(album.id)
              },
              { text: 'Cancelar', onPress: () => console.log('proceso de borrar album se ha cancelado') }
            ])
          }}
          title='Borrar'
        >
          Borrar
        </Button>
      </View>
    )
  }

  /*   const deleteAlbumTest = (id) => {
    console.log(id)
    setAlbums(albums.filter(album => album.id !== id))
  } */

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
            Eliminar albumes
          </Text>
        </View>

        <FlatList
          data={albums}
          renderItem={({ item }) => (
            <Album album={item} />
          )}
          width={350}
        />

        <View style={{ padding: 16 }}>
          <FontAwesome.Button name='rotate-right' backgroundColor='#1B5045' onPress={() => { obtenerAlbumes(idArtist) }}>
            Actualizar
          </FontAwesome.Button>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default ArtistDeleteAlbums
