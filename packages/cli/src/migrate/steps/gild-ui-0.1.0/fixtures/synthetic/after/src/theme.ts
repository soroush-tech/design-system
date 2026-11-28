import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'
import type { ThemeComponents } from '@gild-ui/react'

export type Looks = ThemeComponents

const components = { Button: { defaultProps: { size: 'sm' as const } } }

const themes = defineThemes({
  light: createTheme(baseTheme, { name: 'light', colorScheme: 'light' }),
  dark: createTheme(baseTheme, {
    name: 'dark',
  }),
}, components)

export default themes
