import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function Header () {
  return (
    <View className='flex items-center justify-center bg-retro-black-600'>
      <Text className='font-bold text-retro-white text-2xl'>RetroMusic</Text>
      <Link href='/login' className='text-retro-white'>Login</Link>
    </View>
  )
}
