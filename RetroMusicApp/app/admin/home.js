import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const Admin = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session')
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Welcome administrator!</Text>
      <Text
        style={styles.Logout}
        onPress={handleLogout}
      >Logout
      </Text>
    </View>
  )
}

export default Admin

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
})
