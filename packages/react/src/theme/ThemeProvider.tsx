import type { ReactNode } from 'react'
import { derivedBy } from './derivedTheme'
import { EngineThemeProvider as DefaultThemeProvider } from './engine'
import { baseTheme, type AppTheme, type Theme } from './themes'
import { validateThemeComponents } from '@soroush.design/core/catalog'
import { createTheme, type Register, type ThemeDefaults } from '@soroush.design/core/theme'

/**
 * Once themes are registered, `T` may have no key the registered themes lack, at any depth: each
 * extra key is typed `never`, so the error names it. `components` is the one shared value, which
 * `defineThemes` already checked.
 */
type Exact<T, Shape> = keyof Register extends never ? unknown : Same<T, Shape>
type Same<T, Shape> = T extends
  | readonly unknown[]
  | ((...args: never[]) => unknown)
  | string
  | number
  | boolean
  | null
  | undefined
  ? T
  : {
      [K in keyof T]: K extends 'components'
        ? T[K]
        : K extends keyof Shape
          ? Same<T[K], NonNullable<Shape[K]>>
          : never
    }

interface ThemeProviderProps<T> {
  children?: ReactNode
  /**
   * The active theme. Bring one theme, or as many as you like - switching
   * between them is your state, not the provider's. Defaults to the built-in
   * `baseTheme`.
   */
  theme?: T & Exact<T, AppTheme>
  /**
   * Optional component default token/variant keys, merged into the theme
   * (e.g. `{ size: 'compact' }` makes every sized component default to your key).
   * Two objects with the same contents give the same theme, so an inline literal is fine.
   */
  defaults?: ThemeDefaults
}

const noDefaults: ThemeDefaults = {}

// The first `defaults` object of each content stands for every object of that content: a literal
// in a component is a new object each render, and the derived theme is kept by the object.
const known = new Map<string, ThemeDefaults>()
const sameDefaults = (defaults: ThemeDefaults) => {
  const key = JSON.stringify(defaults)
  let first = known.get(key)
  if (!first) known.set(key, (first = defaults))
  return first
}

// One derived theme for each theme and `defaults`: the engine sees the same object on every
// render, on a server too, where `useMemo` keeps nothing between renders.
const withDefaults = derivedBy((theme: Theme, defaults: ThemeDefaults) =>
  createTheme(theme, defaults === noDefaults ? {} : { defaults })
)

// The build tool of the app replaces this, so a production build drops the check below; a program
// that compiles this source without Node's types still knows the name.
declare const process: { env: { NODE_ENV?: string } }

// Development only: the active theme's `components` are checked against the catalog, each
// distinct problem is warned about once, and a `components` object is checked once however many
// themes share it.
const checked = new WeakSet<object>()
const warned = new Set<string>()
const warnAboutComponents = (components: object | undefined) => {
  if (!components || checked.has(components)) return
  checked.add(components)
  for (const { message } of validateThemeComponents(components)) {
    if (warned.has(message)) continue
    warned.add(message)
    console.warn(message)
  }
}

export function ThemeProvider<T extends Theme = Theme>({
  children,
  theme,
  defaults,
}: Readonly<ThemeProviderProps<T>>) {
  if (process.env.NODE_ENV !== 'production') warnAboutComponents(theme?.components)
  return (
    <DefaultThemeProvider
      theme={withDefaults(theme ?? baseTheme, defaults ? sameDefaults(defaults) : noDefaults)}
    >
      {children}
    </DefaultThemeProvider>
  )
}
