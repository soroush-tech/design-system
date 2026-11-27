// The theme file of an app on the final shape: two themes, one set of component looks, and the
// one registration line. Programs that need a registered theme import it.
import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'
import type { ThemeComponents } from '@gild-ui/react'

const light = createTheme(baseTheme, {
  palette: {
    brand: { main: '#0a7a5a', light: '#3d9b80', dark: '#075640', contrastText: '#ffffff' },
  },
  chart: { grid: '#e5e7eb' },
})

const dark = createTheme(baseTheme, {
  palette: {
    brand: { main: '#3ddc97', light: '#7ae8b9', dark: '#1fa86f', contrastText: '#06231a' },
  },
  chart: { grid: '#2a2f2e' },
})

export const themes = defineThemes({ light, dark }, {
  Tabs: {
    variants: [
      {
        props: { variant: 'pill' },
        style: ({ theme, ownerState }) => ({
          borderRadius: theme.radii.lg,
          opacity: ownerState.fullWidth ? 1 : 0.9,
        }),
      },
    ],
  },
} satisfies ThemeComponents)

declare module '@gild-ui/core/theme' {
  interface Register {
    themes: typeof themes
  }
}
