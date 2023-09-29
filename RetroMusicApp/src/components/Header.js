import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function Header () {
  return (
    <View className='flex items-center justify-center bg-gray-600'>
      <Text className='font-bold text-white text-2xl'>RetroMusic</Text>
      <Link href='/login' className='text-white'>Login</Link>
    </View>
  )
}
