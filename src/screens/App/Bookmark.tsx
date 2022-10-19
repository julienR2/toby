import React from 'react'
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native'

import Text from '../../components/Text'
import { Card } from '../../hooks/useStore'
import colors from '../../theme/colors'

type BookmarkProps = {
  item: Card | null
}

const Bookmark = ({ item }: BookmarkProps) => {
  const title = item?.customTitle || item?.title
  const description = item?.customDescription || item?.description

  const [faviconError, setFaviconError] = React.useState(false)

  const onFaviconError = React.useCallback(() => setFaviconError(true), [])

  const onBookmarkPress = React.useCallback(async () => {
    if (!item?.url) return

    try {
      await Linking.openURL(item?.url)
    } catch (error) {}
  }, [item?.url])

  if (!item) {
    return (
      <Text style={styles.empty} color="secondaryTransparent">
        This Collection is empty.
      </Text>
    )
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onBookmarkPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        <View style={styles.header}>
          {item.favIconUrl && !faviconError && (
            <Image
              resizeMode="contain"
              source={{ uri: item.favIconUrl }}
              style={styles.favicon}
              onError={onFaviconError}
            />
          )}
          <Text type="label" color="secondary" numberOfLines={2}>
            {title}
          </Text>
        </View>
        {description && (
          <View style={styles.descriptionWrapper}>
            <Text color="secondaryTransparent" numberOfLines={1}>
              {description}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.white,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  favicon: {
    marginTop: 2,
    height: 20,
    width: 20,
    marginRight: 8,
  },
  descriptionWrapper: {
    borderTopWidth: 1,
    borderColor: colors.secondaryTransparentLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  empty: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
})

export default React.memo(Bookmark)
