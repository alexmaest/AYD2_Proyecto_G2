import { SafeAreaView, View, Text, Image } from 'react-native'
import { Link } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'

const Home = () => {
  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-retro-black text-retro-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex-1 items-center justify-center max-w-full'>
          <View className='flex-1 items-center justify-center gap-8 max-w-full my-16'>
            <Text className='text-retro-white text-2xl font-bold text-center'>Welcome to Retro Music!</Text>
            <Image
              source={require('../../assets/cassette.png')} style={{
                height: 230,
                width: 350,
                objectFit: 'fill'
              }}
            />
            <Text className='text-retro-white text-lg text-center'>
              Sing up to get unlimited songs and podcasts with occasional adds. No credit card needed
            </Text>
          </View>
          <Image
            style={{
              maxWidth: '100%',
              aspectRatio: 1440 / 312
            }}
            source={require('../../assets/spacer.png')}
          />
        </View>
        <View
          className='flex-1 flex-row p-4 items-center justify-between gap-6 bg-retro-orange'
          style={{
            paddingVertical: 40
          }}
        >
          <View>
            <Link href='/' className='underline text-retro-black'>
              Who are we?
            </Link>
            <Link href='/team' className='underline text-retro-black'>
              Team
            </Link>
            <Link href='/' className='underline text-retro-black'>
              Contact
            </Link>
            <Link href='/artist' className='underline text-retro-black'>
              Terms of use
            </Link>
            <Link href='/admin' className='underline text-retro-black'>
              Privacy policy
            </Link>
            <Link href='/recovery' className='underline text-retro-black'>
              RECOVERY PASSWORD
            </Link>
          </View>
          <Image
            source={require('../../assets/icons/logo-black.png')} style={{
              height: 160,
              width: 160,
              objectFit: 'contain'
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
