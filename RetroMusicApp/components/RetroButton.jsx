import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#1B5045',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 120
  },
  secondary: {
    backgroundColor: '#F3AA60',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 120
  },
  black: {
    backgroundColor: '#1D1D1D',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 120
  },
  white: {
    backgroundColor: '#F3EFE0',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 120
  }
})

const textStyles = StyleSheet.create({
  primary: {
    color: '#F3EFE0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  secondary: {
    color: '#222222',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  black: {
    color: '#F3EFE0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  white: {
    color: '#222222',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

const RetroButton = ({ type, text, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles[type]}>
      <Text style={textStyles[type]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default RetroButton
