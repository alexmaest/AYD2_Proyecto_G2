import { StyleSheet, Text, View } from 'react-native'

const Artist = () => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Welcome artist!</Text>
    </View>
  )
}

export default Artist

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    color: '#F3EFE0',
    fontSize: 48,
    textAlign: 'center'
  }
})
