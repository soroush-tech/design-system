import { baseTheme, createTheme, defineThemes } from '@gild-ui/core/theme'
import type { ThemeComponents } from '@gild-ui/react'
import { registerBaseTheme } from '@gild-ui/react/ThemeProvider'

// The app's one theme module. The root layout (a server component) and the client components import
// it, so the server and the browser each hold the same `components` and `defaults`.
const brand = { defaults: { surfaceRadius: 'lg' } } as const

const light = createTheme(baseTheme, {
  ...brand,
  name: 'light',
  colorScheme: 'light',
  palette: {
    brand: { main: '#0a7a5a', light: '#3d9b80', dark: '#075640', contrastText: '#ffffff' },
  },
  background: { primary: '#ffffff', paper: '#f4f1ee', secondary: '#f7f7f7', default: '#e8e8e8' },
  text: { initial: '#1a1a1a', primary: '#0a7a5a', secondary: '#555555' },
})

const dark = createTheme(baseTheme, {
  ...brand,
  palette: {
    brand: { main: '#3ddc97', light: '#7ae8b9', dark: '#1fa86f', contrastText: '#06231a' },
  },
})

export const themes = defineThemes({ light, dark }, {
  Card: {
    variants: [
      {
        props: { variant: 'interactive' },
        style: ({ theme }) => ({ borderLeft: `4px solid ${theme.palette.primary.main}` }),
      },
    ],
  },
} satisfies ThemeComponents)

declare module '@gild-ui/core/theme' {
  interface Register {
    themes: typeof themes
  }
}

// What a server component reads, with no provider above it.
registerBaseTheme(themes.light)

export const cookieName = 'scheme'
export type Scheme = keyof typeof themes
