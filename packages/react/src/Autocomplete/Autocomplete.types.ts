import type {
  InputVariantKey,
  ThemeBackground,
  ThemeRadii,
  ThemeText,
  ThemeZOrder,
  ThemeColor,
  ThemeSize,
} from '@gild-ui/core/theme'
import type { ComponentConfig } from '../theme/themes'

/** The defaults a theme may set for every `Autocomplete` - its labels give it a language. */
export interface AutocompleteOwnerState {
  borderRadius?: keyof ThemeRadii
  bg?: keyof ThemeBackground
  textColor?: keyof ThemeText
  variant?: InputVariantKey
  size?: ThemeSize
  color?: ThemeColor
  shouldAllowFreeText?: boolean
  layer?: keyof ThemeZOrder
  clearLabel?: string
  openLabel?: string
  closeLabel?: string
  loadingText?: string
  noOptionsText?: string
}

/** The slots of Autocomplete a theme can style with `styleOverrides`. */
export type AutocompleteSlot =
  | 'root'
  | 'tags'
  | 'input'
  | 'clearIndicator'
  | 'popupIndicator'
  | 'popup'
  | 'listbox'
  | 'group'
  | 'groupLabel'
  | 'groupItems'
  | 'option'
  | 'status'

/** What `theme.components.Autocomplete` takes. */
export type AutocompleteThemeConfig = ComponentConfig<AutocompleteOwnerState, AutocompleteSlot>
