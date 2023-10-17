import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl, apiUrls } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'

const User = () => {
  const [id, setId] = useState('')
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [songs, setSongs] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const getID = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = JSON.parse(sessionString)
      setId(session.id)
    }

    getID()
  }, [])

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumResponse = await fetch(baseUrl + apiUrls.user.albums + `/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const albums = await albumResponse.json()
        setAlbums(albums)
      } catch (error) {
      }
    }

    const fetchArtists = async () => {
      try {
        const artistResponse = await fetch(baseUrl + apiUrls.user.artists + `/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application.json'
          }
        })
        const data = await artistResponse.json()
        setArtists(data)
      } catch (error) {
      }
    }

    const fetchSongs = async () => {
      try {
        const artistResponse = await fetch(baseUrl + apiUrls.user.songs + `/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application.json'
          }
        })
        const data = await artistResponse.json()
        const randomSongs = getRandomElements(data, 10)
        setSongs(randomSongs)
      } catch (error) {
      }
    }

    const getRandomElements = (array, count) => {
      const shuffled = array.slice()
      let i = array.length
      const min = i - count
      while (i-- > min) {
        const index = Math.floor((i + 1) * Math.random())
        const temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    }

    fetchAlbums()
    fetchArtists()
    fetchSongs()
  }, [id])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session')
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const handleAlbumPress = (album) => {
    navigation.navigate('album', { album })
  }

  const handleArtistPress = (artist) => {
    navigation.navigate('artist', {
      artist,
      artistData: artists
    })
  }

  return (
    <ScrollView style={styles.Container}>
      <Text style={{ paddingTop: 50, paddingBottom: 20, paddingLeft: 20 }} className='text-retro-white font-bold text-[16px]'>Artist for you</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.Album}
        style={{ marginBottom: 10, paddingLeft: 10 }}
      >
        {artists.map((item) => (
          <View style={styles.ArtistContainer} key={item.id}>
            <TouchableOpacity
              onPress={() => handleArtistPress(item)}
            >
              <Image
                style={styles.ArtistCover}
                source={{ uri: item.linkPhoto }}
              />
            </TouchableOpacity>
            <View style={styles.ArtistInfoContainer}>
              <Text style={styles.ArtistName}>{item.nombre}</Text>
              <Text style={styles.ArtistType}>{item.genero}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text style={{ paddingBottom: 20, paddingLeft: 20 }} className='text-retro-white font-bold text-[16px]'>Albums you might like</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.AlbumsContainer}
        style={{ marginBottom: 10 }}
      >
        {albums.map((item) => (
          <View style={styles.AlbumContainer} key={item.id}>
            <TouchableOpacity
              onPress={() => handleAlbumPress(item)}
            >
              <Image
                style={styles.AlbumCover}
                source={{ uri: item.cover }}
              />
            </TouchableOpacity>
            <Text style={styles.AlbumName}>{item.title}</Text>
            <Text style={styles.AlbumType}>{item.artist} • {item.type}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={{ paddingBottom: 20, paddingLeft: 20 }} className='text-retro-white font-bold text-[16px]'>Songs you might like</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.AlbumsContainer}
        style={{ marginBottom: 10 }}
      >
        {songs.map((item) => (
          <View style={styles.AlbumContainer} key={item.id}>
            <Image
              style={styles.AlbumCover}
              source={{ uri: item.cover }}
            />
            <Text style={styles.AlbumName}>{item.name}</Text>
            <Text style={styles.AlbumType}>{item.artist} • {item.duration}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.Logout} onPress={handleLogout}>
        Logout
      </Text>
    </ScrollView>
  )
}

export default User

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222'
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 48,
    textAlign: 'center'
  },
  Logout: {
    color: '#F3EFE0',
    fontSize: 24,
    textAlign: 'center'
  },
  AlbumsContainer: {
    marginLeft: 15,
    flexDirection: 'row'
  },
  AlbumContainer: {
    backgroundColor: '#383838',
    alignItems: 'center',
    width: 180,
    height: 220,
    marginLeft: 5,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 10
  },
  AlbumCover: {
    borderRadius: 10,
    width: 150,
    height: 150,
    marginTop: 15,
    resizeMode: 'cover'
  },
  AlbumName: {
    color: '#F3EFE0',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center'
  },
  AlbumType: {
    color: '#a4a4a4',
    fontSize: 12,
    textAlign: 'center'
  },
  ArtistContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#383838',
    alignItems: 'center',
    width: 180,
    height: 60,
    marginLeft: 10,
    marginBottom: 20
  },
  ArtistCover: {
    borderRadius: 10,
    width: 50,
    height: 50,
    marginLeft: 10,
    resizeMode: 'cover'
  },
  ArtistInfoContainer: {
    flex: 1,
    marginLeft: 10
  },
  ArtistName: {
    color: '#F3EFE0',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left'
  },
  ArtistType: {
    color: '#818181',
    fontSize: 12,
    textAlign: 'left'
  }
})
