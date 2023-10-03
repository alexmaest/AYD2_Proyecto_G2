import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Admin = () => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Welcome administrator!</Text>
    </View>
  )
}

export default Admin

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 48,
    textAlign: 'center'
  }
})
