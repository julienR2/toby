import { partition, flatten } from 'lodash'
import React from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view'

import colors from '../../theme/colors'
import Tab from './Tab'
import { useFetchBookmarks } from './hooks'

const App = () => {
  const { teams } = useFetchBookmarks()
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)

  const routes = React.useMemo(
    () =>
      flatten(partition(teams, { isDefault: true })).map((team) => ({
        key: team.id,
        title: team.name,
      })),
    [teams],
  )

  const renderScene = React.useCallback(
    ({ route }) => <Tab teamId={route.key} />,
    [],
  )

  const navigationState = React.useMemo(
    () => ({ routes, index }),
    [routes, index],
  )

  const renderTabBar = React.useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<any>
      },
    ) => (
      <View style={styles.tabBarWrapper}>
        <View style={{ flex: 1 }}>
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            activeColor={colors.black}
            inactiveColor={colors.secondaryTransparent}
            labelStyle={styles.label}
          />
        </View>
        <Text>Yo</Text>
      </View>
    ),
    [],
  )

  return (
    <SafeAreaView style={styles.wrapper}>
      <TabView
        navigationState={navigationState}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 16,
  },
  tabBarWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    elevation: 4,
    zIndex: 9,
  },
  tabBar: {
    backgroundColor: colors.white,
    elevation: 0,
  },
  indicator: {
    backgroundColor: colors.primary,
    height: 4,
  },
})

export default App
