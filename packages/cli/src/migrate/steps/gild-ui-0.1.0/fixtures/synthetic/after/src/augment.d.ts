import type { PaletteEntry } from '@gild-ui/core/theme'

declare module '@gild-ui/core/theme' {
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
