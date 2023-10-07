import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import RetroButton from '../../../components/RetroButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiUrls, baseUrl } from '../../../constants/urls'

const TopGlobalSongs = () => {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [dates, setDates] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchDates = async () => {
      const sessionString = await AsyncStorage.getItem('session')
      const session = await JSON.parse(sessionString)

      const url = baseUrl + apiUrls.user.listenedSongs + `/${session?.id}`
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const fetchData = await res.json()
        setData(fetchData)
        setDates((fetchData || []).map((song) => song.date))
        setStartDate((fetchData || [])[0]?.date)
        setEndDate((fetchData || [])[fetchData?.length - 1]?.date)
      } catch (error) {
        setStartDate('')
        setEndDate('')
        setDates([])
      }
    }
    fetchDates()
  }, [])

  const handleFilter = () => {
    try {
      const arrayItems = []
      data?.forEach((item) => {
        if (item.date >= startDate && item.date <= endDate) {
          arrayItems.push({ date: item?.date, quantity: item?.quantity })
        }
      })
      setLabels(arrayItems)
    } catch (error) {
      console.error(error)
      setLabels([])
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.Text}>Numero canciones escuchadas</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%', gap: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: 16
          }}
        >
          <Picker
            style={{
              backgroundColor: '#F3EFE0',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              color: '#222222',
              width: '45%'
            }}
            selectedValue={startDate}
            onValueChange={(itemValue) => setStartDate(itemValue)}
          >
            {dates.map((date, index) => (
              <Picker.Item key={index} label={date} value={date} />
            ))}
          </Picker>
          <Picker
            style={{
              backgroundColor: '#F3EFE0',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              color: '#222222',
              width: '45%'
            }}
            selectedValue={endDate}
            onValueChange={(itemValue) => setEndDate(itemValue)}
          >
            {dates.map((date, index) => (
              <Picker.Item key={index} label={date} value={date} />
            ))}
          </Picker>
        </View>
        <RetroButton type='white' text='Show' handlePress={handleFilter} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.Table}>
        <View style={styles.TableRow}>
          <Text style={styles.TableHeader}>Día</Text>
          <Text style={styles.TableHeader}>Cantidad</Text>
        </View>
        {labels.map((label, index) => (
          <View key={index} style={styles.TableRow}>
            <Text style={styles.TableCell}>{label?.date}</Text>
            <Text style={styles.TableCell}>{label?.quantity}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TopGlobalSongs

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    padding: 24,
    paddingTop: 64
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  Table: {
    width: Dimensions.get('window').width - 48,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  TableRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F3EFE0',
    padding: 8
  },
  TableHeader: {
    color: '#F3EFE0',
    fontSize: 24,
    fontWeight: 'bold'
  },
  TableCell: {
    color: '#F3EFE0',
    fontSize: 16
  }
})
