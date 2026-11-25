import { createContext, useContext, type SyntheticEvent } from 'react'
import type { Theme } from '../theme/themes'

/** What a `FabMenuItem` reads from the `FabMenu` it sits in. */
export interface FabMenuContextValue {
  /** Asks the menu to close - an item does, once it is chosen. */
  close: (event: SyntheticEvent | Event) => void
  /** The size of the trigger, which the items take. */
  size: keyof Theme['sizes']
}

export const FabMenuContext = createContext<FabMenuContextValue | null>(null)

/** The menu a part sits in - a part with none is a mistake, so it says so. */
export function useFabMenu(part: string): FabMenuContextValue {
  const menu = useContext(FabMenuContext)
  if (!menu) throw new Error(`A ${part} must be inside a FabMenu.`)
  return menu
}
