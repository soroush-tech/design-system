import type { ReactNode } from 'react'
import { derivedBy } from './derivedTheme'
import { EngineThemeProvider as DefaultThemeProvider } from './engine'
import { baseTheme, type Theme } from './themes'
import { createTheme, type ThemeDefaults } from '@soroush.design/core/theme'

interface ThemeProviderProps {
  children?: ReactNode
  /**
   * The active theme. Bring one theme, or as many as you like - switching
   * between them is your state, not the provider's. Defaults to the built-in
   * `baseTheme`.
   */
  theme?: Theme
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

export function ThemeProvider({
  children,
  theme = baseTheme,
  defaults,
}: Readonly<ThemeProviderProps>) {
  return (
    <DefaultThemeProvider
      theme={withDefaults(theme, defaults ? sameDefaults(defaults) : noDefaults)}
    >
      {children}
    </DefaultThemeProvider>
  )
}
