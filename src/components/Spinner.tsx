import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native'
import colors from '../theme/colors'

type SpinnerProps = {
  visible?: boolean
  showOverlay?: boolean
} & ActivityIndicatorProps

const Spinner = ({ visible, showOverlay, ...props }: SpinnerProps) =>
  visible ? (
    <View style={showOverlay && styles.overlay}>
      <ActivityIndicator {...props} />
    </View>
  ) : null

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.whiteTransparent,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Spinner
