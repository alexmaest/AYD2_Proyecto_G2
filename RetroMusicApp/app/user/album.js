import React, { useEffect, useState } from 'react'
import { baseUrl, apiUrls } from '../../constants/urls'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import useMusicStore from '../store/musicStore'

const album = () => {
  const route = useRoute()
  const [songs, setSongs] = useState([])
  const { album } = route.params

  const { setSong } = useMusicStore()

  const handleOnPress = (item) => {
    setSong(item)
  }

  useEffect(() => {
    setSongs([])
    const fetchSongs = async () => {
      try {
        const response = await fetch(baseUrl + apiUrls.user.songsForAlbumId + `/${album.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application.json'
          }
        })
        const data = await response.json()
        setSongs(data)
      } catch (error) {
      }
    }

    fetchSongs()
  }, [album.id])

  const getYearFromReleaseDate = (releaseDate) => {
    return releaseDate.slice(0, 4)
  }

  return (
    <View style={styles.container}>
      <View style={styles.albumImageContainer}>
        <Image style={styles.albumCover} source={{ uri: album.cover }} />
      </View>
      <View style={styles.albumInfoContainer}>
        <Text style={styles.albumName}>{album.title}</Text>
        <Text style={styles.albumType}>
          {album.type} • {album.artist} • {getYearFromReleaseDate(album.releaseDate)}
        </Text>
      </View>
      <ScrollView
        vertical
        contentContainerStyle={styles.Album}
        style={{ marginBottom: 10, paddingLeft: 10 }}
      >
        {songs.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleOnPress(item)}
          >
            <View style={styles.songContainer}>
              <Image
                style={styles.songCover}
                source={{ uri: item.cover }}
              />
              <View style={styles.songInfoContainer}>
                <Text style={styles.songName}>{item.name}</Text>
                <Text style={styles.songType}>{item.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222'
  },
  albumImageContainer: {
    marginTop: 80,
    alignItems: 'center'
  },
  albumInfoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  albumName: {
    color: '#F3EFE0',
    fontSize: 14
  },
  albumType: {
    color: '#a4a4a4',
    fontSize: 12
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
  }
})

export default album
