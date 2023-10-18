import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import { baseUrl, apiUrls } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RetroButton from '../../components/RetroButton'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'

const info = () => {
  const [id, setId] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    const getID = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = JSON.parse(sessionString)
      console.log(session.id)
      setId(session.id)
    }

    getID()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const requestBody = JSON.stringify({ userId: id })
        const response = await fetch(
          baseUrl + apiUrls.user.profile,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: requestBody
          }
        )
        const data = await response.json()
        setUser(data)
      } catch (error) {
      }
    }
    fetchUser()
  }, [id])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session')
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 80 }}>
        <Text style={{ color: '#F3EFE0', fontSize: 24, fontWeight: 'bold', marginLeft: 160, marginRight: 100 }}>Mi Perfil</Text>
        <RetroButton
          type='logout'
          text={<FontAwesome name='sign-out' size={20} color='#222222' />}
          handlePress={handleLogout}
        />
      </View>
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.userPhoto}
          source={
            user.photo
              ? { uri: user.photo }
              : require('../../assets/purple.png')
          }
        />
        <Text style={styles.userName}>{user.nombre}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userBirthday}>
          Birthday: {user.dateBirth ? user.dateBirth.split('T')[0] : ''}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#222222'
  },
  text: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 20,
    color: '#F3EFE0',
    fontSize: 16
  },
  logout: {
    color: '#F3EFE0',
    fontSize: 24,
    textAlign: 'center'
  },
  userInfoContainer: {
    alignItems: 'center'
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 180
  },
  userName: {
    color: '#F3EFE0',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold'
  },
  userEmail: {
    color: '#F3EFE0',
    fontSize: 16,
    marginTop: 10
  },
  userBirthday: {
    color: '#F3EFE0',
    fontSize: 16,
    marginTop: 10
  }
}

export default info
