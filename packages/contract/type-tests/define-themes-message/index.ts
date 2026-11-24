// The same pair as `define-themes-mismatch`, with no suppression: the program must fail, and
// `expect-errors.txt` holds what its output must say, naming the theme and the key.
import { baseTheme, createTheme, defineThemes } from '@soroush.design/core/theme'

const light = createTheme(baseTheme, {
  palette: {
    brand: { main: '#0a7a5a', light: '#3d9b80', dark: '#075640', contrastText: '#ffffff' },
  },
})
const dark = createTheme(baseTheme, {})

export const themes = defineThemes({ light, dark }, {})
