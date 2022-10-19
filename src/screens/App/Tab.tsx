import React from 'react'
import { SectionList, StyleSheet, View } from 'react-native'

import Text from '../../components/Text'
import { Card } from '../../hooks/useStore'
import colors from '../../theme/colors'
import Bookmark from './Bookmark'
import { useFetchBookmarks, useTeamLists } from './hooks'

type TabProps = {
  teamId: string
}

const Tab = ({ teamId }: TabProps) => {
  const { loading, fetchBookmarks } = useFetchBookmarks()
  const { lists } = useTeamLists({ teamId })

  const data = React.useMemo(
    () =>
      lists.map((list) => ({
        title: list.title,
        data: list.cards.length ? list.cards : [null],
      })),
    [lists],
  )

  const keyExtractor = React.useCallback((card: Card | null) => card?.id, [])

  const renderItem = React.useCallback(
    ({ item }: { item: Card | null }) => <Bookmark item={item} />,
    [],
  )

  const renderSectionHeader = React.useCallback(
    (header: { section: { title: string } }) => (
      <View style={styles.headerWrapper}>
        <Text type="title" color="primary" style={styles.header}>
          {header.section.title}
        </Text>
      </View>
    ),
    [],
  )

  return (
    <SectionList
      sections={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      onRefresh={fetchBookmarks}
      refreshing={loading}
      stickySectionHeadersEnabled
      style={styles.section}
    />
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
  },
  headerWrapper: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: colors.primaryTransparentLight,
    marginBottom: 8,
  },
  header: {
    marginTop: 16,
  },
})

export default React.memo(Tab)
