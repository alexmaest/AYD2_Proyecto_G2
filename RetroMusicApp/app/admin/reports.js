import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const adminReports = () => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Reportes:</Text>
      <View style={styles.LinksContainer}>
        <Link href='admin/top-five-songs' style={styles.Link}>1. Top 5 canciones</Link>
        <Link href='admin/home' style={styles.Link}>2. Top 5 artistas</Link>
        <Link href='admin/home' style={styles.Link}>3. Top 5 álbumes</Link>
        <Link href='admin/home' style={styles.Link}>4. Canciones mas escuchadas</Link>
      </View>
    </View>
  )
}

export default adminReports

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
  LinksContainer: {
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    width: '100%',
    gap: 16
  },
  Link: {
    color: '#F3EFE0',
    fontSize: 24,
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F3EFE0'
  }
})
