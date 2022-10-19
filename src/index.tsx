import React from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import { RootStackParamList } from '../types/navigation'

import Signin from './screens/Signin'
import App from './screens/App'
import { useStoreHydrated } from './hooks/useStoreHydrated'
import { useStore, useStoreItem } from './hooks/useStore'
import colors from './theme/colors'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Root() {
  const { isHydrated } = useStoreHydrated({ store: useStore })
  const [token] = useStoreItem('token')

  React.useLayoutEffect(() => {
    if (!isHydrated) return

    SplashScreen.hideAsync()
  }, [isHydrated])

  if (!isHydrated) return null

  return (
    <NavigationContainer>
      <StatusBar style='light' backgroundColor={colors.secondary} />
      <Stack.Navigator
        initialRouteName={token ? 'App' : 'Signin'}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name='App' component={App} />
        <Stack.Screen name='Signin' component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
