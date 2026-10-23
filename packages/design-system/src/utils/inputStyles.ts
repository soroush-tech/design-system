import type { Theme } from '../theme/themes'
import { themeDefault } from '../theme/utils/themeDefault'
import { get } from '../index'

/** The least width of a field that does not fill its row: `theme.defaults.inputMinWidth`, else `'12rem'`. */
export const getInputMinWidth = (theme: Theme) => themeDefault(theme, 'inputMinWidth', '12rem')

/**
 * The keyboard focus ring of every input - the one the border takes on focus: the error color
 * while it is in error, else the field's own color.
 */
export const getFocusRing = (theme: Theme, color: keyof Theme['palette'], isError = false) => ({
  outline: `2px solid ${get(theme, isError ? 'palette.error.main' : `palette.${color}.main`)}`,
  outlineOffset: '2px',
})
