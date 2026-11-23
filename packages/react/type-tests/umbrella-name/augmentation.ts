// The app names only the umbrella: `/theme` is a plain `export *` of the library's theme.
import type { PaletteEntry } from '@soroush.design/react/theme'

declare module '@soroush.design/react/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
