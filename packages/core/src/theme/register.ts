import type {
  BreakpointKey,
  Theme,
  ThemePalette,
  ThemeSizes,
  ThemeSpace,
  ThemeTypographyVariants,
} from './types'

/**
 * The app's themes, named once, for every platform. An app registers the type of its `defineThemes`
 * result, and the types of every library that reads it - React, React Native, Vue - follow:
 *
 *   export const themes = defineThemes({ light, dark }, components)
 *   declare module '@gild-ui/core/theme' { interface Register { themes: typeof themes } }
 *
 * The block holds no key of its own: what the theme VALUES add - a palette color, a size, a look in
 * `components.X.variants` - is what the types accept.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- open on purpose: the app registers its themes
export interface Register {}

/**
 * The shape the registered themes share (`defineThemes` makes every theme have the same keys), with
 * the one `components` value; `Fallback` (a platform passes its own `Theme`) when none is registered.
 */
export type RegisteredTheme<Fallback = Theme> = Register extends { themes: infer T }
  ? T[keyof T]
  : Fallback

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
export type VariantOf<Name extends string, Prop extends string = 'variant'> = [
  RegisteredComponents,
] extends [never]
  ? never
  : Name extends keyof RegisteredComponents
    ? RegisteredComponents[Name] extends { variants: ReadonlyArray<infer V> }
      ? V extends { props: { [P in Prop]: infer X } }
        ? string extends X
          ? never
          : X
        : never
      : never
    : never

type RegisteredComponents = Register extends { themes: infer T }
  ? T[keyof T] extends { components: infer C }
    ? C
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
