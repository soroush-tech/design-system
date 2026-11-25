import type { ThemePalette, ThemeSizes } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `TransferList` - its button labels give it a language. */
export interface TransferListOwnerState {
  size?: keyof ThemeSizes
  color?: keyof ThemePalette
  shouldShowMoveAll?: boolean
  hasSelectAll?: boolean
  moveAllRightLabel?: string
  moveRightLabel?: string
  moveLeftLabel?: string
  moveAllLeftLabel?: string
}

/** The slots of TransferList a theme can style with `styleOverrides`. */
export type TransferListSlot =
  | 'root'
  | 'list'
  | 'header'
  | 'title'
  | 'count'
  | 'items'
  | 'item'
  | 'controls'
  | 'icon'

/** What `theme.components.TransferList` takes. */
export type TransferListThemeConfig = ComponentConfig<TransferListOwnerState, TransferListSlot>
