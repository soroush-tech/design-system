import type { ComponentConfig } from '../../theme/themes'
import type { MenuOwnerState } from '../Menu/Menu.types'

/** The defaults a theme may set for every `ContextMenu` - a `Menu`'s, placed at the pointer. */
export type ContextMenuOwnerState = Omit<MenuOwnerState, 'align'>

/** The slots of ContextMenu a theme can style with `styleOverrides`. */
export type ContextMenuSlot = 'root' | 'paper'

/** What `theme.components.ContextMenu` takes. */
export type ContextMenuThemeConfig = ComponentConfig<ContextMenuOwnerState, ContextMenuSlot>
