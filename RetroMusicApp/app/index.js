import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { Link } from 'expo-router'

export default function Page () {
  return (
    <View className='flex-1 items-center justify-center bg-gray-900'>
      <Text className='font-bold text-white text-2xl'>RetroMusic</Text>
      <Link href='/login' className='text-white'>Login</Link>
      <StatusBar style='dark' />
    </View>
  )
}
