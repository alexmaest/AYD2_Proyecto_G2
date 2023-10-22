import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import RetroButton from '../../../components/RetroButton'
import { apiUrls, baseUrl } from '../../../constants/urls'

const TopGlobalSongs = () => {
  const [data, setData] = useState([])
  const [dates, setDates] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await fetch(baseUrl + apiUrls.admin.allSongsDates, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        setStartDate(data[0])
        setEndDate(data[data.length - 1])
        setDates(data)
      } catch (error) {
        setStartDate('')
        setEndDate('')
        setDates([])
      }
    }
    fetchDates()
  }, [])

  const handleFilter = async () => {
    try {
      const res = await fetch(baseUrl + apiUrls.admin.topGlobalSongs, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dateInit: startDate, dateFinal: endDate })
      })
      const data = await res.json()
      setData(data)
    } catch (error) {
      setData([])
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.Text}>Listado canciones escuchadas a nivel global</Text>
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
        <RetroButton type='white' text='Mostrar' handlePress={handleFilter} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.Table}>
        <View style={styles.TableRow}>
          <Text style={styles.TableHeader}>Canción</Text>
          <Text style={styles.TableHeader}>Artista</Text>
          <Text style={styles.TableHeader}>Fecha</Text>
        </View>
        {data.map((song, index) => (
          <View key={index} style={styles.TableRow}>
            <Text style={styles.TableCell}>{song.cancion}</Text>
            <Text style={styles.TableCell}>{song.artista}</Text>
            <Text style={styles.TableCell}>{new Date(song.fecha).toLocaleDateString()}</Text>
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
