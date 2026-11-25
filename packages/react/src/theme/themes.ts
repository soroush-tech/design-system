import type { CSSObject as EngineCSSObject } from '@umber-style/react'
import { baseTheme as coreBaseTheme } from '@soroush.design/core/theme'
import type { ThemeComponents } from './components'

export type { ThemeComponents }
import type {
  DeepPartial,
  OpenScale,
  Register,
  RegisteredTheme,
  Theme as CoreTheme,
} from '@soroush.design/core/theme'

/** Design-system's own style-object shape - the engine stays an internal implementation detail. */
export type CSSObject = EngineCSSObject

/**
 * A style contributed from `theme.components` - a plain CSS object, or a
 * callback receiving the theme and the styled root's resolved props
 * (`ownerState`) for conditional styling.
 */
export type ComponentStyle<OwnerState> =
  | CSSObject
  | ((args: { theme: Theme; ownerState: OwnerState }) => CSSObject)

/**
 * The owner-state fields whose types the registered themes widen: the colors, sizes, spacing keys
 * and looks they add.
 */
type DerivedFields = 'color' | 'size' | 'variant' | 'mb' | 'marginThreshold'

// A union holding a string literal, so a look written as `'pill'` keeps its literal type (an open
// `unknown` would widen it to `string`), and the registered themes can name it.
type OpenValue = '' | (string & {}) | number | boolean | null | object

/**
 * The owner state as the theme's own `components` are checked against it. Once themes are
 * registered, the derived fields are left open: a type that reads the registered themes cannot be
 * checked while those themes are being written (it would read itself). A misspelt value is checked
 * where it is used (a component's props), and in development by the validator `ThemeProvider` runs.
 * Every other field keeps its type.
 */
type OwnerKeys<OwnerState> = keyof Register extends never
  ? Partial<OwnerState>
  : { [K in keyof OwnerState]?: K extends DerivedFields ? OpenValue : OwnerState[K] }

/** One theme-contributed variant: applied when every key in `props` matches the render props. */
export interface ComponentVariant<OwnerState> {
  props: OwnerKeys<OwnerState>
  style: ComponentStyle<OwnerState>
}

/** Per-component customization: default prop values, per-slot CSS, extra variants. */
export interface ComponentConfig<
  OwnerState = Record<string, unknown>,
  Slot extends string = 'root',
> {
  /** Default prop values - explicit props and group context always win. */
  defaultProps?: OwnerKeys<OwnerState>
  /** Per-slot CSS merged after the component's own styles (theme wins). */
  styleOverrides?: Partial<Record<Slot, ComponentStyle<OwnerState>>>
  /** Extra variants matched by props. */
  variants?: ReadonlyArray<ComponentVariant<OwnerState>>
  /** Type only, never set: names the owner state, for `useDefaultProps` to type what it hands back. */
  readonly $owner?: OwnerState
}

/** The core's theme, with the typing of `theme.components` that the libraries and the app add. */
export interface Theme extends CoreTheme {
  /** Optional per-component customization - see `ThemeComponents`. */
  components?: OpenScale<ThemeComponents>
}

/** The theme the app registered (see `Register` in the core), or this package's `Theme` when it registered none. */
export type AppTheme = RegisteredTheme<Theme>

/** Sparse theme patch accepted by `createTheme` and `ThemeProvider`'s `themes` prop. */
export type ThemeOverride = DeepPartial<Theme>

/**
 * The core's base theme, typed as this package's `Theme` - the same object. `createTheme(baseTheme, ...)`
 * then accepts and returns `theme.components` too.
 */
export const baseTheme: Theme = coreBaseTheme
