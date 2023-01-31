import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootStackParamList } from '../types/navigation'
import { useStore, useStoreItem } from './hooks/useStore'
import { useStoreHydrated } from './hooks/useStoreHydrated'
import App from './screens/App'
import Signin from './screens/Signin'
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
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureHandler}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <StatusBar style="light" backgroundColor={colors.secondary} />
            <Stack.Navigator
              initialRouteName={token ? 'App' : 'Signin'}
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}>
              <Stack.Screen name="App" component={App} />
              <Stack.Screen name="Signin" component={Signin} />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  gestureHandler: { flex: 1 },
})
