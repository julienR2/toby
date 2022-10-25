import { flatten, partition } from 'lodash'
import React from 'react'

import { get } from '../utils/fetch'
import { useStoreItem } from './useStore'

export const useFetchBookmarks = () => {
  const [loading, setLoading] = React.useState(false)

  const [token] = useStoreItem('token')
  const [lists, setLists] = useStoreItem('lists')
  const [teams, setTeams] = useStoreItem('teams')

  const fetchBookmarks = React.useCallback(async () => {
    setLoading(true)

    try {
      const data: { lists: typeof lists; teams: typeof teams } = await get(
        'https://api2.gettoby.com/v2/states',
        token ? { headers: { 'x-auth-token': token } } : {},
      )

      setLists(data.lists)
      setTeams(data.teams)
    } catch (error) {}

    setLoading(false)
  }, [token, setLists, setTeams])

  const orderedTeams = React.useMemo(
    () => flatten(partition(teams, { isDefault: true })),
    [teams],
  )

  return { fetchBookmarks, loading, lists, teams: orderedTeams }
}

type TeamListsParams = {
  teamId: string
}

export const useTeamLists = ({ teamId }: TeamListsParams) => {
  const [lists] = useStoreItem('lists')

  const teamLists = React.useMemo(
    () => lists?.filter((list) => list.teamId === teamId) || [],
    [lists, teamId],
  )

  return { lists: teamLists }
}
