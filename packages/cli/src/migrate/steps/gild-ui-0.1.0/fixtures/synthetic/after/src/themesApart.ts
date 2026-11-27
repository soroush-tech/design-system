import type { Theme } from '@gild-ui/core/theme'
import { baseTheme, createTheme } from '@gild-ui/core/theme'

const Heading = 'h1' as unknown as string

export const light: Theme = createTheme(baseTheme, {
  name: 'light',
  components: { Button: { defaultProps: { size: 'sm' } } },
})

export const dark: Theme = createTheme(baseTheme, {
  name: 'dark',
  components: { Button: { defaultProps: { size: 'md' } } },
  typography: { h1: { element: Heading } },
})

export const plain = createTheme(baseTheme, { name: 'plain' })
