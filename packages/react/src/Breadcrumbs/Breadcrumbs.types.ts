import type { ThemeText } from '@soroush.design/core/theme'
import type { ReactNode } from 'react'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `Breadcrumbs` - its `expandLabel` gives a trail its language. */
export interface BreadcrumbsOwnerState {
  separator?: ReactNode
  maxItems?: number
  itemsBeforeCollapse?: number
  itemsAfterCollapse?: number
  expandLabel?: string
  color?: keyof ThemeText
}

/** The slots of Breadcrumbs a theme can style with `styleOverrides`. */
export type BreadcrumbsSlot = 'root' | 'list' | 'item' | 'separator' | 'collapsed' | 'collapsedIcon'

/** What `theme.components.Breadcrumbs` takes. */
export type BreadcrumbsThemeConfig = ComponentConfig<BreadcrumbsOwnerState, BreadcrumbsSlot>
