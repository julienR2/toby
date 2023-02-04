import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'

import Actionsheet from '../../components/Actionsheet'
import { ItemProps } from '../../components/Actionsheet/Item'
import Button from '../../components/Button'
import IconButton from '../../components/IconButton'
import * as Icons from '../../components/Icons'
import Text from '../../components/Text'
import { Config, SortType, useStoreItem } from '../../hooks/useStore'
import colors from '../../theme/colors'
import { put } from '../../utils/fetch'

export const SORT_MAPPING: {
  [key in SortType]: { icon: keyof typeof Icons; label: string }
} = {
  [SortType.Dnd]: {
    icon: 'RectangleDots',
    label: 'Position',
  },
  [SortType.Alphabetical]: {
    icon: 'AlphabeticalOrder',
    label: 'Alphabetical',
  },
  [SortType.Starred]: {
    icon: 'Star',
    label: 'Starred To Top',
  },
  [SortType.DateCreated]: {
    icon: 'Calendar',
    label: 'Date Created',
  },
}

type ToolbarProps = {
  teamId: string
}

const Toolbar = ({ teamId }: ToolbarProps) => {
  const sortActionSheetRef = React.useRef<BottomSheetModal | null>(null)
  const [token] = useStoreItem('token')
  const [query, setQuery] = useStoreItem('query')
  const [config, setConfig] = useStoreItem('config')
  const org = `org_${teamId}`
  const sort = config?.sorts[org]

  const onClear = React.useCallback(() => {
    setQuery('')
    Keyboard.dismiss()
  }, [setQuery])

  const onSort = React.useCallback(() => {
    sortActionSheetRef.current?.present()
  }, [])

  const sortItems = React.useMemo<ItemProps[]>(
    () =>
      Object.keys(SORT_MAPPING).map((key) => {
        const sortItem = SORT_MAPPING[key as keyof typeof SORT_MAPPING]
        return {
          leftIcon: sortItem.icon,
          label: sortItem.label,
          rightIcon: key === sort?.type ? 'Check' : undefined,
          onPress: async () => {
            const data: Config = await put(
              'https://api2.gettoby.com/v2/config',
              {
                headers: { 'x-auth-token': token || '' },
                params: config
                  ? {
                      ...config,
                      sorts: {
                        ...config.sorts,
                        [org]: {
                          ...config.sorts[org],
                          isDesc: false,
                          type: key,
                        },
                      },
                    }
                  : {},
              },
            )

            setConfig(data)
          },
        }
      }),
    [sort?.type, token, config, org, setConfig],
  )

  const SortIcon =
    Icons[sort?.type ? SORT_MAPPING[sort.type].icon : 'HorizontalLines']

  return (
    <>
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
        <Button style={styles.sortButton} onPress={onSort}>
          <SortIcon
            size={16}
            color={colors.blackLight}
            style={styles.sortIcon}
          />
          <Text type="label">Sort</Text>
        </Button>
        <Actionsheet ref={sortActionSheetRef} items={sortItems} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 4,
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
    marginRight: 8,
  },
  sortButton: {
    flexDirection: 'row',
    backgroundColor: colors.whiteTransparent,
    paddingVertical: 4,
    paddingHorizontal: 0,
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortIcon: {
    marginRight: 4,
  },
  actionSheetItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  actionSheetIcon: {
    marginRight: 8,
  },
})

export default React.memo(Toolbar)
