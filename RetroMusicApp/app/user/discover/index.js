import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import GenreCard from '../../../components/GenreCard'
import { baseUrl, apiUrls } from '../../../constants/urls'

const colors = [
  '#713ABE',
  '#D32BA2',
  '#FF4C7C',
  '#FF865C',
  '#219C90',
  '#FFC151',
  '#FF79E1',
  '#00AF95',
  '#D83F31',
  '#0094DC'
]

const discover = () => {
  const [genresNames, setGenresNames] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(baseUrl + apiUrls.user.recomendations, {
          method: 'GET',
          headers: {
            'Content-Type': 'application.json'
          }
        })
        const data = await response.json()
        setGenresNames(Object.keys(data))
        setGenres(data)
      } catch (error) {
        console.log(error)
      }
    }
    getGenres()
  }, [])

  return (
    <View style={styles.Container}>
      <Text style={styles.Header}>Discover</Text>
      <ScrollView
        contentContainerStyle={styles.GenresContainer}
        style={{ marginBottom: 16 }}
      >
        {genresNames.map((genre, index) => (
          <GenreCard
            key={index}
            genreName={genre}
            songs={genres[genre]}
            backgroundColor={colors[index % colors.length]}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    gap: 32,
    paddingTop: 64,
    alignItems: 'flex-start'
  },
  Header: {
    color: '#F3EFE0',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 16
  },
  GenresContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  }
})

export default discover
