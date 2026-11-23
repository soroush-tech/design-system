// The form a React Native or Vue app shares: the augmentation names the core, which owns the
// theme's interfaces, and reaches the React components through the library that extends it.
import type { PaletteEntry } from '@soroush.design/core/theme'

declare module '@soroush.design/core/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
}
