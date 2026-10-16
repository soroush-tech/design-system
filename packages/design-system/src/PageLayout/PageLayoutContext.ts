import { createContext } from 'react'
import type { LayoutPanels } from '../theme'

/**
 * The `PageLayout` region a component renders in, so components that fill a region
 * (`Sidebar` in a panel, `AppBar` in a bar) can size from it. `null` outside one.
 */
export type PageLayoutRegion =
  | { region: 'panel'; side: keyof LayoutPanels }
  | { region: 'bar'; placement: 'top' | 'bottom' }

export const PageLayoutContext = createContext<PageLayoutRegion | null>(null)
