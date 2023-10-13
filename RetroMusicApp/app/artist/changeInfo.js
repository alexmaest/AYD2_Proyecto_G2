import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  // Button,
  Alert,
  StyleSheet,
  Image
  // FlatList
} from 'react-native'

import { ScrollView } from 'react-native-gesture-handler'
import { baseUrl, apiUrls } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import RetroButton from '../../components/RetroButton'

const RecoveryPassword = () => {
// temporal solo para lo de borrar canciones
  const [idArtist, setIdArtist] = useState(0)

  // Realiza la petición GET al cargar la vista
  useEffect(() => {
    const getSongs = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)

      console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      // console.log(idArtist)
      // console.log(parseInt(session.id))

      const body = {
        userId: parseInt(session.id)
      }

      console.log(JSON.stringify(body))
      setIdArtist(parseInt(session.id))// creo que esta IdArtist da clavos ojo ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc

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
      // setImagenPerfil('default.jpg')
      setPwd('***')
      setEmailFlag(false)
      setUsernameFlag(false)
      setPwdFlag(false)
    }

    getSongs()
  }, [])

  // email
  const [email, setEmail] = useState('default@gmail.com') // del artista
  const [emailFlag, setEmailFlag] = useState(false) // del artista

  // password
  const [pwd, setPwd] = useState('password') // del artista
  const [pwdFlag, setPwdFlag] = useState(false) // del artista

  // username
  const [username, setUsername] = useState('Default') // del artista
  const [usernameFlag, setUsernameFlag] = useState(false) // del artista

  // birthday
  const [birthday, setBirthday] = useState('2012-12-31') // del artista

  // birthday
  const [gender, setGender] = useState('777') // del artista

  // imagen de perfil
  //  [imagenPerfil, setImagenPerfil] = useState() // del artista
  const [selectedImageUri, setSelectedImageUri] = useState(null)
  const [base64Image, setBase64Image] = useState(null)

  // para msg en pantalla ---------------------------------------------------------
  const [alert, setAlert] = useState(false)
  // const [mensaje, setMensaje] = useState('')

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

  /*
  const handleImagenPerfilChange = (text) => { // imagen perfil
    setImagenPerfil(text)
  }
  */

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
      image: base64Image, // si no se hizo cambios enviamos null, else la imagen base64    (base64Image)

      flagPassword: pwdFlag,
      flagEmail: emailFlag,
      flagUsername: usernameFlag
    }

    // console.log(JSON.stringify(body))

    // setMensaje('cambio de contraseña realizado con exito!')
    // Alert.alert('Cambio realizado', 'cambio de contraseña realizado con exito!', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])

    try {
      const response = await fetch(baseUrl + apiUrls.artist.profileConfig, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      /*
      console.log('.........................')
      console.log(response)
      console.log(':::::::::::::::::::::::::')
      console.log(response.status)
      */

      console.log(':::::::::::::::::::::::::')
      console.log(response.status)

      if (response.status !== 200) {
        // setMensaje('no pudimos realizar el cambio de tu informacion de perfil :(')
        Alert.alert('Error', 'no pudimos realizar el cambio de tu informacion de perfil :(', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
        throw new Error("We couldn't update your profile.")
      }

      console.log('todo salio bien!!!')

      // reseteo los flags porq se me olvido xd
      setEmailFlag(false)
      setUsernameFlag(false)
      setPwdFlag(false)

      // setMensaje('cambio de informacion de perfil realizado con exito!')
      Alert.alert('Cambio realizado', 'cambio de informacion de perfil realizado con exito!', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
    } catch (error) {
      console.log(error)
    }
  }

  // temporal solo para refrescar vista
  async function RefrescarInfo () {
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
    // setImagenPerfil('default.jpg')
    setPwd('***')
    setEmailFlag(false)
    setUsernameFlag(false)
    setPwdFlag(false)
  }

  // manejo de la imagen
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'image/*'
      })

      if (!res.canceled) {
        setSelectedImageUri(res.assets[0].uri)
        const fileUri = res.assets[0].uri
        const fileData = await FileSystem.readAsStringAsync(fileUri, {
          encoding: 'base64'
        })

        const base64Image = `data:${res.type};base64,${fileData}`
        setBase64Image(base64Image)
        // console.log(base64Image)
      } else {
        throw new Error('No File Selected')
      }
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
                  onPress={() => { RefrescarInfo(idArtist) }}
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

                <View style={{ padding: 15, borderTopColor: '#000000', borderTopWidth: 1, marginLeft: 0 }}>
                  <Text className='text-retro-white text-lg font-bold'>Image</Text>

                  <View style={styles.Form}>
                    <RetroButton type='white' text='Select File' handlePress={async () => { await selectFile() }} />
                    <View style={styles.ImageContainer}>
                      {selectedImageUri
                        ? (
                          <Image source={{ uri: selectedImageUri }} style={styles.Image} />
                          )
                        : (
                          <TouchableOpacity onPress={selectFile}>
                            <Text style={styles.Text}>Previsualization</Text>
                          </TouchableOpacity>
                          )}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderRadius: 15,
                      backgroundColor: '#2196F3',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onPress={() => { nuevaInfoArtista(email, pwd, username, birthday, gender, base64Image) }}
                  >
                    <Text style={{ color: '#fff' }}>Restablecer informacion</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ padding: 16, display: alert ? 'flex' : 'none' }}>
                  <Text className='text-retro-blue text-md font-bold'>RetroMusic</Text>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32
  },
  Header: {
    color: '#F3EFE0',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  Form: {
    width: '80%',
    gap: 16
  },
  ImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5
  },
  SelectButton: {
    borderColor: 'transparent',
    alignItems: 'center',
    width: 350
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 16
  }
})

export default RecoveryPassword
