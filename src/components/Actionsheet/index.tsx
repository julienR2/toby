import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetProps,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Item, { ItemProps } from './Item'

const STATIC_SNAP_POINTS = ['CONTENT_HEIGHT']

type ActionSheetProps = Omit<BottomSheetProps, 'snapPoints' | 'children'> & {
  skipInsets?: boolean
  children?: React.ReactNode
  snapPoints?: (string | number)[]
  items?: ItemProps[]
}

const ActionSheet = React.forwardRef<BottomSheetModal | null, ActionSheetProps>(
  (
    {
      children,
      skipInsets,
      snapPoints = STATIC_SNAP_POINTS,
      items,
      ...props
    }: ActionSheetProps,
    ref,
  ) => {
    const bottomSheetModalRef = React.useRef<BottomSheetModal | null>(null)

    React.useImperativeHandle(
      ref,
      () => bottomSheetModalRef.current as BottomSheetModal,
    )

    const insets = useSafeAreaInsets()

    const style = React.useMemo(
      () =>
        !skipInsets
          ? {
              paddingBottom: insets.bottom,
            }
          : undefined,
      [skipInsets, insets.bottom],
    )

    const closeActionsheet = React.useCallback(
      () => bottomSheetModalRef.current?.close(),
      [],
    )

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(snapPoints)

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    )

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        {...props}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}>
        <View onLayout={handleContentLayout} style={style}>
          {items
            ? items.map((item) => (
                <Item
                  key={item.label}
                  {...item}
                  closeActionsheet={closeActionsheet}
                />
              ))
            : children}
        </View>
      </BottomSheetModal>
    )
  },
)

export default React.memo(ActionSheet)
