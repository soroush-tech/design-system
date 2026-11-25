import { createContext, useContext } from 'react'

/** Set by a `TabList`: the id base its `TabContext` shares with the `TabPanel`s. */
export interface TabListContextValue {
  baseId: string
}

export const TabListContext = createContext<TabListContextValue | null>(null)

/** The `TabList` these tabs render for, if any - which links them to their panels. */
export const useTabList = (): TabListContextValue | null => useContext(TabListContext)
