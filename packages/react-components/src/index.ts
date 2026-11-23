// =============================================================================
// Engine abstraction - import all styling primitives from here.
// To swap the CSS-in-JS engine, update only this section (and ./theme/engine.ts).
// =============================================================================
export { styled, type ThemeCustomizationOptions } from './style/styled'
export { css, keyframes } from '@umber-style/react'
// `ThemeProvider`, `useTheme`, and theme hooks live at the `./theme` subpath.
// `Global`, `globalStyles`, and `CacheProvider`/`styleCache` live at the `./engine`
// subpath - raw engine primitives for building your own global styles, not barrel exports.
export type { Theme, CSSObject } from './theme/themes'
export type { PaletteColor } from '@soroush.design/core/theme'
export * from '@soroush.design/styled-system'
export { createShouldForwardProp, props } from '@soroush.design/styled-system/should-forward-prop'
