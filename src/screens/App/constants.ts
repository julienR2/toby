import * as Icons from '../../components/Icons'
import { SortType } from '../../hooks/useStore'

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
