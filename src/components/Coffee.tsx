import * as React from 'react'
import { BackHandler, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

import colors from '../theme/colors'
import Text from './Text'

const SOURCE = {
  uri: 'https://www.buymeacoffee.com/widget/page/julienr2?description=Support%20me%20on%20Buy%20me%20a%20coffee!&color=%235F7FFF',
}

type CoffeeProps = object

export type CoffeeHandle = {
  show: () => void
}

const Coffee = React.forwardRef<CoffeeHandle, CoffeeProps>((_, ref) => {
  const [visible, setVisible] = React.useState(false)

  React.useImperativeHandle(ref, () => ({ show: () => setVisible(true) }), [])

  const hide = React.useCallback(() => {
    setVisible(false)
  }, [])

  React.useEffect(() => {
    const listener = BackHandler.addEventListener(
      'hardwareBackPress',
      function () {
        if (!visible) return false

        hide()
        return true
      },
    )
    return listener.remove
  }, [visible, hide])

  return (
    <SafeAreaView
      style={[styles.wrapper, !visible && styles.hidden]}
      pointerEvents={!visible ? 'none' : undefined}>
      <View style={styles.closeWrapper}>
        <Pressable
          style={({ pressed }) => [
            styles.close,
            pressed && styles.closePressed,
          ]}
          onPress={hide}>
          <Text color="secondary" weight="medium">
            Close
          </Text>
        </Pressable>
      </View>
      <View style={styles.modal}>
        <View style={styles.message}>
          <Text type="label" weight="regular" style={styles.text}>
            Hey 👋
          </Text>
          <Text type="label" weight="regular" style={styles.text}>
            I'm Julien, I love creating little apps to make life easier. If you
            happened to like this one, you can buy me a coffee or a beer !
          </Text>
          <Text type="label" weight="regular" style={styles.text}>
            Cheers 🍻
          </Text>
        </View>
      </View>
      <View style={[styles.modal, styles.webviewModal]}>
        <View style={styles.webviewWrapper}>
          <WebView source={SOURCE} />
        </View>
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.blackTransparent,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  modal: {
    backgroundColor: colors.white,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 12,
    alignItems: 'center',
  },
  webviewModal: {
    marginTop: 12,
    flex: 1,
  },
  webviewWrapper: {
    width: '100%',
    flex: 1,
  },
  hidden: {
    opacity: 0,
  },
  message: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 24,
    padding: 4,
  },
  text: {
    marginBottom: 8,
  },
  closeWrapper: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  close: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  closePressed: {
    opacity: 0.8,
  },
})

export default React.memo(Coffee)
