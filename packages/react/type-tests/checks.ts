// What an app that installs only `@soroush.design/react` must be able to do once it has
// added a `brand` color to the palette. Every name below comes from the umbrella.
import { styled } from '@soroush.design/react'
import type { ButtonColor, ButtonProps } from '@soroush.design/react/Button'
import { baseTheme, createTheme, useTheme } from '@soroush.design/react/theme'

export const colorOfButton: ButtonColor = 'brand'
export const propsOfButton: ButtonProps['color'] = 'brand'

export const Box = styled('div')(({ theme }) => ({ color: theme.palette.brand.main }))

export const useBrand = (): string => useTheme().palette.brand.main

export const appTheme = createTheme(baseTheme, {
  palette: { brand: { main: '#0a7', light: '#3c9', dark: '#065', contrastText: '#fff' } },
})
export const brandMain: string = appTheme.palette.brand.main

// The component library adds each component's slots to the theme's open `components`, so a theme
// types `Button` once the app imports the entry point of `Button` (above).
export const buttonTheme = createTheme(baseTheme, {
  components: {
    Button: {
      defaultProps: { size: 'sm', color: 'brand' },
      styleOverrides: { root: ({ ownerState }) => ({ opacity: ownerState.disabled ? 0.4 : 1 }) },
    },
  },
})
