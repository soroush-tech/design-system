import { createContext } from 'react'
import type { Theme } from '../theme/themes'

/** What a `NavGroup` and a `NavLink` read from the `NavTree` they sit in. */
export interface NavTreeContextValue {
  /** The palette color of the current page's pill, a hover and the focus ring. */
  color: keyof Theme['palette']
}

export const NavTreeContext = createContext<NavTreeContextValue>({ color: 'primary' })
