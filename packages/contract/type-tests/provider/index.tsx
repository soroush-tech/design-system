// The provider takes one of the registered themes and rejects an object with a key no theme has.
import { ThemeProvider } from '@soroush.design/react/ThemeProvider'
import { themes } from '../shared/themes'

export const Ok = () => (
  <ThemeProvider theme={themes.dark} defaults={{ size: 'sm' }}>
    ok
  </ThemeProvider>
)

const unknownKey = { ...themes.dark, nonsense: true }

export const Bad = () => (
  // @ts-expect-error -- 'nonsense' is not a key of the registered themes
  <ThemeProvider theme={unknownKey}>no</ThemeProvider>
)
