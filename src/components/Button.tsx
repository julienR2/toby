import * as React from 'react'
import { Pressable, PressableProps, StyleSheet, ViewProps } from 'react-native'

import colors from '../theme/colors'
import Text from './Text'

type ButtonProps = {
  style: ViewProps['style']
} & Omit<PressableProps, 'style'>

const Button = ({ style, children, disabled, ...props }: ButtonProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.pressable,
      style,
      (pressed || disabled) && { opacity: 0.8 },
    ]}
    disabled={disabled}
    {...props}>
    {typeof children === 'string' ? (
      <Text type="label" color="white">
        {children}
      </Text>
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
