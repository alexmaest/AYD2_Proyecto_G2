import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const alertStyles = {
  danger: { backgroundColor: '#f53636', borderColor: '#f53636', color: '#f53636' },
  success: { backgroundColor: '#36f576', borderColor: '#36f576', color: '#36f576' },
  warning: { backgroundColor: '#fcff4a', borderColor: '#fcff4a', color: '#fcff4a' }
}

const styles = StyleSheet.create({
  alertContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row'
  },
  closeButton: {
    padding: 8
  }
})

const Alert = ({ type, text }) => {
  const [isVisible, setIsVisible] = useState(true)

  const closeAlert = () => {
    setIsVisible(false)
  }

  return isVisible
    ? (
      <View style={[styles.alertContainer, alertStyles[type]]}>
        <Text className='font-bold text-white text-2xl'>{text}</Text>
        <TouchableOpacity onPress={closeAlert} style={styles.closeButton}>
          <Text style={{ color: 'black', fontSize: 15 }}>x</Text>
        </TouchableOpacity>
      </View>
      )
    : null
}

export default Alert
