import { createContext, type SyntheticEvent } from 'react'
import type { MenuItemValue } from './MenuListContext'

/**
 * Set by a `Menu` around its lists: told when any row anywhere in the menu is chosen, with
 * or without a `value`, so the whole menu can close. Internal - not exported from the
 * subpath.
 */
export const MenuActivationContext = createContext<
  ((value: MenuItemValue | undefined, event: SyntheticEvent) => void) | null
>(null)
