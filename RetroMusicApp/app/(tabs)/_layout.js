import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { View } from 'react-native'

const _layout = () => {
  return (
    <Tabs
      initialRouteName='home'
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: '#1D1D1D' } }}
    >
      <Tabs.Screen
        name='home'
        options={{
          href: '/home',
          title: '',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
            >
              <TabBarIcon name='home' color={color} size={24} focused={focused} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='login'
        options={{
          href: '/login',
          title: '',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
            >
              <TabBarIcon name='user' color={color} size={24} focused={focused} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='userRegister'
        options={{
          href: '/userRegister',
          title: '',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
            >
              <TabBarIcon name='user-circle-o' color={color} size={24} focused={focused} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name='artistRegister'
        options={{
          href: '/artistRegister',
          title: '',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
            >
              <TabBarIcon name='user-circle' color={color} size={24} focused={focused} />
            </View>
          )
        }}
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

export default _layout
