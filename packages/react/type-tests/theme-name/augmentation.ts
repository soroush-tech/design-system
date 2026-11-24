// The app names the theme library itself, which the umbrella's `/theme` re-exports: the line
// reaches the same interface as the umbrella's name, the component library's and the core's.
import type { PaletteEntry } from '@soroush.design/react-theme'

declare module '@soroush.design/react-theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
