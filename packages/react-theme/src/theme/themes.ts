import type { CSSObject as EngineCSSObject } from '@umber-style/react'
import { baseTheme as coreBaseTheme } from '@soroush.design/core/theme'
import type {
  DeepPartial,
  OpenScale,
  RegisteredTheme,
  Theme as CoreTheme,
} from '@soroush.design/core/theme'

// The theme itself - the token scales, `createTheme`, `baseTheme` - is `@soroush.design/core`'s,
// and every platform reads the same one. It is re-exported here, so an app imports it from this
// entry, and augments it from this entry: `declare module '@soroush.design/react-theme' {
// interface ThemePalette { brand: PaletteEntry } }` merges into the core's interface.
export * from '@soroush.design/core/theme'

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

/** One theme-contributed variant: applied when every key in `props` matches the render props. */
export interface ComponentVariant<OwnerState> {
  props: Partial<OwnerState>
  style: ComponentStyle<OwnerState>
}

/** Per-component customization: default prop values, per-slot CSS, extra variants. */
export interface ComponentConfig<
  OwnerState = Record<string, unknown>,
  Slot extends string = 'root',
> {
  /** Default prop values - explicit props and group context always win. */
  defaultProps?: Partial<OwnerState>
  /** Per-slot CSS merged after the component's own styles (theme wins). */
  styleOverrides?: Partial<Record<Slot, ComponentStyle<OwnerState>>>
  /** Extra variants matched by props. Replaced wholesale by `createTheme`, never merged. */
  variants?: ReadonlyArray<ComponentVariant<OwnerState>>
  /**
   * Type only, never set: names the owner state, so `createTheme` can check this config's keys
   * without reading the types of its values (see `ThemeOverrides` in the core).
   */
  readonly $owner?: OwnerState
}

/**
 * Per-component theme customization, keyed by component name. It starts empty: a library of
 * components augments it with the typing of each component's slots, owner state and variants -
 * `declare module '@soroush.design/react-theme' { interface ThemeComponents { Button?:
 * ComponentConfig<ButtonOwnerState, 'root' | 'label'> } }` - and so does an app that builds its own
 * components on `styled(tag, { name })`.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- open on purpose: libraries and apps add their components
export interface ThemeComponents {}

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
