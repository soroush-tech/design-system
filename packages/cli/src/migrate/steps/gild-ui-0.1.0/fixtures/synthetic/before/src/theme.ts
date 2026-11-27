import type { Theme } from '@soroush.tech/design-system'
import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'

export type Looks = Theme['components']

const components = { Button: { defaultProps: { size: 'sm' as const } } }

const themes = {
  light: createTheme(baseTheme, { name: 'light', components, colorScheme: 'light' }),
  dark: createTheme(baseTheme, {
    name: 'dark',
    components,
  }),
}

export default themes
