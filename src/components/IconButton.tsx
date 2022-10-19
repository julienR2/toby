import * as React from 'react'
import { Pressable, PressableProps, StyleSheet, ViewProps } from 'react-native'

import colors from '../theme/colors'
import * as Icons from './Icons'

type ButtonProps = {
  icon: keyof typeof Icons
  style?: ViewProps['style']
  onPress?: PressableProps['onPress']
} & React.ComponentProps<typeof Icons['Logo']>

const IconButton = ({ style, icon, onPress, ...props }: ButtonProps) => {
  const Icon = Icons[icon]

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}>
      <Icon {...props} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
})

export default React.memo(IconButton)
