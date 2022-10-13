import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native'

import colors from '../theme/colors'

const MAX_PAN_Y = 24

type InputProps = {
  style?: ViewStyle
  label?: string
} & TextInputProps

const Input = ({
  style,
  label,
  secureTextEntry,
  textContentType,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const length = (props.value || props.defaultValue)?.length

  const panY = React.useRef(new Animated.Value(length ? 0 : MAX_PAN_Y))

  const onShowPasswordPress = React.useCallback(
    () => setShowPassword((prev) => !prev),
    [],
  )

  const onInputFocus = React.useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(event)

      Animated.timing(panY.current, {
        duration: 50,
        useNativeDriver: true,
        toValue: 0,
      }).start()
    },
    [],
  )

  const onInputBlur = React.useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (length) return

      onBlur?.(event)

      Animated.timing(panY.current, {
        duration: 50,
        useNativeDriver: true,
        toValue: MAX_PAN_Y,
      }).start()
    },
    [length],
  )

  return (
    <View style={[styles.wrapper, style]}>
      <Animated.View
        style={[
          styles.labelWrapper,
          {
            transform: [{ translateY: panY.current }],
          },
        ]}
      >
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
      <View style={styles.inputWrapper}>
        <TextInput
          underlineColorAndroid='transparent'
          style={styles.input}
          multiline={false}
          secureTextEntry={secureTextEntry && !showPassword}
          textContentType={secureTextEntry ? 'none' : textContentType}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          {...props}
        />
        {secureTextEntry && length > 0 && (
          <Text style={styles.showPassword} onPress={onShowPasswordPress}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 12,
  },
  labelWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  label: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.primaryTransparentLight,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 4,
  },
  showPassword: {
    fontSize: 12,
    color: colors.secondary,
  },
  suffixes: {
    marginRight: 8,
  },
})

export default Input
