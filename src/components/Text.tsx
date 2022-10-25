import * as React from 'react'
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native'

import colorsList from '../theme/colors'
import { fontFamilies } from '../theme/fonts'

const types = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: fontFamilies.bold,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamilies.medium,
  },
  body: {
    fontSize: 14,
    fontFamily: fontFamilies.regular,
  },
  caption: {
    fontSize: 12,
    fontFamily: fontFamilies.light,
  },
})

type Weights = Record<keyof typeof fontFamilies, object>

const weights = StyleSheet.create(
  Object.keys(fontFamilies).reduce<Weights>(
    (acc, key) => ({
      ...acc,
      [key]: { fontFamily: fontFamilies[key as keyof typeof fontFamilies] },
    }),
    {} as Weights,
  ),
)

type Colors = Record<keyof typeof colorsList, object>

const colors = StyleSheet.create(
  Object.keys(colorsList).reduce<Colors>(
    (acc, key) => ({
      ...acc,
      [key]: { color: colorsList[key as keyof typeof colorsList] },
    }),
    {} as Colors,
  ),
)

type TextProps = {
  weight?: keyof typeof weights
  type?: keyof typeof types
  color?: keyof typeof colors
} & RNTextProps

const Text = ({
  type = 'body',
  weight,
  color = 'black',
  style,
  ...props
}: TextProps) => (
  <RNText
    style={[
      types[type],
      weights[weight as keyof typeof weights],
      colors[color],
      style,
    ]}
    {...props}
  />
)

export default React.memo(Text)
