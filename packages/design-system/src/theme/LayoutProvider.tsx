import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { EmotionThemeProvider } from './emotion'
import { baseTheme, type Theme, type ThemeLayout } from './themes'
import { createTheme, deepMerge } from './utils/createTheme'

export interface LayoutProviderProps {
  /**
   * The page's layout: `theme.layout`'s shape - `content`, `panels`, `bars` per breakpoint -
   * partial. A value holds from its breakpoint up, until the page sets it again. Keep it stable
   * (defined outside the component, or memoized): a new object re-derives the theme.
   */
  layout: ThemeLayout
  children: ReactNode
}

type Layer = Record<string, unknown>

// Mobile-first: a page value is carried into every later breakpoint until the page sets it
// again, so the theme's own later change of that field (the base theme's xl max width) does
// not replace it.
const pageLayout = (theme: Theme, layout: ThemeLayout): ThemeLayout => {
  const page = layout as Record<string, Layer | undefined>
  let carried: Layer = {}
  const merged: Record<string, Layer> = {}
  for (const key of Object.keys(theme.breakpoints)) {
    carried = deepMerge(carried, page[key] ?? {})
    if (Object.keys(carried).length > 0) merged[key] = carried
  }
  return merged as ThemeLayout
}

/**
 * @description A page-level layout: everything inside sees `theme.layout` with the page's
 * values merged on top - `View`, `Flex` and `Grid` with `layout`, and `useTheme().layout`. It
 * derives the theme from the one around it and changes nothing else, so colours, light/dark
 * switching and every other token stay the app theme's. Nested providers stack.
 */
export function LayoutProvider({ layout, children }: Readonly<LayoutProviderProps>) {
  const derive = useCallback(
    (outer: Theme) => {
      // Without a ThemeProvider, Emotion's theme is `{}` - build on the base theme, as
      // ThemeProvider does by default.
      const theme = 'breakpoints' in outer ? outer : baseTheme
      return createTheme(theme, { layout: pageLayout(theme, layout) })
    },
    [layout]
  )
  return <EmotionThemeProvider theme={derive}>{children}</EmotionThemeProvider>
}
