import { AppRegistry } from 'react-native'
import 'react-native-url-polyfill/auto'

import Root from './src'
import Extension from './src/Extension'

AppRegistry.registerComponent('main', () => Root)
AppRegistry.registerComponent('extension', () => Extension)
