import type { ThemeColor } from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/**
 * Pressable's resolved props / theme-settable defaults. Only the three keys it
 * actually resolves through `useDefaultProps` - the disabled state reaches the
 * styled root as `isDisabled` and is never read from here, so exposing it would
 * promise theme authors an override that does nothing.
 */
export interface PressableOwnerState {
  feedback?: 'none' | 'opacity' | 'highlight'
  color?: ThemeColor
  /** Opacity held content fades to under `feedback: 'opacity'`. */
  activeOpacity?: number
}

/** The slots of Pressable a theme can style with `styleOverrides`. */
export type PressableSlot = 'root'

/** What `theme.components.Pressable` takes. */
export type PressableThemeConfig = ComponentConfig<PressableOwnerState, PressableSlot>
