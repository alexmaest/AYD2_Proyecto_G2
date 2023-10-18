import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  // ImageBackground,
  // SafeAreaView,
  // Button,
  Alert,
  StyleSheet,
  Image
  // FlatList
} from 'react-native'

import { router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { baseUrl, apiUrls } from '../../constants/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import RetroButton from '../../components/RetroButton'
import { Picker } from '@react-native-picker/picker'
import { FontAwesome } from '@expo/vector-icons'

const RecoveryPassword = () => {
// temporal solo para lo de borrar canciones
  const [idArtist, setIdArtist] = useState(0)
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

  // imagen de perfil
  //  [imagenPerfil, setImagenPerfil] = useState() // del artista
  const [selectedImageUri, setSelectedImageUri] = useState(null)
  const [base64Image, setBase64Image] = useState(null)

  const [profilePhoto, setProfilePhoto] = useState(null)

  // generos ---------------------------------------------------------------
  const gendersCB = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 },
    { label: 'Non-binary', value: 3 },
    { label: 'Other', value: 4 },
    { label: 'Prefer not to say', value: 5 }
  ]

  const [genderCB, setGenderCB] = useState(1)
  // Realiza la petición GET al cargar la vista
  useEffect(() => {
    const getSongs = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)

      // console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      // console.log(idArtist)
      // console.log(parseInt(session.id))

      const body = {
        userId: parseInt(session.id)
      }

      // console.log(JSON.stringify(body))
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
      // console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
      // console.log(ArtistInfo)

      // seteo la informacion del artista en la app movil, con la info recolectadas por el backend
      setEmail(ArtistInfo.email)
      setUsername(ArtistInfo.nombre)
      setBirthday(ArtistInfo.year + '-' + ArtistInfo.month + '-' + ArtistInfo.day)
      setGenderCB(ArtistInfo.gender)
      setProfilePhoto(ArtistInfo.photo)
      // setImagenPerfil('default.jpg')
      setPwd('***')
      setEmailFlag(false)
      setUsernameFlag(false)
      setPwdFlag(false)
    }

    getSongs()
  }, [])

  const handleGenderCBChange = (value) => {
    // console.log('nuevo genero seleccionado de comboBox: ' + value)
    // console.log(genderCB)
    setGenderCB(value)
    // console.log(genderCB)
  }

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

  /*
  const handleImagenPerfilChange = (text) => { // imagen perfil
    setImagenPerfil(text)
  }
  */

  async function nuevaInfoArtista (email0, pwd0, username0, birthday0, gender0, imagenPerfil0) {
    setAlert(true)
    // console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nSolicitud de cambio de info en perfil artista')
    // console.log('userId: ' + idArtist + ', email: ' + email0 + ', password: ' + pwd0 + ', username: ' + username0 + ', birthdate: ' + birthday0 + ', gender: ' + gender0 + ', foto: ' + imagenPerfil0)
    // console.log('flagPassword: ' + pwdFlag + ', flagEmail: ' + emailFlag + ', flagUsername: ' + usernameFlag)

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

      // console.log(':::::::::::::::::::::::::')
      // console.log(response.status)

      if (response.status !== 200) {
        // setMensaje('no pudimos realizar el cambio de tu informacion de perfil :(')
        Alert.alert('Error', 'no pudimos realizar el cambio de tu informacion de perfil :(', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
        throw new Error("We couldn't update your profile.")
      }

      // console.log('todo salio bien!!!')

      // reseteo los flags porq se me olvido xd
      setEmailFlag(false)
      setUsernameFlag(false)
      setPwdFlag(false)
      RefrescarInfo()
      // setMensaje('cambio de informacion de perfil realizado con exito!')
      Alert.alert('Cambio realizado', 'cambio de informacion de perfil realizado con exito!', [{ text: 'Aceptar', onPress: () => console.log('alert closed') }])
    } catch (error) {
      console.log(error)
    }
  }

  // temporal solo para refrescar vista
  async function RefrescarInfo () {
    // console.log('\n\n\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\ncarga de todas las canciones de ese artista')
    const sessionString = await AsyncStorage.getItem('session')
    const session = await JSON.parse(sessionString)
    // console.log(' >>>> artista con id:' + parseInt(session.id))

    // console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
    // console.log(parseInt(session.id))

    const body = {
      userId: parseInt(session.id)
    }

    // console.log(JSON.stringify(body))

    // aqui consumo Profile userId
    const response = await fetch(baseUrl + apiUrls.artist.profile, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const ArtistInfo = await response.json()
    // console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
    // console.log(ArtistInfo)

    // seteo la informacion del artista en la app movil, con la info recolectadas por el backend
    setEmail(ArtistInfo.email)
    setUsername(ArtistInfo.nombre)
    setBirthday(ArtistInfo.year + '-' + ArtistInfo.month + '-' + ArtistInfo.day)
    setGenderCB(ArtistInfo.gender)
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session')
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 65 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', gap: 25, maxWidth: '100%', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#F3EFE0', fontSize: 24, fontWeight: 'bold', marginLeft: 90, marginRight: 50 }}>Perfil de artista</Text>
              <RetroButton
                type='logout'
                text={<FontAwesome name='sign-out' size={20} color='#222222' />}
                handlePress={handleLogout}
              />
            </View>
            <Image
              style={styles.ArtistCover}
              source={{ uri: profilePhoto }}
            />
            <View>
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
                <Text className='text-retro-white text-lg font-bold'>Gender</Text>

                <Picker
                  style={{
                    backgroundColor: '#133830',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    color: '#FFFFFF', // Color del texto en el componente Picker
                    width: '100%'
                  }}
                  selectedValue={genderCB}
                  onValueChange={handleGenderCBChange}
                >
                  {gendersCB.map((gender, index) => (
                    <Picker.Item key={index} label={gender.label} value={gender.value} />
                  ))}
                </Picker>

              </View>

              <View style={{ padding: 15, borderTopColor: '#000000', borderTopWidth: 1, marginLeft: 0 }}>
                <Text style={{ padding: 10 }} className='text-retro-white text-lg font-bold'>Image</Text>

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
                    padding: 15,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1B5045'
                  }}
                  onPress={() => { nuevaInfoArtista(email, pwd, username, birthday, genderCB, base64Image) }}
                >
                  <Text className='text-retro-white text-lg font-bold'>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    gap: 32
  },
  Header: {
    color: '#F3EFE0',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  Form: {
    width: '100%',
    gap: 16,
    paddingBottom: 20
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
  },
  Logout: {
    color: '#F3EFE0',
    fontSize: 24,
    textAlign: 'center'
  },
  ArtistCover: {
    borderRadius: 100,
    width: 150,
    height: 150,
    marginLeft: 10,
    resizeMode: 'cover'
  }
})

export default RecoveryPassword
