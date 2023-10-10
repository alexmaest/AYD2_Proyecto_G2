import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import * as DocumentPicker from 'expo-document-picker'
import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'
import RetroButton from '../../components/RetroButton'
import Alert from '../../components/Alert'
import { apiUrls, baseUrl } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const calculateTime = (millis) => {
  const secs = millis / 1000
  const minutes = Math.floor(secs / 60)
  const seconds = Math.floor(secs % 60)
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${minutes}:${returnedSeconds}`
}

const getID = async () => {
  const sessionString = await AsyncStorage.getItem('session')
  const session = await JSON.parse(sessionString)
  return session.id
}

const album = () => {
  const id = getID()
  const [file, setFile] = useState()
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('00:00')
  const [genre, setGenre] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('danger')

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'audio/*'
      })

      if (!res.canceled) {
        setFile(res)
      } else {
        throw new Error('No File Selected')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    try {
      const nameParts = file.assets[0].name.split('.')
      const size = file.assets[0].size
      const uri = file.assets[0].uri
      const fileType = nameParts[nameParts.length - 1]
      const fileToUpload = {
        name,
        size,
        uri,
        type: 'application/' + fileType
      }
      const formData = new FormData()
      formData.append('userId', id)
      formData.append('name', name)
      formData.append('duration', duration)
      formData.append('genre', genre)
      formData.append('track', fileToUpload)
      const response = await fetch(baseUrl + apiUrls.artist.uploadSong, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.status !== 200) {
        throw new Error('Something went wrong!')
      }

      setName('')
      setDuration('00:00')
      setFile(null)
      setGenre('')
      setAlertType('success')
      setAlertMessage('Track uploaded successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setDuration(calculateTime(status.durationMillis))
    }
  }

  useEffect(() => {
    const calculateAudioDuration = async () => {
      try {
        await Audio.Sound.createAsync(
          { uri: file.assets[0].uri },
          {
            shouldPlay: false,
            isLooping: false
          },
          onPlaybackStatusUpdate
        )
      } catch (error) {
        console.log(error)
      }
    }
    if (file != null) {
      calculateAudioDuration()
    }
  }, [file])

  return (
    <View style={styles.Container}>
      {alertMessage !== ''
        ? <Alert type={alertType} text={alertMessage} />
        : null}
      <Text style={styles.Header}>Create an album</Text>
      <View style={styles.Form}>
        {file != null
          ? (
            <Text style={styles.Label}>
              File Name: {file.assets[0].name ? file.assets[0].name : ''}
            </Text>
            )
          : null}
        <RetroButton type='white' text='Select File' handlePress={async () => { await selectFile() }} />
        <Text style={styles.Label}>Name</Text>
        <TextInput placeholder='Track Name' style={styles.TextInput} placeholderTextColor='#F3EFE0' onChangeText={text => { setName(text) }} />
        <Text style={styles.Label}>Duration: {duration}</Text>
        <Text style={styles.Label}>Genre</Text>
        <TextInput placeholder='Track Genre' style={styles.TextInput} placeholderTextColor='#F3EFE0' onChangeText={text => { setGenre(text) }} />
        <RetroButton type='primary' text='Upload' handlePress={handleSubmit} />
      </View>
    </View>
  )
}

export default album

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32
  },
  Header: {
    color: '#F3EFE0',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  Form: {
    width: '80%',
    gap: 16
  },
  Label: {
    color: '#F3EFE0',
    fontSize: 16,
    fontWeight: 'bold'
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#F3EFE0',
    borderRadius: 5,
    padding: 10,
    color: '#F3EFE0'
  }
})
