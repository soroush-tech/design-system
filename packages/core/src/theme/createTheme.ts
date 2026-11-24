import { withBreakpointHelpers } from '../breakpoints'
import { deepMerge } from '../utils/deepMerge'
import type { Theme } from './types'

/**
 * Recursive partial of a theme shape. Plain objects recurse; arrays and
 * functions are replaced wholesale by `createTheme`, so they stay intact here.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends (...args: never[]) => unknown
      ? T[K]
      : T[K] extends object
        ? DeepPartial<T[K]>
        : T[K]
}

/** Sparse theme patch accepted by `createTheme` and `ThemeProvider`'s `themes` prop. */
export type ThemeOverride = DeepPartial<Theme>

/**
 * Builds a theme by deep-merging sparse `overrides` onto `base`.
 *
 * - Recurses only where both sides are plain objects; arrays (`shadows`,
 *   `fontSizes`) and functions replace wholesale.
 * - `undefined` override values are ignored - a key can be added or replaced,
 *   never removed.
 * - Neither argument is mutated; untouched branches keep referential identity.
 * - `breakpoints` gets its query helpers back, built from the merged sizes.
 */
export const createTheme = <T extends Theme>(base: T, overrides: NoInfer<DeepPartial<T>>): T => {
  const theme = deepMerge(
    base as unknown as Record<string, unknown>,
    overrides as Record<string, unknown>
  ) as unknown as T
  return withHelpers(theme)
}

/** A theme whose `breakpoints` carry the query helpers - added when a hand-built theme lacks them. */
const withHelpers = <T extends Theme>(theme: T): T =>
  theme.breakpoints && !('up' in theme.breakpoints)
    ? ({ ...theme, breakpoints: withBreakpointHelpers(theme.breakpoints) } as T)
    : theme
