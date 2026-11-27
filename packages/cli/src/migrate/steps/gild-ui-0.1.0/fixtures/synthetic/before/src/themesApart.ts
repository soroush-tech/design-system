import type { Theme } from '@soroush.tech/design-system'
import { baseTheme, createTheme } from '@soroush.tech/design-system/theme'

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
