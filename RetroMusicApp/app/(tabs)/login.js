import { View, Text, TextInput, Button } from 'react-native'

export default async function Page () {
  const handleLogin = () => {
    // todo
  }

  return (
    <View className='flex-1 items-center justify-center bg-gray-900'>
      <Text className='font-bold text-white text-2xl mb-4'>Login</Text>
      <View className='flex justify-center items-center space-y-5'>
        <TextInput
          className='bg-white w-64 h-8 rounded p-1'
          placeholder='Username'
        />
        <TextInput
          className='bg-white w-64 h-8 rounded p-1'
          placeholder='Password'
        />
        <Text className='text-white'>Forgot password?</Text>
        <Button
          className='rounded bg-retro-orange-400'
          title='Login'
          onClick={handleLogin}
        />
      </View>
    </View>
  )
}
