import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import React, { useEffect, useState } from 'react'

const chartConfig = {
  backgroundColor: '#222222',
  backgroundGradientFrom: '#20816a',
  backgroundGradientTo: '#45bc9c',
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

const url = 'http://localhost:5000/admin/TopAlbums'

const TopFiveAlbums = () => {
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        setLabels(data.map((album) => album.name))
        setData(data.map((album) => album.plays))
      } catch (error) {
        setLabels([])
        setData([])
      }
    }
    fetchAlbums()
  }, [])

  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Top Five Albums</Text>
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

export default TopFiveAlbums

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
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
  }
})