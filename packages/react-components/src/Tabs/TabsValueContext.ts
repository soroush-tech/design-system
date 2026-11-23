import { createContext, useContext } from 'react'
import type { TabValue } from './TabsContext'

export interface TabsValueContextValue {
  value: TabValue | null
  select: (value: TabValue) => void
  /** Ties a `Tabs`' tabs to the `TabPanel`s beside it. */
  baseId: string
}

/** Set by a `TabContext`. */
export const TabsValueContext = createContext<TabsValueContextValue | null>(null)

/** The surrounding `TabContext`'s value, if there is one. */
export const useTabsValue = (): TabsValueContextValue | null => useContext(TabsValueContext)
