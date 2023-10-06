import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { useEffect, useState } from 'react'
import RetroButton from '../../../components/RetroButton'

const chartConfig = {
  backgroundColor: '#222222',
  backgroundGradientFrom: '#1e769c',
  backgroundGradientTo: '#3cafd4',
  color: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
  decimalPlaces: 0,
  style: {
    borderRadius: 8,
    padding: 32
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#222222'
  }
}

const url = 'http://localhost:5000/admin/TopArtists'

const TopFiveArtists = () => {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        setLabels(data.map((artist) => artist.artist))
        setData(data.map((artist) => artist.plays))
      } catch (error) {
        setLabels([])
        setData([])
      }
    }
    fetchArtists()
  }, [])

  const filterArtists = async () => {
    try {
      const res = await fetch('http://localhost:5000/admin/TopArtistsFiltro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limInf: Number(min), limSup: Number(max) })
      })
      const data = await res.json()
      setLabels(data.map((artist) => artist.artist))
      setData(data.map((artist) => artist.plays))
    } catch (error) {
      setLabels([])
      setData([])
    }
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Top Five Artists</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <TextInput style={styles.TextInput} placeholder='Min' onChangeText={text => setMin(text)} />
        <TextInput style={styles.TextInput} placeholder='Max' onChangeText={text => setMax(text)} />
        <RetroButton type='primary' text='Filter' handlePress={async () => { await filterArtists() }} />
      </View>
      <BarChart
        style={styles.Chart}
        data={{
          labels,
          datasets: [
            {
              data
            }
          ]
        }}
        width={Dimensions.get('window').width - 32}
        height={Dimensions.get('window').height - 288}
        chartConfig={chartConfig}
        verticalLabelRotation={90}
        showValuesOnTopOfBars
        fromZero
        yAxisSuffix=' plays'
      />
    </View>
  )
}

export default TopFiveArtists

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    padding: 24
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  Chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  TextInput: {
    backgroundColor: '#F3EFE0',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    width: '30%'
  }
})
