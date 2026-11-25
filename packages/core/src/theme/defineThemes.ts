import type { Theme } from './types'

type Opaque =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | readonly unknown[]
  | ((...args: never[]) => unknown)

/** Every key path below `T`, as `'palette.brand.main'`. */
type Paths<T, Prefix extends string = ''> = T extends Opaque
  ? never
  : {
      [K in keyof T & string]-?: string extends K
        ? never
        : `${Prefix}${K}` | Paths<NonNullable<T[K]>, `${Prefix}${K}.`>
    }[keyof T & string]

/** The key paths of a theme's tokens: `components` is shared, so it is left out. */
type TokenPaths<T> = {
  [K in Exclude<keyof T & string, 'components'>]-?: K | Paths<NonNullable<T[K]>, `${K}.`>
}[Exclude<keyof T & string, 'components'>]

type Parent<S extends string> = S extends `${infer Head}.${infer Tail}`
  ? Tail extends `${string}.${string}`
    ? `${Head}.${Parent<Tail>}`
    : Head
  : never

/** The paths of `M` whose parent is not in `M` too: `palette.brand`, not also `palette.brand.main`. */
type Roots<All extends string, M extends string = All> = M extends unknown
  ? [Extract<All, Parent<M>>] extends [never]
    ? M
    : never
  : never

type Missing<T, Name extends keyof T, Other extends keyof T> =
  Roots<Exclude<TokenPaths<T[Other]>, TokenPaths<T[Name]>>> extends infer M extends string
    ? M extends unknown
      ? `Theme "${Name & string}" is missing ${M}, which "${Other & string}" has`
      : never
    : never

/**
 * For each theme, `unknown` when it has every key the other themes have, else the message that
 * names the theme and the key: the argument is `T & Mismatches<T>`, so the message is what the
 * error prints.
 */
type Mismatches<T> = {
  [Name in keyof T]: [Missing<T, Name, Exclude<keyof T, Name>>] extends [never]
    ? unknown
    : Missing<T, Name, Exclude<keyof T, Name>>
}

type Flat<T> = { [K in keyof T]: T[K] } & {}

/** A theme with the one shared `components` value. */
type ThemeWith<T, C> = Flat<
  { [K in keyof T as K extends 'components' ? never : K]: T[K] } & { readonly components: C }
>

/** What `defineThemes` returns: each theme with the shared `components`. */
type DefinedThemes<T, C> = { readonly [Name in keyof T]: ThemeWith<T[Name], C> }

/**
 * Defines an app's themes: every theme in `themes` gets the one `components` object - the
 * customization of the components, the same in every theme - and the types check that all themes
 * have exactly the same keys, at every depth, so one theme cannot lack a color another has (the
 * error names the theme and the key). The values may differ.
 *
 * Check `components` where it is written, with `satisfies ThemeComponents` from the React library
 * (this package cannot know a framework's slots); it is kept as written, so a look such as
 * `variant: 'pill'` is known to the types once the themes are registered (see `Register`).
 *
 * Returns new objects: neither the themes nor `components` is changed, as the styling engine
 * requires a theme object not to change once it is in use.
 */
export const defineThemes = <T extends Record<string, Theme>, C extends object>(
  themes: T & Mismatches<T>,
  components: C
): DefinedThemes<T, C> =>
  Object.fromEntries(
    Object.entries(themes).map(([name, theme]) => [name, { ...theme, components }])
  ) as DefinedThemes<T, C>
