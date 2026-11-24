// The app imports from the family umbrella but augments with the name of the platform umbrella: both
// reach the same interface, so the name an app writes in `declare module` is its own choice.
import type { PaletteEntry } from '@soroush.design/react/theme'

declare module '@soroush.design/react/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
