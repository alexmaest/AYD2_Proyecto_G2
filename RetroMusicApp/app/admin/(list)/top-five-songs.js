import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { useEffect, useState } from 'react'
import RetroButton from '../../../components/RetroButton'
import Dropdown from '../../../components/Dropdown'
import { apiUrls, baseUrl } from '../../../constants/urls'

const chartConfig = {
  backgroundColor: '#222222',
  backgroundGradientFrom: '#de6718',
  backgroundGradientTo: '#f3aa60',
  color: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
  decimalPlaces: 0,
  style: {
    borderRadius: 8
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#222222'
  }
}

const TopFiveSongs = () => {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [genres, setGenres] = useState(['All'])
  const [selectedGenre, setSelectedGenre] = useState('All')

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(baseUrl + apiUrls.admin.topSongs, {
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

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(baseUrl + apiUrls.admin.allSongsGenres, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        setGenres(['All', ...data])
      } catch (error) {
        setGenres(['All'])
      }
    }
    fetchGenres()
  }, [])

  const filterSongs = async () => {
    try {
      const res = await fetch(baseUrl + apiUrls.admin.topSongsFiltro, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ genre: selectedGenre })
      })
      const data = await res.json()
      setLabels(data.map((song) => song.name))
      setData(data.map((song) => song.plays))
    } catch (error) {
      setLabels([])
      setData([])
    }
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Top Five Songs</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        zIndex: 50
      }}
      >
        <Dropdown values={genres} selectedValue={selectedGenre} setSelectedValue={setSelectedGenre} />
        <RetroButton type='primary' text='Filtrar' handlePress={async () => { await filterSongs() }} />
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

export default TopFiveSongs

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    padding: 16
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  Chart: {
    borderRadius: 16,
    zIndex: 0
  }
})
