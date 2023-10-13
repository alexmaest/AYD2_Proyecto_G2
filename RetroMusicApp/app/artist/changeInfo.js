import React, { useState, useEffect } from 'react'
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

import { ScrollView } from 'react-native-gesture-handler'
import { baseUrl, apiUrls } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RecoveryPassword = () => {
// temporal solo para lo de borrar canciones
  const [idArtist, setIdArtist] = useState(0)

  // Realiza la petición GET al cargar la vista
  useEffect(() => {
    const getSongs = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)
      setIdArtist(parseInt(session.id))// creo que esta IdArtist da clavos ojo ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc

      console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      console.log(idArtist)
      console.log(parseInt(session.id))

      const body = {
        userId: parseInt(session.id)
      }

      console.log(JSON.stringify(body))

      // aqui consumo Profile userId
      const response = await fetch(baseUrl + apiUrls.artist.profile, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      const ArtistInfo = await response.json()
      console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      console.log(ArtistInfo)

      // seteo la informacion del artista en la app movil, con la info recolectadas por el backend
      setEmail(ArtistInfo.email)
      setUsername(ArtistInfo.nombre)
      setBirthday(ArtistInfo.year + '-' + ArtistInfo.month + '-' + ArtistInfo.day)
      setGender(ArtistInfo.gender + '')
      setImagenPerfil('default.jpg')
      setPwd('123')
    }

    getSongs()
  }, [])
  // email
  const [email, setEmail] = useState('shakira@gmail.com') // del artista
  const [emailFlag, setEmailFlag] = useState(false) // del artista

  // password
  const [pwd, setPwd] = useState('password') // del artista
  const [pwdFlag, setPwdFlag] = useState(false) // del artista

  // username
  const [username, setUsername] = useState('Shakira') // del artista
  const [usernameFlag, setUsernameFlag] = useState(false) // del artista

  // birthday
  const [birthday, setBirthday] = useState('2012-12-31') // del artista

  // birthday
  const [gender, setGender] = useState('777') // del artista

  // imagen de perfil
  const [imagenPerfil, setImagenPerfil] = useState() // del artista

  // para msg en pantalla ---------------------------------------------------------
  const [alert, setAlert] = useState(false)
  const [mensaje, setMensaje] = useState('')

  // --------------------------------------------------------------------------------------------------- flag-email
  const handleEmailChange = (text) => { // como cambiamos de email activamos el booleano bandera
    setEmail(text)
    handleEmailFlagChange()
  }
  const handleEmailFlagChange = () => {
    setEmailFlag(true)
    // console.log(emailFlag) // para evitar error de Eslint
  }

  // --------------------------------------------------------------------------------------------------- flag-password
  const handlePwdChange = (text) => { // como cambiamos de email activamos el booleano bandera
    setPwd(text)
    handlePwdFlagChange()
  }
  const handlePwdFlagChange = () => {
    setPwdFlag(true)
    // console.log(pwdFlag) // para evitar error de Eslint
  }

  // --------------------------------------------------------------------------------------------------- flag-username
  const handleUsernameChange = (text) => { // como cambiamos de email activamos el booleano bandera
    setUsername(text)
    handleUsernameFlagChange()
  }
  const handleUsernameFlagChange = () => {
    setUsernameFlag(true)
    // console.log(usernameFlag) // para evitar error de Eslint
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleBirthdayChange = (text) => { // birthday
    setBirthday(text)
  }

  const handleGenderChange = (code) => { // gender
    setGender(code)
  }

  const handleImagenPerfilChange = (text) => { // imagen perfil
    setImagenPerfil(text)
  }

  async function nuevaInfoArtista (email0, pwd0, username0, birthday0, gender0, imagenPerfil0) {
    setAlert(true)
    console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nSolicitud de cambio de info en perfil artista')
    console.log('userId: ' + idArtist + ', email: ' + email0 + ', password: ' + pwd0 + ', username: ' + username0 + ', birthdate: ' + birthday0 + ', gender: ' + gender0 + ', foto: ' + imagenPerfil0)
    console.log('flagPassword: ' + pwdFlag + ', flagEmail: ' + emailFlag + ', flagUsername: ' + usernameFlag)

    const body = {
      userId: idArtist, // tengo que ver como lo obtengo!
      email: email0,
      password: pwd0,
      username: username0,
      birthday: birthday0,
      gender: parseInt(gender0),
      image: imagenPerfil0 === 'default.jpg' ? null : imagenPerfil0, // si no se hizo cambios enviamos null, else la imagen base64

      flagPassword: pwdFlag,
      flagEmail: emailFlag,
      flagUsername: usernameFlag
    }

    console.log(JSON.stringify(body))

    setMensaje('cambio de contraseña realizado con exito!')
    Alert.alert('Cambio realizado', 'cambio de contraseña realizado con exito!', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])

    /*
    try {
      const response = await fetch(baseUrl + apiUrls.artist.profileConfig, {
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
    */
  }

  // temporal solo para lo de borrar canciones
  async function obtenerCanciones () {
    console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\ncarga de todas las canciones de ese artista')
    const sessionString = await AsyncStorage.getItem('session')
    const session = await JSON.parse(sessionString)
    console.log(' >>>> artista con id:' + parseInt(session.id))

    console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
    console.log(parseInt(session.id))

    const body = {
      userId: parseInt(session.id)
    }

    console.log(JSON.stringify(body))

    // aqui consumo Profile userId
    const response = await fetch(baseUrl + apiUrls.artist.profile, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const ArtistInfo = await response.json()
    console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
    console.log(ArtistInfo)

    // seteo la informacion del artista en la app movil, con la info recolectadas por el backend
    setEmail(ArtistInfo.email)
    setUsername(ArtistInfo.nombre)
    setBirthday(ArtistInfo.year + '-' + ArtistInfo.month + '-' + ArtistInfo.day)
    setGender(ArtistInfo.gender + '')
    setImagenPerfil('default.jpg')
    setPwd('123')
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
            <View className='flex-1 items-center justify-center gap-8 max-w-full my-1'>
              <Text className='text-retro-white text-2xl font-bold text-center'>Perfil de artista</Text>
              <View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderRadius: 15,
                    backgroundColor: '#2196F3',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => { obtenerCanciones(idArtist) }}
                >
                  <Text style={{ color: '#fff' }}>Refrescar</Text>
                </TouchableOpacity>

                <View style={{ padding: 16 }}>
                  <Text className='text-retro-white text-lg font-bold'>Email</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa tu correo electrónico'
                    color='#FFFFFF'
                    onChangeText={handleEmailChange}
                    value={email}
                  />

                </View>

                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1 }}>
                  <Text className='text-retro-white text-lg font-bold'>Password</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    // placeholder='Ingresa el código que te enviamos'
                    color='#FFFFFF'
                    // secureTextEntry
                    onChangeText={handlePwdChange}
                    value={pwd}
                  />
                </View>

                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1 }}>
                  <Text className='text-retro-white text-lg font-bold'>UserName</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa el código que te enviamos'
                    color='#FFFFFF'
                    onChangeText={handleUsernameChange}
                    value={username}
                  />
                </View>

                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1 }}>
                  <Text className='text-retro-white text-lg font-bold'>Birthday (year-month-day)</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa el código que te enviamos'
                    color='#FFFFFF'
                    onChangeText={handleBirthdayChange}
                    value={birthday}
                  />
                </View>

                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1 }}>
                  <Text className='text-retro-white text-lg font-bold'>Gender (1=male,2=female,3=non-binary,4=other,5=prefer not to say)</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa el código que te enviamos'
                    color='#FFFFFF'
                    onChangeText={handleGenderChange}
                    value={gender}
                  />
                </View>

                <View style={{ padding: 16, borderTopColor: '#000000', borderTopWidth: 1 }}>
                  <Text className='text-retro-white text-lg font-bold'>Image</Text>
                  <TextInput
                    style={{ backgroundColor: '#1D1D1D', borderColor: 'gray', borderWidth: 1 }}
                    placeholderTextColor='#FFFFFF'
                    placeholder='Ingresa tu nueva contraseña'
                    color='#FFFFFF'
                    // secureTextEntry
                    onChangeText={handleImagenPerfilChange}
                    value={imagenPerfil}
                  />

                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 15,
                      backgroundColor: '#2196F3',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={() => { nuevaInfoArtista(email, pwd, username, birthday, gender, imagenPerfil) }}
                  >
                    <Text style={{ color: '#fff' }}>Restablecer informacion</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 16, display: alert ? 'flex' : 'none' }}>
                  <Text className='text-retro-blue text-md font-bold'>{mensaje}</Text>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  )
}

export default RecoveryPassword
