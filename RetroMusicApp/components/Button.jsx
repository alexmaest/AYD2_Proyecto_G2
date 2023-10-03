import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  primary: {
    backgroundColor: 'bg-retro-green'
  },
  secondary: {
    backgroundColor: 'bg-retro-orange'
  },
  black: {
    backgroundColor: 'bg-[#1D1D1D]'
  },
  white: {
    backgroundColor: 'bg-retro-white'
  }
})

const CustomButton = ({ type, text, onClick }) => {
  return (
    <View style={styles[type]}>
      <Button title={text} onPress={onClick} />
    </View>
  )
}

export default CustomButton
