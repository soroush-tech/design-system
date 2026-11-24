// The app names the family umbrella, three re-exports away from the interface it extends:
// `soroush.design/react/theme` -> `@soroush.design/react/theme` -> the component library's `/theme`
// -> the theme library's `/theme` -> the core's.
import type { PaletteEntry } from 'soroush.design/react/theme'

declare module 'soroush.design/react/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
