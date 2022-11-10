import React from 'react'
import { Mutate, StoreApi, UseBoundStore } from 'zustand'

type StoreHydratedParams = {
  store: UseBoundStore<
    Mutate<StoreApi<any>, [['zustand/persist', Partial<any>]]>
  >
}

export const useStoreHydrated = ({ store }: StoreHydratedParams) => {
  const [isHydrated, setIsHydrated] = React.useState(
    store.persist.hasHydrated(),
  )

  React.useEffect(() => {
    const unsubFinishHydration = store.persist.onFinishHydration(() =>
      setIsHydrated(true),
    )

    setIsHydrated(store.persist.hasHydrated())

    return () => {
      unsubFinishHydration()
    }
  }, [store.persist])

  return { isHydrated }
}
