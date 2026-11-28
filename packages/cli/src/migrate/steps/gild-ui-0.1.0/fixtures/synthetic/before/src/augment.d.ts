import type { PaletteEntry } from '@soroush.tech/design-system/theme'

declare module '@soroush.tech/design-system/theme' {
  interface ThemePalette {
    brand: PaletteEntry
  }
  interface TabsVariants {
    pill: true
  }
  interface Theme {
    components?: { Foo: string }
  }
  interface ThemeComponents {
    Foo: string
  }
  interface Other {}
}
