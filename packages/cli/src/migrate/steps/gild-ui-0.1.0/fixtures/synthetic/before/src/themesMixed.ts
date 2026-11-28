import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'
import { components } from './components'

export const light = createTheme(baseTheme, { name: 'light', components })
const dark = createTheme(baseTheme, { name: 'dark', components })

export const themes = {
  light,
  main: dark,
}

export const moreThemes = { light, dark, other: light }
