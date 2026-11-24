// What an app that installs only the theme package - no component library - writes against the
// PUBLISHED declarations (`pnpm test:types` builds them first). It adds a color to the palette and
// registers a component of its own on the open `components`, with `skipLibCheck` off.
import {
  ThemeProvider,
  baseTheme,
  createTheme,
  styled,
  useDefaultProps,
  useTheme,
} from '@soroush.design/react-theme'
import type { ComponentConfig, PaletteEntry, Theme } from '@soroush.design/react-theme'

declare module '@soroush.design/react-theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
  interface ThemeComponents {
    MyWidget?: ComponentConfig<{ mood?: 'calm' | 'loud' }, 'root' | 'handle'>
  }
}

export const Box = styled('div', { name: 'MyWidget' })(({ theme }) => ({
  color: theme.palette.brand.main,
}))

export const appTheme: Theme = createTheme(baseTheme, {
  palette: { brand: { main: '#0a7', light: '#3c9', dark: '#065', contrastText: '#fff' } },
  components: {
    MyWidget: {
      defaultProps: { mood: 'calm' },
      styleOverrides: { handle: { cursor: 'grab' } },
    },
  },
})

export const Mood = () => {
  const { mood } = useDefaultProps('MyWidget')
  return <ThemeProvider theme={appTheme}>{useTheme().name + (mood ?? '')}</ThemeProvider>
}
