// The app imports everything from the umbrella but names the library on this one line.
import type { PaletteEntry } from '@soroush.design/react/theme'

declare module '@soroush.design/react-components/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
