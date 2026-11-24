import type {
  BreakpointKey,
  Theme,
  ThemePalette,
  ThemeSizes,
  ThemeSpace,
  ThemeTypographyVariants,
} from './types'

/**
 * The app's theme, named once, for every platform. An app registers the type of its theme value,
 * and the types of every library that reads it - React, React Native, Vue - follow:
 *
 *   export const light = createTheme(baseTheme, { palette: { brand: { ... } } })
 *   declare module '@soroush.design/core/theme' { interface Register { theme: typeof light } }
 *
 * The block holds no key of its own: what the theme VALUE adds - a palette color, a size, a look in
 * `components.X.variants` - is what the types accept. The same line works under any name that
 * re-exports this module (`@soroush.design/react/theme`, `soroush.design/react/theme`, ...).
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- open on purpose: the app registers its theme
export interface Register {}

/** The theme the app registered, or `Fallback` (a platform passes its own `Theme`) when it registered none. */
export type RegisteredTheme<Fallback = Theme> = Register extends { theme: infer T } ? T : Fallback

/** A palette color: the built-in and augmented ones, and those the registered theme adds. */
export type ThemeColor = keyof ThemePalette | keyof RegisteredTheme['palette']
/** A size step of `theme.sizes`. */
export type ThemeSize = keyof ThemeSizes | keyof RegisteredTheme['sizes']
/** A `theme.space` key. */
export type ThemeSpaceKey = keyof ThemeSpace | keyof RegisteredTheme['space']
/** A breakpoint name. */
export type ThemeBreakpoint = BreakpointKey | keyof RegisteredTheme['breakpoints']
/** A typography variant of `theme.typography`. */
export type ThemeTypography = keyof ThemeTypographyVariants | keyof RegisteredTheme['typography']

/**
 * The values of `props[Prop]` over the variants the registered theme defines for component `Name`
 * (`VariantOf<'Tabs'>` is `'pill'` when the theme has `variants: [{ props: { variant: 'pill' }, ... }]`).
 * Only literal values count; `never` when nothing is registered.
 */
export type VariantOf<Name extends string, Prop extends string = 'variant'> = Register extends {
  theme: { components: infer C }
}
  ? Name extends keyof C
    ? C[Name] extends { variants: ReadonlyArray<infer V> }
      ? V extends { props: { [P in Prop]: infer X } }
        ? string extends X
          ? never
          : X
        : never
      : never
    : never
  : never

type Leaf = string | number | boolean | bigint | symbol | null | undefined
type KeysOf<T> = T extends Leaf | readonly unknown[] | ((...args: never[]) => unknown)
  ? unknown
  : { [K in keyof T]: KeysOf<T[K]> }

/**
 * What every theme of an app must have: the keys of the registered theme, at every depth (each
 * palette color, each size, each token), with any values. `components` is left out - its looks are
 * checked by `LooksOf`. Use it as `{ light, dark } satisfies Record<string, ThemeFor>`.
 */
export type ThemeFor<R = RegisteredTheme> = KeysOf<Omit<R, 'components'>> & { components?: unknown }

/** Every `[component, prop, value]` look a theme defines in `components.<Name>.variants[].props`, as `'Tabs.variant.pill'`. */
export type LooksOf<T> = T extends { components: infer C }
  ? {
      [N in keyof C & string]: C[N] extends { variants: ReadonlyArray<infer V> }
        ? V extends { props: infer P }
          ? { [K in keyof P & string]: P[K] extends string ? `${N}.${K}.${P[K]}` : never }[keyof P &
              string]
          : never
        : never
    }[keyof C & string]
  : never
