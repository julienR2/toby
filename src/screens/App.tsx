import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useStoreItem } from '../hooks/useStore'
import { get } from '../utils/fetch'

const App = () => {
  const [token] = useStoreItem('token')
  const [lists, setLists] = useStoreItem('lists')
  const [teams, setTeams] = useStoreItem('teams')

  React.useEffect(() => {
    async function fetchState() {
      try {
        const data: { lists: typeof lists; teams: typeof teams } = await get(
          'https://api2.gettoby.com/v2/states',
          { headers: { 'x-auth-token': token } },
        )

        setLists(data.lists)
        setTeams(data.teams)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchState()
  }, [token, setLists, setTeams])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Welcome !</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    padding: 48,
  },
  label: {
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 24,
  },
})

export default App
