import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { baseUrl, apiUrls } from '../../constants/urls'
import Alert from '../../components/Alert'
import { Picker } from '@react-native-picker/picker'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
]

const genders = ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say']

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [gender, setGender] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertType, setAlertType] = useState('danger')
  const [errorMonth, setErrorMonth] = useState('')
  const [errorGender, setErrorGender] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation()

  const handleLoginPress = () => {
    navigation.navigate('login', { screen: 'login' })
  }

  const validationStateEmail = useMemo(() => {
    const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    if (email === '') return undefined

    return validateEmail(email) != null ? 'valid' : 'invalid'
  }, [email])

  const validationStatePassword = useMemo(() => {
    const validatePassword = (password) => password.length >= 8
    if (password === '') return undefined

    return validatePassword(password) ? 'valid' : 'invalid'
  }, [password])

  const validationStateUsername = useMemo(() => {
    const validateUsername = (username) => username.length >= 2
    if (username === '') return undefined

    return validateUsername(username) ? 'valid' : 'invalid'
  }, [username])

  const validationStateDay = useMemo(() => {
    const validateDay = (day) => day.match(/^(0[1-9]|[12][0-9]|3[01])$/)
    if (day === '') return undefined

    return validateDay(day) != null ? 'valid' : 'invalid'
  }, [day])

  const validationStateYear = useMemo(() => {
    const validateYear = (year) => year.match(/^(19[0-9][0-9]|20[0-2][0-9]|2030)$/)
    if (year === '') return undefined

    return validateYear(year) != null ? 'valid' : 'invalid'
  }, [year])

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let allValid = true
    if (validationStateEmail === 'invalid') {
      allValid = false
    }

    if (validationStatePassword === 'invalid') {
      allValid = false
    }

    if (validationStateUsername === 'invalid') {
      allValid = false
    }

    if (validationStateDay === 'invalid') {
      allValid = false
    }

    if (validationStateYear === 'invalid') {
      allValid = false
    }

    if (month === '') {
      setErrorMonth('Please select a month!')
      allValid = false
    }

    if (gender === '') {
      setErrorGender('Please select a gender!')
      allValid = false
    }

    if (!allValid) return

    try {
      const formattedMonth = `${months.indexOf(month) + 1}`.padStart(2, '0')
      const birthday = `${year}-${formattedMonth}-${day}`
      const formData = {
        email,
        password,
        username,
        birthday,
        gender
      }
      const regEndpoint = apiUrls.auth.register
      const response = await fetch(baseUrl + regEndpoint, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })

      if (response.status !== 200) {
        let message = ''
        switch (response.status) {
          case 501:
            message = 'This email is already registered!'
            break
          case 502:
            message = 'This username is already registered!'
            break
          default:
            message = 'Something went wrong!'
            break
        }
        throw new Error(message)
      }
      setAlertType('success')
      setAlertMessage('You have successfully registered!')
      setIsAlertOpen(true)
    } catch (error) {
      setAlertType('danger')
      setAlertMessage(error.message)
      setIsAlertOpen(true)
    }
  }

  useEffect(() => {
    setErrorMonth('')
  }, [month])

  useEffect(() => {
    setErrorGender('')
  }, [gender])

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-retro-black text-retro-white'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ paddingTop: 120, paddingBottom: 60, justifyContent: 'center', alignItems: 'center', height: 10 }}>
          <Image
            source={require('../../assets/icons/logo.png')}
            style={{
              height: 50,
              width: 50
            }}
          />
        </View>
        <Text className='text-retro-white font-bold text-[18px]' style={{ textAlign: 'center' }}>Sign up for free to start uploading content.</Text>
        <View style={{ padding: 30 }}>
          {isAlertOpen && (
            <View style={{ width: 350, paddingBottom: 10 }}>
              <Alert
                type={alertType}
                text={alertMessage}
              />
            </View>
          )}
          <View>
            <Text style={{ paddingBottom: 5 }} className='text-retro-white font-bold text-[14px]'>What's your email?</Text>
            <TextInput
              placeholderTextColor='#F3EFE0'
              placeh
              style={{
                borderWidth: 1,
                borderColor: validationStateEmail === 'invalid' ? 'red' : 'white',
                borderRadius: 5,
                padding: 10,
                color: '#F3EFE0'
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder='Enter your email.'
              autoCompleteType='email'
              required
            />
            {validationStateEmail === 'invalid' && (
              <Text style={{ color: 'red', fontSize: 12 }}>
                Please enter a valid email address.
              </Text>
            )}
            <Text style={{ paddingTop: 10, paddingBottom: 5 }} className='text-retro-white font-bold text-[14px]'>Create a password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholderTextColor='#F3EFE0'
                style={{
                  borderWidth: 1,
                  borderColor: validationStatePassword === 'invalid' ? 'red' : 'white',
                  borderRadius: 5,
                  padding: 10,
                  color: '#F3EFE0',
                  width: 300
                }}
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={(text) => setPassword(text)}
                placeholder='Enter your password.'
                autoCompleteType='password'
                required
              />
              <TouchableOpacity style={{ paddingLeft: 20 }} onPress={toggleShowPassword}>
                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color='#F3EFE0' />
              </TouchableOpacity>
            </View>
            {validationStatePassword === 'invalid' && (
              <Text style={{ color: 'red', fontSize: 12 }}>
                Your password must be at least 8 characters long.
              </Text>
            )}
            <Text style={{ paddingTop: 10, paddingBottom: 5 }} className='text-retro-white font-bold text-[14px]'>What should we call you?</Text>
            <TextInput
              placeholderTextColor='#F3EFE0'
              placeh
              style={{
                borderWidth: 1,
                borderColor: validationStateUsername === 'invalid' ? 'red' : 'white',
                borderRadius: 5,
                padding: 10,
                color: '#F3EFE0'
              }}
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder='Enter a profile name'
              autoCompleteType='username'
              required
            />
            {validationStateUsername === 'invalid' && (
              <Text style={{ color: 'red', fontSize: 12 }}>
                Please enter a valid username.
              </Text>
            )}
            <Text style={{ paddingTop: 10, paddingBottom: 5 }} className='text-retro-white font-bold text-[14px]'>What&apos;s your date of birth?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Day</Text>
                <TextInput
                  placeholderTextColor='#F3EFE0'
                  style={{
                    borderWidth: 1,
                    borderColor: validationStateDay === 'invalid' ? 'red' : 'white',
                    borderRadius: 5,
                    padding: 10,
                    color: '#F3EFE0'
                  }}
                  value={day}
                  onChangeText={(text) => setDay(text)}
                  placeholder='DD'
                  keyboardType='numeric'
                  required
                />
              </View>
              <View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Month</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#F3EFE0',
                    width: 180,
                    height: 50
                  }}
                >
                  <Picker
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 10,
                      color: '#F3EFE0',
                      width: 180
                    }}
                    selectedValue={month}
                    onValueChange={(itemValue) => setMonth(itemValue)}
                  >
                    {months.map((month, index) => (
                      <Picker.Item key={index} label={month} value={month} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View>
                <Text className='text-retro-white font-bold text-[12px]'>Year</Text>
                <TextInput
                  placeholderTextColor='#F3EFE0'
                  style={{
                    borderWidth: 1,
                    borderColor: validationStateYear === 'invalid' ? 'red' : 'white',
                    borderRadius: 5,
                    padding: 10,
                    color: '#F3EFE0'
                  }}
                  value={year}
                  onChangeText={(text) => setYear(text)}
                  placeholder='YYYY'
                  keyboardType='numeric'
                  required
                />
              </View>
            </View>

            {errorMonth !== '' && <Text style={{ color: 'red' }}>Please enter a valid year.</Text>}
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Text className='text-retro-white font-bold text-[12px]' style={{ fontWeight: 'bold', fontSize: 14, paddingBottom: 5 }}>What's your gender?</Text>
              <View style={{ width: 350, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                {genders.map((gen, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                    <TouchableOpacity onPress={() => setGender(gen)}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 20 / 2,
                          backgroundColor: gender === gen ? '#F3AA60' : '#F3EFE0'
                        }}
                      />
                    </TouchableOpacity>
                    <Text className='ml-4 text-[12px]' style={{ color: '#F3EFE0' }}>{gen}</Text>
                  </View>
                ))}
              </View>
              {errorGender !== '' && <Text style={{ color: 'red' }}>{errorGender}</Text>}
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
              <TouchableOpacity onPress={handleSubmit}>
                <View className='bg-retro-green' style={{ padding: 14, width: 140, borderRadius: 30 }}>
                  <Text className='text-retro-white text-center font-bold text-[14px]'>Sign Up</Text>
                </View>
              </TouchableOpacity>
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingRight: 5 }} className='text-retro-white font-bold text-[12px]'>Already have an account?</Text>
                  <TouchableOpacity onPress={handleLoginPress}>
                    <Text className='text-retro-orange underline text-[12px] font-bold hover:scale-105' style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterForm
