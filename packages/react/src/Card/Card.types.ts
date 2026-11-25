import type {
  ThemeFonts,
  ThemeText,
  ThemeSpaceKey,
  ThemeTypography,
} from '@soroush.design/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** Card's resolved props / theme-settable defaults. */
export interface CardOwnerState {
  variant?: 'paper' | 'bracketBox' | 'interactive'
  /** Merged under any per-instance `titleProps` (instance wins). */
  titleProps?: CardSlotTypographyProps
  /** Merged under any per-instance `captionProps` (instance wins). */
  captionProps?: CardSlotTypographyProps
  /** Merged under any per-instance `iconProps` (instance wins). */
  iconProps?: CardSlotIconProps
}

/** Token-typed Typography props a theme may set for Card's title/caption slots. */
interface CardSlotTypographyProps {
  variant?: ThemeTypography
  color?: keyof ThemeText
  fontFamily?: keyof ThemeFonts
  mb?: ThemeSpaceKey
}

/** Token-typed Icon props a theme may set for Card's icon slot. */
interface CardSlotIconProps {
  color?: keyof ThemeText
  size?: string | number
}

/** The slots of Card a theme can style with `styleOverrides`. */
export type CardSlot = 'root' | 'title' | 'caption' | 'icon'

/** What `theme.components.Card` takes. */
export type CardThemeConfig = ComponentConfig<CardOwnerState, CardSlot>
