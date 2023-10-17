import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { router } from 'expo-router'
import { useNavigation } from 'expo-router'

const GenreCard = ({ genreName, songs, backgroundColor }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={{ ...styles.genre, backgroundColor }}
      onPress={() => { navigation.navigate('discover/genre', { genreName, songs }) }}
    >
      <Text style={styles.genreTitle}>{genreName}</Text>
      <Image source={{ uri: songs?.[0]?.cover }} alt={genreName} style={styles.genreImage} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  genre: {
    height: 100,
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative'
  },
  genreImage: {
    resizeMode: 'contain',
    height: 80,
    width: 80,
    borderRadius: 8,
    transform: [{ rotate: '30deg' }],
    position: 'absolute',
    left: 120,
    top: 24
  },
  genreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F3EFE0',
    marginTop: 16,
    marginLeft: 8
  }
})

export default GenreCard
