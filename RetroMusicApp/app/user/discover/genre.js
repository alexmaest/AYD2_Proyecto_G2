import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import useMusicStore from '../../store/musicStore'

const genre = () => {
  const route = useRoute()
  const { genreName, songs } = route.params

  const { setSong } = useMusicStore()

  const handlePress = (item) => {
    setSong(item)
  }

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Text}>{genreName}</Text>
        <Link href='/user/discover' style={{ marginLeft: 16 }}>
          <FontAwesome name='arrow-left' size={24} color='#F3EFE0' />
        </Link>
      </View>
      <ScrollView
        contentContainerStyle={styles.AlbumsContainer}
        style={{ marginBottom: 10 }}
      >
        {songs.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.AlbumContainer}
            onPress={() => handlePress(item)}
          >
            <Image
              style={styles.AlbumCover}
              source={{ uri: item.cover }}
            />
            <Text style={styles.AlbumName}>{item.name}</Text>
            <Text style={styles.AlbumType}>{item.artist} • {item.duration}</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  AlbumsContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%'
  },
  AlbumCover: {
    borderRadius: 10,
    width: 144,
    height: 144,
    marginTop: 15,
    resizeMode: 'cover'
  },
  AlbumContainer: {
    backgroundColor: '#383838',
    alignItems: 'center',
    width: '48%',
    height: 220,
    marginBottom: 16,
    borderRadius: 10
  },
  AlbumName: {
    color: '#F3EFE0',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center'
  },
  AlbumType: {
    color: '#a4a4a4',
    fontSize: 12,
    textAlign: 'center'
  }
})

export default genre
