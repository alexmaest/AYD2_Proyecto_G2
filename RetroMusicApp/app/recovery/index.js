import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView
} from 'react-native'

import { Stack, Link } from 'expo-router'
import HeaderButton from '../../components/HeaderButton'
import { ScrollView } from 'react-native-gesture-handler'

const RecoveryPassword = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [codeVisible, setCodeVisible] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleEmailChange = (text) => {
    setEmail(text)
  }

  const handleCodeChange = (text) => {
    setCode(text)
  }

  const handlePasswordChange = (text) => {
    setPassword(text)
  }

  const handleSubmit = () => {
    console.log('email: ' + email + ' code: ' + code + ' new password: ' + password)
  }

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-retro-black'>
      <ImageBackground
        source={require('../../assets/spacer.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#1D1D1D'
            },
            headerLeft: () => (
              <HeaderButton iconUrl={require('../../assets/icons/logo.png')} dimension='100%' />
            ),
            headerShadowVisible: false,
            headerTitle: ''
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View className='flex-1 items-center justify-center max-w-full'>
            <View className='flex-1 items-center justify-center gap-8 max-w-full my-16'>
              <Text className='text-retro-white text-2xl font-bold text-center'>Recuperacion de contraseña</Text>
              <View>

                <View style={{ padding: 16 }}>
                  <Text className='text-retro-white text-lg font-bold'>Ingrese su correo electrónico de usuario</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa tu correo electrónico'
                    color='#FFFFFF'
                    onChangeText={handleEmailChange}
                    value={email}
                  />
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 15,
                      backgroundColor: '#2196F3',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={() => setCodeVisible(true)}
                  >
                    <Text style={{ color: '#fff' }}>Siguiente</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ padding: 16, display: codeVisible ? 'flex' : 'none' }}>
                  <Text className='text-retro-blue text-md font-bold'>revise el msg enviado a su correo electronico</Text>
                </View>

                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1, display: codeVisible ? 'flex' : 'none' }}>
                  <Text className='text-retro-white text-lg font-bold'>Ingresa el codigo que te enviamos</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa el código que te enviamos'
                    color='#FFFFFF'
                    // secureTextEntry
                    onChangeText={handleCodeChange}
                    value={code}
                  />
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 15,
                      backgroundColor: '#2196F3',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={() => setPasswordVisible(true)}
                  >
                    <Text style={{ color: '#fff' }}>Siguiente</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1, display: passwordVisible ? 'flex' : 'none' }}>
                  <Text className='text-retro-white text-lg font-bold'>Registra tu nueva contraseña</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa tu nueva contraseña'
                    color='#FFFFFF'
                    secureTextEntry
                    onChangeText={handlePasswordChange}
                    value={password}
                  />
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 15,
                      backgroundColor: '#2196F3',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={handleSubmit}
                  >
                    <Text style={{ color: '#fff' }}>Restablecer contraseña</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
          <View
            className='flex-1 flex-row p-4 items-center justify-between gap-4 bg-retro-orange'
            style={{
              paddingVertical: 40
            }}
          >
            <View>
              <Link href='/login' className='underline text-retro-black'>
                Login
              </Link>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default RecoveryPassword
