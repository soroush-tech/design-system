// `dark` lacks the `brand` color `light` has: `defineThemes` rejects the pair, on its own line.
import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'

const light = createTheme(baseTheme, {
  palette: {
    brand: { main: '#0a7a5a', light: '#3d9b80', dark: '#075640', contrastText: '#ffffff' },
  },
})
const dark = createTheme(baseTheme, {})

// @ts-expect-error -- dark is missing palette.brand
export const themes = defineThemes({ light, dark }, {})
