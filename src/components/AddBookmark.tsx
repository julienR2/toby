import * as React from 'react'
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { useFetchBookmarks, useTeamLists } from '../hooks/useBookmarks'
import { Card, useStoreItem } from '../hooks/useStore'
import colors from '../theme/colors'
import { post } from '../utils/fetch'
import { getPreview } from '../utils/link'
import Bookmark from './Bookmark'
import Button from './Button'
import { Check } from './Icons'
import Spinner from './Spinner'
import Text from './Text'

type AddBookmarkProps = {
  link?: string
}

const AddBookmark = ({ link }: AddBookmarkProps) => {
  const scrollViewRef = React.useRef<ScrollView | null>(null)
  const { fetchBookmarks, teams } = useFetchBookmarks()
  const [token] = useStoreItem('token')

  const [data, setData] = React.useState<Partial<Card> | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState(teams?.[0].id)
  const { lists } = useTeamLists({ teamId: selectedTeam })
  const [selectedList, setSelectedList] = React.useState(lists?.[0].id)
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    fetchBookmarks()
  }, [fetchBookmarks])

  React.useEffect(() => {
    if (!link) return

    async function getBookmarkData() {
      setLoading(true)

      const previewData = await getPreview(link)

      if (previewData) {
        setData(previewData)
      }

      setLoading(false)
    }

    getBookmarkData()
  }, [link])

  const onTeamSelected = React.useCallback(
    (teamId: string) => () => {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false })
      setSelectedTeam(teamId)
    },
    [],
  )
  const onCollectionSelected = React.useCallback(
    (listId: string) => () => setSelectedList(listId),
    [],
  )

  const onAddBookmark = React.useCallback(async () => {
    setSubmitting(true)

    try {
      await post('https://api2.gettoby.com/v2/cards', {
        ...(token ? { headers: { 'x-auth-token': token } } : {}),
        params: { ...data, listId: selectedList },
      })
    } catch (error) {}

    BackHandler.exitApp()
  }, [token, data, selectedList])

  return (
    <View>
      <Text type="title" color="primary" weight="medium">
        New Bookmark
      </Text>
      <View style={styles.bookmarkWrapper}>
        {loading ? <Spinner visible /> : <Bookmark item={data} />}
      </View>
      <View style={styles.wrapper}>
        <View style={styles.teams}>
          {teams.map(({ id, name }) => (
            <Pressable
              onPress={onTeamSelected(id)}
              style={({ pressed }) => [
                styles.team,
                pressed && styles.pressed,
                id === selectedTeam && styles.selectedTeam,
              ]}>
              <Text
                color={id === selectedTeam ? 'primary' : 'secondary'}
                weight="regular">
                {name}
              </Text>
            </Pressable>
          ))}
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.collections}
          contentContainerStyle={styles.collectionsContent}>
          {lists.map(({ title, id }) => (
            <Pressable
              onPress={onCollectionSelected(id)}
              style={({ pressed }) => [
                styles.collection,
                pressed && styles.pressed,
                id === selectedList && styles.selectedCollection,
              ]}>
              <Text
                type="caption"
                color={id === selectedList ? 'primary' : 'secondary'}
                weight="regular">
                {title}
              </Text>
              {id === selectedList && (
                <Check size={12} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {submitting ? (
        <Spinner visible style={styles.submitLoading} />
      ) : (
        <Button
          style={styles.button}
          disabled={loading}
          onPress={onAddBookmark}>
          Add Bookmark
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bookmarkWrapper: {
    marginTop: 12,
  },
  button: {
    marginTop: 24,
  },
  wrapper: {
    marginTop: 12,
  },
  teams: {
    flexDirection: 'row',
  },
  team: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: colors.grey,
    marginRight: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  selectedTeam: {
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
  teamLabel: {
    color: colors.secondary,
  },
  selectedTeamLabel: {
    color: colors.primary,
  },
  collections: {
    marginTop: 12,
    height: 120,
  },
  collectionsContent: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  collection: {
    marginBottom: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.grey,
    borderBottomWidth: 0.5,
    borderColor: colors.secondaryTransparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedCollection: {
    borderColor: colors.primary,
  },
  submitLoading: {
    marginTop: 24,
  },
})

export default React.memo(AddBookmark)
