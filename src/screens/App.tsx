import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const App = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Welcome !</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    padding: 48,
  },
  label: {
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 24,
  },
})

export default App
