import React from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'

import AddBookmark from './components/AddBookmark'
import IconButton from './components/IconButton'
import Spinner from './components/Spinner'
import { useSharedData } from './hooks/useSharedData'
import { useStore, useStoreItem } from './hooks/useStore'
import { useStoreHydrated } from './hooks/useStoreHydrated'
import Signin from './screens/Signin'
import colors from './theme/colors'

export default function Extension() {
  const { isHydrated } = useStoreHydrated({ store: useStore })
  const [token] = useStoreItem('token')
  const sharedData = useSharedData()

  const onClose = React.useCallback(() => {
    BackHandler.exitApp()
  }, [])

  if (!isHydrated) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.loading}>
          <Spinner visible />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.modal, !token && styles.signin]}>
        <IconButton
          icon="Close"
          size={16}
          style={styles.close}
          onPress={onClose}
        />
        {!token ? (
          <Signin />
        ) : (
          <AddBookmark link={sharedData?.values[0].link} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 4,
    width: '80%',
    padding: 24,
  },
  signin: {
    minHeight: '80%',
  },
  loading: {
    borderRadius: 4,
    backgroundColor: colors.white,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
})
