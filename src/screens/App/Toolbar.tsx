import React from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'

import IconButton from '../../components/IconButton'
import { useStoreItem } from '../../hooks/useStore'
import colors from '../../theme/colors'

type ToolbarProps = {
  teamId: string
}

const Toolbar = ({ teamId }: ToolbarProps) => {
  const [query, setQuery] = useStoreItem('query')

  const onClear = React.useCallback(() => {
    setQuery('')
    Keyboard.dismiss()
  }, [setQuery])

  return (
    <View style={styles.wrapper}>
      <View style={styles.search}>
        <IconButton
          icon="Search"
          size={16}
          color={colors.blackLight}
          style={styles.searchIcon}
        />
        <TextInput
          value={query}
          style={styles.searchInput}
          onChangeText={setQuery}
          placeholder="Search organization"
        />
        {!!query && (
          <IconButton
            icon="Mark"
            size={16}
            color={colors.blackLight}
            style={styles.markIcon}
            onPress={onClear}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  search: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 4,
  },
  markIcon: {
    position: 'absolute',
    right: 4,
  },
  searchInput: {
    padding: 2,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.greyDark,
  },
})

export default React.memo(Toolbar)
