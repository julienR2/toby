import * as React from 'react'
import { NativeModules } from 'react-native'

const { data } = NativeModules.ShareViewController

type Data = {
  type: 'url'
  values: {
    title?: string
    link?: string
  }[]
}

export const useSharedData = () => {
  const [sharedData, setSharedData] = React.useState<Data | null>(null)

  React.useEffect(() => {
    data().then(setSharedData).catch(setSharedData)
  }, [])

  return sharedData
}
