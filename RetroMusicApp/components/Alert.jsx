import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const alertStyles = {
  danger: { backgroundColor: 'red', borderColor: 'red', color: 'red' },
  success: { backgroundColor: 'lightgreen', borderColor: 'green', color: 'green' },
  warning: { backgroundColor: 'yellow', borderColor: 'yellow', color: 'yellow' }
}

const styles = StyleSheet.create({
  alertContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row'
  }
})

const Alert = ({ type, text }) => {
  return (
    <View
      style={[
        styles.alertContainer,
        alertStyles[type]
      ]}
    >
      <Text className='font-bold text-white text-2xl'>{text}</Text>
    </View>
  )
}

export default Alert
