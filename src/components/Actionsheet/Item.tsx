import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

import colors from '../../theme/colors'
import * as Icons from '../Icons'
import Text from '../Text'

export type ItemProps = {
  onPress?: () => void
  closeActionsheet?: () => void
} & (
  | {
      label: string
      leftIcon?: keyof typeof Icons
      rightIcon?: keyof typeof Icons
      component?: never
    }
  | {
      label?: never
      leftIcon?: never
      rightIcon?: never
      component: React.ReactNode
    }
)

const Item = ({
  leftIcon,
  rightIcon,
  label,
  component,
  onPress,
  closeActionsheet,
}: ItemProps) => {
  const RightIcon = rightIcon && Icons[rightIcon]
  const LeftIcon = leftIcon && Icons[leftIcon]

  const onItemPress = () => {
    onPress?.()
    closeActionsheet?.()
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={onItemPress}>
      {component || (
        <>
          {LeftIcon && (
            <LeftIcon
              size={16}
              style={styles.leftIcon}
              color={colors.blackLight}
            />
          )}
          <Text type="label" style={styles.label}>
            {label}
          </Text>
          {RightIcon && (
            <RightIcon
              size={16}
              style={styles.rightIcon}
              color={colors.primary}
            />
          )}
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  itemPressed: {
    backgroundColor: colors.primaryTransparentLight,
  },
  label: {
    flex: 1,
    marginHorizontal: 8,
    color: colors.blackLight,
  },
  leftIcon: {
    marginHorizontal: 8,
  },
  rightIcon: {
    alignSelf: 'flex-end',
    marginHorizontal: 8,
  },
})

export default React.memo(Item)
