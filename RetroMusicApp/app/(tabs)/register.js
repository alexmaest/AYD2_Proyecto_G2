import { View, Text, StyleSheet } from 'react-native'
import Alert from '../../components/Alert'
import CustomButton from '../../components/Button'

const message = 'You have successfully registered!'

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

export default function Page () {
  return (
    <View className='flex-1 items-center justify-center bg-gray-900'>
      <Alert type='success' text={message} />
      <Text className='text-retro-white font-bold text-[25px] w-[450px] text-center'>Sign up for free to start listening.</Text>
      <CustomButton
        style={styles.primary} type='primary' text='Sign Up'
      />
    </View>
  )
}
