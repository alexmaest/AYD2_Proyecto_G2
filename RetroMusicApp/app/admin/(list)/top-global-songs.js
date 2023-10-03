import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react'
// import RetroButton from '../../../components/RetroButton'

const url = 'http://localhost:5000/admin/TopSongs'

const TopGlobalSongs = () => {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  // const [startDate, setStartDate] = useState(new Date())
  // const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        setLabels(data.map((song) => song.name))
        setData(data.map((song) => song.plays))
      } catch (error) {
        setLabels([])
        setData([])
      }
    }
    fetchSongs()
  }, [])

  // const filterSongs = async () => {
  //   try {
  //     const res = await fetch('http://localhost:5000/admin/TopSongsFiltro', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
  //     })
  //     const data = await res.json()
  //     setLabels(data.map((song) => song.name))
  //     setData(data.map((song) => song.plays))
  //   } catch (error) {
  //     setLabels([])
  //     setData([])
  //   }
  // }

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.Text}>Top Global Songs</Text>
      {/* <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <RetroButton type='white' text='Filter' handlePress={async () => { await filterSongs() }} />
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.Table}>
        <View style={styles.TableRow}>
          <Text style={styles.TableHeader}>#</Text>
          <Text style={styles.TableHeader}>Song</Text>
          <Text style={styles.TableHeader}>Plays</Text>
        </View>
        {labels.map((label, index) => (
          <View key={index} style={styles.TableRow}>
            <Text style={styles.TableCell}>{index + 1}</Text>
            <Text style={styles.TableCell}>{label}</Text>
            <Text style={styles.TableCell}>{data[index]}</Text>
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
