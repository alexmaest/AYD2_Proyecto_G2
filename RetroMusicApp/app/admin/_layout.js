import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet } from 'react-native'

const AdminLayout = () => {
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
        name='(list)/top-five-songs'
        options={{ href: null }}
      />
      <Tabs.Screen
        name='(list)/top-five-artists'
        options={{ href: null }}
      />
      <Tabs.Screen
        name='(list)/top-five-albums'
        options={{ href: null }}
      />
      <Tabs.Screen
        name='(list)/top-global-songs'
        options={{ href: null }}
      />
    </Tabs>
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

export default AdminLayout

const styles = StyleSheet.create({
  IconView: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
})
