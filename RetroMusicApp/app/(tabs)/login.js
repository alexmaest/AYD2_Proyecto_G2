import {
  View, Text, TextInput, Button, Modal, Alert,
  Pressable, StyleSheet
} from 'react-native'
import { baseUrl, apiUrls } from '../../constants/urls'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Page () {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const handleLogin = async () => {
    try {
      const response = await fetch(baseUrl + apiUrls.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          pwd
        })
      })

      if (!response.ok) {
        console.log(response)
        setModalVisible(true)
        throw new Error('Something went wrong')
      }

      const data = await response.json()
      AsyncStorage.setItem('session', await JSON.stringify(data))

      switch (data?.role ?? '') {
        case 1:
          router.push('/admin')
          break
        case 2:
          router.push('/artist')
          break
        case 3:
          router.push('/user')
          break
        default:
          setModalVisible(true)
          break
      }
    } catch (error) {
      setModalVisible(true)
      console.error(error)
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)
      if (session) {
        switch (session?.role ?? '') {
          case 1:
            router.push('/admin')
            break
          case 2:
            router.push('/artist')
            break
          case 3:
            router.push('/user')
            break
          default:
            setModalVisible(true)
            break
        }
      }
    }
    checkSession()
  }, [])

  return (
    <View className='flex-1 items-center justify-center bg-gray-900'>
      <Modal
        animationType='slide'
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Something went wrong</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text className='font-bold text-white text-2xl mb-4'>Login</Text>
      <View className='flex justify-center items-center space-y-5'>
        <TextInput
          className='bg-white w-64 h-8 rounded p-1'
          placeholder='Email'
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          className='bg-white w-64 h-8 rounded p-1'
          placeholder='Password'
          onChangeText={setPwd}
          value={pwd}
          secureTextEntry
        />
        <Text
          className='text-white'
          onPress={() => router.push('/recovery')}
        >Forgot password?
        </Text>
        <Button
          className='rounded bg-retro-orange-400'
          title='Login'
          onPress={handleLogin}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
