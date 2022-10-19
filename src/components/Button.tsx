import * as React from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewProps,
} from 'react-native'

import colors from '../theme/colors'

type ButtonProps = {
  style: ViewProps['style']
} & Omit<PressableProps, 'style'>

const Button = ({ style, children, ...props }: ButtonProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.pressable,
      style,
      pressed && { opacity: 0.8 },
    ]}
    {...props}>
    {typeof children === 'string' ? (
      <Text style={styles.text}>{children}</Text>
    ) : (
      children
    )}
  </Pressable>
)

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
  },
})

export default React.memo(Button)
