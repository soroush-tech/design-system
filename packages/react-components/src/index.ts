// =============================================================================
// Engine abstraction - import all styling primitives from here.
// The engine is configured once, in `@soroush.design/react-theme`, which this library depends on.
// =============================================================================
export {
  styled,
  css,
  keyframes,
  type ThemeCustomizationOptions,
  type Theme,
  type CSSObject,
} from '@soroush.design/react-theme'
// `ThemeProvider`, `useTheme`, and theme hooks live at the `./theme` subpath.
// `Global`, `globalStyles`, and `CacheProvider`/`styleCache` live at the `./engine`
// subpath - raw engine primitives for building your own global styles, not barrel exports.
export type { PaletteColor } from '@soroush.design/core/theme'
export * from '@soroush.design/styled-system'
export { createShouldForwardProp, props } from '@soroush.design/styled-system/should-forward-prop'
