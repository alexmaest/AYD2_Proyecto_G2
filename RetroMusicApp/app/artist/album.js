import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import * as DocumentPicker from 'expo-document-picker'
import { useState, useEffect } from 'react'
import RetroButton from '../../components/RetroButton'
import Alert from '../../components/Alert'
import { apiUrls, baseUrl } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const getID = async () => {
  const sessionString = await AsyncStorage.getItem('session')
  const session = await JSON.parse(sessionString)
  return session.id
}

const album = () => {
  const id = getID()
  const [file, setFile] = useState(null)
  const [base64Image, setBase64Image] = useState(null)
  const [songs, setSongs] = useState([])
  const [albumName, setAlbumName] = useState('')
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [selectedSongs, setSelectedSongs] = useState([])

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'image/*'
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

  useEffect(() => {
    handleFileChange()
  }, [file])

  const handleSongPress = (id) => {
    if (!selectedSongs.includes(id)) {
      setSelectedSongs([...selectedSongs, id])
    }
  }

  const handleFileChange = async () => {
    if (file != null) {
      const base64 = await fileToBase64(file?.assets[0].uri)
      setBase64Image(base64)
    }
  }

  async function fileToBase64 (filePath) {
    try {
      let fileUri = filePath
      if (Platform.OS === 'android' && !fileUri.startsWith('file://')) {
        fileUri = `file://${fileUri}`
      }

      const response = await fetch(fileUri)
      const blob = await response.blob()
      const reader = new window.FileReader()

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          const base64DataWithoutHeader = reader.result.split(',')[1]
          const base64Data = `data:image/png;base64,${base64DataWithoutHeader}`
          resolve(base64Data)
        }

        reader.onerror = (error) => {
          reject(error)
        }

        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Error reading file:', error)
      throw error
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(baseUrl + apiUrls.artist.createAlbum, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: albumName,
          releaseDate: new Date(),
          type: selectedSongs.length > 1 ? 2 : 1,
          userId: await getID(),
          songs: selectedSongs,
          image: base64Image
        })
      })

      if (!response.ok) {
        console.log({ response })
        throw new Error('Something went wrong')
      }

      setAlertType('success')
      setAlertMessage('Album created successfully')
    } catch (error) {
      setAlertType('danger')
      setAlertMessage(error?.message)
    }
  }

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await fetch(baseUrl + apiUrls.artist.getAvailableSongs + `/${await id}`)
        if (!response.ok) {
          throw new Error('Something went wrong')
        }

        const data = await response.json()

        setSongs(data)
      } catch (error) {
        setAlertType('danger')
        setAlertMessage(error.message)
      }
    }

    if (id != null) getSongs()
  }, [id])

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
        <TextInput placeholder='Album name' style={styles.TextInput} placeholderTextColor='#F3EFE0' onChangeText={text => { setAlbumName(text) }} />
        <View>
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSongPress(item.id)}>
                <Text style={{ color: '#F3EFE0', fontSize: 12, fontWeight: 'bold' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text style={{
            color: '#F3EFE0'
          }}
          >Selected Songs: {selectedSongs.join(', ')}
          </Text>
        </View>
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
