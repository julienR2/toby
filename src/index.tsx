import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

import { useStoreHydrated } from './hooks/useStoreHydrated'
import { useStore } from './hooks/useStore'
import Signin from './screens/Signin'

SplashScreen.preventAutoHideAsync()

export default function Root() {
  const { isHydrated } = useStoreHydrated({ store: useStore })

  React.useLayoutEffect(() => {
    if (!isHydrated) return

    SplashScreen.hideAsync()
  }, [isHydrated])

  if (!isHydrated) return null

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Signin />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
