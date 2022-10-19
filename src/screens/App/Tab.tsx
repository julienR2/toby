import React from 'react'
import { SectionList, Text, View } from 'react-native'
import { Card } from '../../hooks/useStore'
import { useTeamLists } from './hooks'

type TabProps = {
  teamId: string
}

const Tab = ({ teamId }: TabProps) => {
  const { lists } = useTeamLists({ teamId })

  const data = React.useMemo(
    () =>
      lists.map((list) => ({
        title: list.title,
        data: list.cards,
      })),
    [lists],
  )

  const keyExtractor = React.useCallback((card: Card) => card.id, [])

  const renderItem = React.useCallback(
    ({ item }: { item: Card }) => <Text>{item.title}</Text>,
    [],
  )

  const renderSectionHeader = React.useCallback(
    (header: { section: { title: string } }) => (
      <Text>{header.section.title}</Text>
    ),
    [],
  )

  return (
    <SectionList
      sections={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled
    />
  )
}

export default React.memo(Tab)
