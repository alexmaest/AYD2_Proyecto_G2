import { Stack } from 'expo-router'

export default function HomeLayout () {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='admin' options={{ headerShown: false }} />
      <Stack.Screen name='artist' options={{ headerShown: false }} />
      <Stack.Screen name='user' options={{ headerShown: false }} />
    </Stack>
  )
}
