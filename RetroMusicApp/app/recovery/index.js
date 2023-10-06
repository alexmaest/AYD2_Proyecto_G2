import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  // Button,
  Alert
  // FlatList
} from 'react-native'

import { Link } from 'expo-router'
// import { Stack, Link } from 'expo-router'
// import HeaderButton from '../../components/HeaderButton'
import { ScrollView } from 'react-native-gesture-handler'
// import { useNavigation } from '@react-navigation/native'
import { baseUrl, apiUrls } from '../../constants/urls'

const RecoveryPassword = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [codeVisible, setCodeVisible] = useState(false)
  const [alert, setAlert] = useState(false)
  const [mensaje0, setMensaje0] = useState('')
  const [mensaje, setMensaje] = useState('')

  // ojo porque cada vez que encienda la EC2 cambia la IP xc

  // const EC2 = '3.14.71.79'

  const handleEmailChange = (text) => {
    setEmail(text)
  }

  const handleCodeChange = (text) => {
    setCode(text)
  }

  const handlePasswordChange = (text) => {
    setPassword(text)
  }

  async function enviarCorreo (text) {
    console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nEnvio de codigo(solicitud de cambio de password) a correo electronico')
    // console.log(' >>>> recibo:' + text)
    const email = { // newPassword, token
      email: text
    }

    console.log(JSON.stringify(email))

    try {
      const response = await fetch(baseUrl + apiUrls.auth.recoverPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      })

      var validation = false

      if (response && response.status !== 200) {
        if (response.status === 406) {
          console.log('This email address currently has a valid token. Please check your email.')
          setMensaje0('Esta direccion de correo, ya posee un token valido, porfavor revise su bandeja de correo electronico!')
          Alert.alert('Alerta', 'Esta direccion de correo, ya posee un token valido, porfavor revise su bandeja de correo electronico!', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
          setCodeVisible(true)// para que se mire el resto
          return
        } else {
          setMensaje0('No pudimos hallar una cuenta con el correo brindado')
          Alert.alert('Error', 'No pudimos hallar una cuenta con el correo brindado', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
          validation = true
          throw new Error("We couldn't find an account with that email address.")
        }
      }
      setMensaje0('revise el msg enviado a su correo electronico')
      Alert.alert('Enviado', 'revise el msg enviado a su correo electronico', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
    } catch (error) {
      console.log(error)
    }

    // si no arroja trow porq no existe el correo pues mostramos el siguiente paso
    if (!validation) {
      setCodeVisible(true)// para que se mire el resto
    }
  }

  async function nuevaContraseña (password, codigo) {
    setAlert(true)
    setCodeVisible(true)// para que se mire el resto
    console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nSolicitud de cambio de password')
    // console.log(' >>>> recibo:' + text)
    const body = { // newPassword, token
      newPassword: password,
      token: codigo
    }

    console.log(JSON.stringify(body))

    try {
      const response = await fetch(baseUrl + apiUrls.auth.updatePassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      if (response.status !== 200) {
        setMensaje('no pudimos realizar el cambio de tu contraseña, porfavor revisa si el token ingresado es el correcto!')
        Alert.alert('Error', 'no pudimos realizar el cambio de tu contraseña, porfavor revisa si el token ingresado es el correcto!', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
        throw new Error("We couldn't update your password.")
      }

      console.log('todo salio bien!!!')
      setMensaje('cambio de contraseña realizado con exito!')
      Alert.alert('Cambio realizado', 'cambio de contraseña realizado con exito!', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
    } catch (error) {
      console.log(error)
    }
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
                    onPress={() => { enviarCorreo(email) }}
                  >
                    <Text style={{ color: '#fff' }}>Enviar</Text>
                  </TouchableOpacity>

                </View>
                <View style={{ padding: 16, display: codeVisible ? 'flex' : 'none' }}>
                  <Text className='text-retro-blue text-md font-bold'>{mensaje0}</Text>
                </View>
                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1, display: codeVisible ? 'flex' : 'none' }}>
                  <Text className='text-retro-white text-lg font-bold'>Ingresa el codigo que te enviamos (token)</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa el código que te enviamos'
                    color='#FFFFFF'
                    // secureTextEntry
                    onChangeText={handleCodeChange}
                    value={code}
                  />

                </View>
                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1, display: codeVisible ? 'flex' : 'none' }}>
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
                    onPress={() => { nuevaContraseña(password, code) }}
                  >
                    <Text style={{ color: '#fff' }}>Restablecer contraseña</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 16, display: alert ? 'flex' : 'none' }}>
                  <Text className='text-retro-blue text-md font-bold'>{mensaje}</Text>
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
              <Link href='/login' className='underline text-retro-black' style={{ fontSize: 20, fontWeight: 'bold' }}>
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
