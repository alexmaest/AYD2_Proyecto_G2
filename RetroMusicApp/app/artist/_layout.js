import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet } from 'react-native'

const ArtistLayout = () => {
  return (
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
        name='upload'
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconView}>
              <TabBarIcon name='arrow-up' size={24} focused={focused} />
            </View>
          )
        }}
      />
    </Tabs>
  )
}

export default ArtistLayout

function TabBarIcon (props) {
  return (
    <FontAwesome
      size={props.size || 26}
      style={{ color: props.focused ? '#1D5B79' : '#F3EFE0' }}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  IconView: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
})