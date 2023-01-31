import { flatten, partition } from 'lodash'
import React from 'react'

import { get } from '../utils/fetch'
import { SortType, State, useStoreItem } from './useStore'

export const useFetchBookmarks = () => {
  const [loading, setLoading] = React.useState(false)

  const [token] = useStoreItem('token')
  const [lists, setLists] = useStoreItem('lists')
  const [teams, setTeams] = useStoreItem('teams')
  const [config, setConfig] = useStoreItem('config')

  const fetchBookmarks = React.useCallback(async () => {
    setLoading(true)

    try {
      const data: {
        lists: typeof lists
        teams: typeof teams
        config: typeof config
      } = await get(
        'https://api2.gettoby.com/v2/states',
        token ? { headers: { 'x-auth-token': token } } : {},
      )

      setLists(data.lists)
      setTeams(data.teams)
      setConfig(data.config)
    } catch (error) {}

    setLoading(false)
  }, [token, setLists, setTeams, setConfig])

  const orderedTeams = React.useMemo(
    () => flatten(partition(teams, { isDefault: true })),
    [teams],
  )

  return { fetchBookmarks, loading, lists, teams: orderedTeams }
}

type TeamListsParams = {
  teamId: string
}

const sortAttrMapping: { [key in SortType]: keyof State['lists'][0] } = {
  [SortType.Alphabetical]: 'title',
  [SortType.DateCreated]: 'createdAt',
  [SortType.Dnd]: 'position',
  [SortType.Starred]: 'star',
}

export const useTeamLists = ({ teamId }: TeamListsParams) => {
  const [lists] = useStoreItem('lists')
  const [config] = useStoreItem('config')

  const teamLists = React.useMemo(() => {
    const sortType = config?.sorts[`org_${teamId}`].type || SortType.Dnd
    const sortAttr = sortAttrMapping[sortType]

    return (
      lists
        ?.filter((list) => list.teamId === teamId)
        .sort((itemA, itemB) => {
          const sortAttrA = itemA[sortAttr] || false
          const sortAttrB = itemB[sortAttr] || false

          if (sortAttrA < sortAttrB) {
            return sortType === SortType.Starred ? 1 : -1
          }
          if (sortAttrA > sortAttrB) {
            return sortType === SortType.Starred ? -1 : 1
          }

          return 0
        }) || []
    )
  }, [lists, teamId, config?.sorts])

  return { lists: teamLists }
}
