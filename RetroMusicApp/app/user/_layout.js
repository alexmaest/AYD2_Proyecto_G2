import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet } from 'react-native'
import MusicPlayer from '../../components/Player'

const UserLayout = () => {
  return (
    <>
      <Tabs
        initialRouteName='home'
        screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: '#1D1D1D' } }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: '',
            tabBarIcon: ({ focused }) => (
              <View style={styles.IconView}>
                <TabBarIcon name='home' size={24} focused={focused} />
              </View>
            )
          }}
        />
        <Tabs.Screen
          name='reports'
          options={{
            title: '',
            tabBarIcon: ({ focused }) => (
              <View style={styles.IconView}>
                <TabBarIcon name='signal' size={24} focused={focused} />
              </View>
            )
          }}
        />
        <Tabs.Screen
          name='(list)/songs-listened'
          options={{ href: null }}
        />
        <Tabs.Screen
          name='(list)/number-songs'
          options={{ href: null }}
        />
        <Tabs.Screen
          name='(list)/listened-time'
          options={{ href: null }}
        />
      </Tabs>
      <MusicPlayer />
    </>
  )
}

function TabBarIcon (props) {
  return (
    <FontAwesome
      size={props.size || 26}
      style={{ color: props.focused ? '#1D5B79' : '#F3EFE0' }}
      {...props}
    />
  )
}

export default UserLayout

const styles = StyleSheet.create({
  IconView: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
})
