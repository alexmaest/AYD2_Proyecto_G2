import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import RetroButton from '../../components/RetroButton'
import Alert from '../../components/Alert'
import { apiUrls, baseUrl } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Banner = () => {
  const [id, setId] = useState('')
  const [base64Image, setBase64Image] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('danger')
  const [selectedImageUri, setSelectedImageUri] = useState(null)

  useEffect(() => {
    const getID = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = JSON.parse(sessionString)
      setId(session.id)
    }

    getID()
  }, [])

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'image/*'
      })

      if (!res.canceled) {
        setSelectedImageUri(res.assets[0].uri)
        const fileUri = res.assets[0].uri
        const fileData = await FileSystem.readAsStringAsync(fileUri, {
          encoding: 'base64'
        })

        const base64Image = `data:${res.type};base64,${fileData}`
        setBase64Image(base64Image)
      } else {
        throw new Error('No File Selected')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async () => {
    if (base64Image != null) {
      try {
        const response = await fetch(`${baseUrl}${apiUrls.artist.uploadBanner}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: id,
            image: base64Image
          })
        })

        if (!response.ok) {
          setAlertType('danger')
          setAlertMessage('The banner cannot been uploaded')
          throw new Error('The banner cannot been uploaded')
        }

        setAlertType('success')
        setAlertMessage('Banner uploaded successfully!')
      } catch (error) {
        setAlertType('danger')
        setAlertMessage('The banner cannot been uploaded')
      }
    } else {
      setAlertType('danger')
      setAlertMessage('Banner not selected')
    }
  }

  return (
    <View style={styles.Container}>
      {alertMessage !== ''
        ? <Alert type={alertType} text={alertMessage} />
        : null}
      <Text style={styles.Header}>Upload a Banner</Text>
      <View style={styles.Form}>
        <RetroButton type='white' text='Select File' handlePress={async () => { await selectFile() }} />
        <View style={styles.ImageContainer}>
          {selectedImageUri
            ? (
              <Image source={{ uri: selectedImageUri }} style={styles.Image} />
              )
            : (
              <TouchableOpacity onPress={selectFile} style={styles.SelectButton}>
                <Text style={styles.Text}>Previsualization</Text>
              </TouchableOpacity>
              )}
        </View>
        <RetroButton type='primary' text='Upload' handlePress={handleUpload} />
      </View>
    </View>
  )
}

export default Banner

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
  ImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5
  },
  SelectButton: {
    borderColor: 'transparent',
    alignItems: 'center',
    width: 350
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 16
  }
})
