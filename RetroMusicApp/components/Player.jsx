import React, { useState, useEffect } from 'react'
import { baseUrl, apiUrls } from '../constants/urls'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import useMusicStore from '../app/store/musicStore'
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MusicPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState(null)
  // const [currentTime, setCurrentTime] = useState(0)

  const { song } = useMusicStore()

  const playSound = async () => {
    /* if (!canPlaySong()) {
      setSound(null)
      setIsPlaying(false)
      return
    } */
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync({ uri: song?.songUrl })
    setSound(sound)
    setIsPlaying(true)
    console.log('Playing Sound')
    await sound.playAsync()
  }

  const pauseSong = async () => {
    await sound.pauseAsync()
    setIsPlaying(false)
  }

  const canPlaySong = async () => {
    try {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)
      const response = await fetch(baseUrl + apiUrls.user.userLimit + `/${session?.id}`, {
        cache: 'no-cache'
      })
      const canPlay = await response.json()
      if (canPlay.result === true) {
        props.setIsAlertOpen(false)
        playSound()
      } else {
        props.setIsAlertOpen(true)
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.stack)
    }
  }
  /*   const handleUpdateTime = (time) => {
    setCurrentTime(time)
  } */

  /* useEffect(() => {

  }, [currentTime]) */

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  if (!song) {
    return null
  } else {
    console.log('Hay canción')
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: song?.cover }} style={styles.albumArt} />
      <View style={styles.songInfo}>
        <Text style={styles?.title}>{song?.name}</Text>
        <Text style={styles?.artist}>{song?.artist}</Text>
      </View>
      <View style={styles.controls}>
        {
          isPlaying
            ? (
              <TouchableOpacity onPress={pauseSong}>
                <AntDesign name='pause' size={24} color='white' />
              </TouchableOpacity>
              )
            : (
              <TouchableOpacity onPress={canPlaySong}>
                <AntDesign name='play' size={24} color='white' />
              </TouchableOpacity>
              )
        }
        {/* <Text style={styles.time}>
          {currentTime} / {song?.duration}
        </Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10
  },
  albumArt: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  songInfo: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  artist: {
    fontSize: 14,
    color: '#666'
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  playPauseButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10
  },
  time: {
    fontSize: 12,
    color: '#666'
  }
})

export default MusicPlayer
