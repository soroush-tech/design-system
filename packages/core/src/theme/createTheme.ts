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

/** The scales an override may add keys to: `palette.brand`, `sizes.xl`, `background.tertiary`. */
type OpenScales =
  | 'palette'
  | 'sizes'
  | 'background'
  | 'text'
  | 'border'
  | 'radii'
  | 'fonts'
  | 'space'

type ComponentsBelongToDefineThemes =
  'components are not set by createTheme: pass them to defineThemes(themes, components)'

/**
 * What `createTheme` accepts as overrides (`O` is the overrides themselves): `DeepPartial<T>`,
 * except that
 * - a scale in `OpenScales` accepts keys `T` lacks, each with a whole entry of the scale's own shape
 *   (a new palette color needs `main`, `light`, `dark` and `contrastText`) - and a misspelt key of
 *   the scale is such a new key, which only a registered theme's use of it can reveal;
 * - `components` is not accepted: a theme's component looks are set once for all themes, by
 *   `defineThemes(themes, components)`.
 */
export type ThemeOverrides<T, O = T> = {
  [K in keyof T as K extends 'components' ? never : K]?: K extends OpenScales
    ? DeepPartial<T[K]> & {
        [P in Exclude<keyof (K extends keyof O ? O[K] : never), keyof T[K]>]: T[K][keyof T[K]]
      }
    : T[K] extends readonly unknown[]
      ? Readonly<T[K]>
      : T[K] extends (...args: never[]) => unknown
        ? T[K]
        : T[K] extends object
          ? DeepPartial<T[K]>
          : T[K]
} & { components?: ComponentsBelongToDefineThemes }

type Primitive = string | number | boolean | bigint | symbol | null | undefined
type WidenLeaf<V> = V extends string
  ? string
  : V extends number
    ? number
    : V extends boolean
      ? boolean
      : V
// A key an override adds: its literals widen, arrays (variants) stay exact.
type Added<O> = O extends Primitive
  ? WidenLeaf<O>
  : O extends readonly unknown[] | ((...args: never[]) => unknown)
    ? O
    : { -readonly [K in keyof O]: Added<O[K]> }
type Flat<T> = { [K in keyof T]: T[K] } & {}
/**
 * The type of the theme `createTheme` builds: `T`, with the overrides merged in the way the runtime
 * merges them. A key the overrides add (`palette.brand`) joins the type; a value the overrides set
 * on an existing key keeps `T`'s type.
 */
export type ThemeMerge<T, O> = T extends Primitive
  ? T
  : T extends readonly unknown[] | ((...args: never[]) => unknown)
    ? T
    : Flat<
        { [K in keyof T as K extends keyof O ? never : K]: T[K] } & {
          [K in keyof T & keyof O]-?: ThemeMerge<NonNullable<T[K]>, NonNullable<O[K]>>
        } & { [K in Exclude<keyof O, keyof T | 'components'>]: Added<O[K]> }
      >

/**
 * Builds a theme by deep-merging sparse `overrides` onto `base`.
 *
 * - Recurses only where both sides are plain objects; arrays (`shadows`,
 *   `fontSizes`) and functions replace wholesale.
 * - `undefined` override values are ignored - a key can be added or replaced,
 *   never removed.
 * - Neither argument is mutated; untouched branches keep referential identity.
 * - `breakpoints` gets its query helpers back, built from the merged sizes.
 * - The returned type keeps what the overrides add - see `ThemeMerge`.
 */
export const createTheme = <T extends Theme, const O extends ThemeOverrides<T, O>>(
  base: T,
  overrides: O
): ThemeMerge<T, O> => {
  const theme = deepMerge(
    base as unknown as Record<string, unknown>,
    overrides as Record<string, unknown>
  ) as unknown as ThemeMerge<T, O>
  return withHelpers(theme as unknown as Theme) as unknown as ThemeMerge<T, O>
}

/** A theme whose `breakpoints` carry the query helpers - added when a hand-built theme lacks them. */
const withHelpers = <T extends Theme>(theme: T): T =>
  theme.breakpoints && !('up' in theme.breakpoints)
    ? ({ ...theme, breakpoints: withBreakpointHelpers(theme.breakpoints) } as T)
    : theme
