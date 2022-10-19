import React from 'react'
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
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
    return <Text style={styles.empty}>This Collection is empty.</Text>
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onBookmarkPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        <View style={styles.header}>
          {item.favIconUrl && !faviconError && (
            <Image
              resizeMode='contain'
              source={{ uri: item.favIconUrl }}
              style={styles.favicon}
              onError={onFaviconError}
            />
          )}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
        {description && (
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description} numberOfLines={1}>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  descriptionWrapper: {
    borderTopWidth: 1,
    borderColor: colors.secondaryTransparentLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  description: {
    color: colors.secondaryTransparent,
  },
  empty: {
    marginHorizontal: 4,
    marginVertical: 8,
    color: colors.secondaryTransparent,
  },
})

export default React.memo(Bookmark)
