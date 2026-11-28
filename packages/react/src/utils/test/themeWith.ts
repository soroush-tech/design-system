import { createTheme, defineThemes, type Theme } from '@gild-ui/core/theme'
import { baseTheme } from '../../theme/themes'
import type { ThemeComponents } from '../../theme/themes'

/**
 * A test theme: the base theme, with the given token overrides, and `components` set the way an
 * app sets them, by `defineThemes`.
 */
export const themeWith = (
  components: ThemeComponents,
  tokens: Parameters<typeof createTheme>[1] = {}
): Theme => defineThemes({ theme: createTheme(baseTheme, tokens) }, components).theme
