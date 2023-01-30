import React from 'react'
import { Alert, StyleSheet, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view'

import { RootStackScreenProps } from '../../../types/navigation'
import Coffee, { CoffeeHandle } from '../../components/Coffee'
import IconButton from '../../components/IconButton'
import Spinner from '../../components/Spinner'
import { useFetchBookmarks } from '../../hooks/useBookmarks'
import { useStoreItem } from '../../hooks/useStore'
import colors from '../../theme/colors'
import Tab from './Tab'
import Toolbar from './Toolbar'

const App = ({ navigation }: RootStackScreenProps<'App'>) => {
  const coffeeRef = React.useRef<CoffeeHandle | null>(null)
  const { loading, teams, fetchBookmarks } = useFetchBookmarks()
  const layout = useWindowDimensions()
  const [showDonation, setShowDonation] = useStoreItem('showDonation')

  React.useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  React.useLayoutEffect(() => {
    if (!showDonation) return

    const timeoutId = setTimeout(() => {
      setShowDonation(false)
      coffeeRef.current?.show()
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [showDonation, setShowDonation])

  const [index, setIndex] = React.useState(0)

  const routes = React.useMemo(
    () =>
      teams.map((team) => ({
        key: team.id,
        title: team.name,
      })),
    [teams],
  )

  const renderScene = React.useCallback(
    ({ route }: { route: typeof routes[0] }) => <Tab teamId={route.key} />,
    [],
  )

  const navigationState = React.useMemo(
    () => ({ routes, index }),
    [routes, index],
  )

  const currentTeamId = navigationState.routes[navigationState.index].key

  const onLogout = React.useCallback(() => {
    Alert.alert(
      'Do you really want to log out ?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          style: 'destructive',
          text: 'Logout',
          onPress: () =>
            navigation.reset({ index: 0, routes: [{ name: 'Signin' }] }),
        },
      ],
      { cancelable: true },
    )
  }, [navigation])

  const onCoffee = React.useCallback(() => {
    coffeeRef.current?.show()
  }, [])

  const renderTabBar = React.useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<any>
      },
    ) => (
      <View style={styles.toolbarWrapper}>
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
          <View style={styles.actionWrapper}>
            <IconButton
              icon="Coffee"
              size={18}
              onPress={onCoffee}
              style={styles.coffee}
            />
            <IconButton
              icon="Logout"
              size={16}
              color={colors.blackLight}
              onPress={onLogout}
            />
          </View>
        </View>
        <Toolbar
          teamId={props.navigationState.routes[props.navigationState.index].key}
        />
      </View>
    ),
    [onLogout, onCoffee],
  )

  if (!teams.length && loading) {
    return (
      <View style={styles.loading}>
        <Spinner visible />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <TabView
        navigationState={navigationState}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <Coffee ref={coffeeRef} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 16,
  },
  toolbarWrapper: {
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  tabBarWrapper: {
    backgroundColor: colors.white,
    flexDirection: 'row',
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
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  coffee: {
    marginRight: 12,
    borderRadius: 100,
    backgroundColor: '#FFDD00',
  },
})

export default App
