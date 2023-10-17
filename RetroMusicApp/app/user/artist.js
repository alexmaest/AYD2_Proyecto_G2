import React, { useEffect, useState } from 'react'
import { baseUrl, apiUrls } from '../../constants/urls'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

const Artist = () => {
  const route = useRoute()
  const [banner, setBanner] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [allArtists, setAllArtists] = useState([])
  const navigation = useNavigation()
  const { artist, artistData } = route.params

  const fetchBanner = async () => {
    try {
      const responseBanner = await fetch(
        baseUrl + apiUrls.artist.banner + `/${artist.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application.json'
          }
        }
      )
      const data = await responseBanner.json()
      setBanner(data)
    } catch (error) {
    }
  }

  const fetchAlbums = async () => {
    try {
      const albumResponse = await fetch(baseUrl + apiUrls.user.artistAlbums + `/${artist.id}`, {
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

  const getRandomSongs = () => {
    const allSongs = []
    albums.forEach((album) => {
      const albumSongs = album.songs.map((song) => ({
        ...song,
        albumUrl: album.albumUrl
      }))
      allSongs.push(...albumSongs)
    })
    shuffleArray(allSongs)
    setSongs(allSongs.slice(0, 5))
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  useEffect(() => {
    fetchBanner()
    fetchAlbums()
  }, [artist.id])

  useEffect(() => {
    if (albums.length > 0) {
      getRandomSongs()
    }
    setAllArtists(artistData)
  }, [albums])

  const getYearFromReleaseDate = (releaseDate) => {
    return releaseDate.slice(0, 4)
  }

  const handleAlbumPress = (album) => {
    const updatedAlbum = {
      ...album,
      cover: album.albumUrl,
      title: album.name
    }
    delete updatedAlbum.albumUrl
    delete updatedAlbum.name
    navigation.navigate('album', { album: updatedAlbum })
  }

  const handleArtistPress = (artist) => {
    navigation.navigate('artist', {
      artist,
      artistData
    })
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.artistBanner} source={{ uri: banner.image }} />
      <View style={styles.overlay}>
        <View style={styles.artistInfoContainer}>
          <View style={styles.verifiedContainer}>
            <FontAwesome name='check-circle' size={18} color='#bf680b' />
            <Text style={styles.artistGenre}>Artista Verificado</Text>
          </View>
          <Text style={styles.artistName}>{artist.nombre}</Text>
        </View>
      </View>
      <Text style={{ paddingTop: 50, paddingLeft: 20 }} className='text-retro-white font-bold text-[16px]'>Popular songs</Text>
      <ScrollView
        vertical
        ontentContainerStyle={styles.Album}
        style={{ marginBottom: 10, paddingLeft: 10 }}
      >
        {songs.map((item) => (
          <View style={styles.songContainer} key={item.id}>
            <Image
              style={styles.songCover}
              source={{ uri: item.albumUrl }}
            />
            <View style={styles.songInfoContainer}>
              <Text style={styles.songName}>{item.name}</Text>
              <Text style={styles.songType}>{item.duration}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20 }} className='text-retro-white font-bold text-[16px]'>Discography</Text>
      <ScrollView
        horizontal
        ontentContainerStyle={styles.Album}
        style={{ marginBottom: 10, paddingLeft: 10 }}
      >
        {albums.map((item) => (
          <View style={styles.AlbumContainer} key={item.id}>
            <TouchableOpacity
              onPress={() => handleAlbumPress(item)}
            >
              <Image
                style={styles.AlbumCover}
                source={{ uri: item.albumUrl }}
              />
            </TouchableOpacity>
            <Text style={styles.AlbumName}>{item.name}</Text>
            <Text style={styles.AlbumType}>{item.type} • {getYearFromReleaseDate(item.releaseDate)}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20 }} className='text-retro-white font-bold text-[16px]'>Other artists</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.Album}
        style={{ marginBottom: 10, paddingLeft: 10 }}
      >
        {allArtists.map((item) => (
          <View style={styles.artistsContainer} key={item.id}>
            <TouchableOpacity
              onPress={() => handleArtistPress(item)}
            >
              <Image
                style={styles.artistsCover}
                source={{ uri: item.linkPhoto }}
              />
            </TouchableOpacity>
            <View style={styles.ArtistInfoContainer}>
              <Text style={styles.artistsName}>{item.nombre}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222'
  },
  artistBanner: {
    width: '100%',
    height: 200
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  artistInfoContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 0,
    justifyContent: 'center',
    alignItems: 'left'
  },
  artistName: {
    color: '#F3EFE0',
    fontSize: 36,
    fontWeight: 'bold'
  },
  artistGenre: {
    color: '#a4a4a4',
    fontSize: 12,
    marginLeft: 5
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center'
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
  },
  songContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#383838',
    alignItems: 'center',
    width: 360,
    height: 70,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 2
  },
  songCover: {
    borderRadius: 10,
    width: 50,
    height: 50,
    marginLeft: 10,
    resizeMode: 'cover'
  },
  songInfoContainer: {
    flex: 1,
    marginLeft: 10
  },
  songName: {
    color: '#F3EFE0',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left'
  },
  songType: {
    color: '#818181',
    fontSize: 12,
    textAlign: 'left'
  },
  artistsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 180,
    height: 200,
    marginLeft: 10,
    marginBottom: 20
  },
  artistsCover: {
    borderRadius: 100,
    width: 150,
    height: 150,
    marginTop: 15,
    resizeMode: 'cover'
  },
  artistsName: {
    color: '#F3EFE0',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center'
  }
})

export default Artist
