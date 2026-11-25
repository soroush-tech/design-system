import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'react-dom/server'
import { LayoutProvider } from './LayoutProvider'
import { baseTheme, type Theme, type ThemeLayout } from './themes'

type Derive = (outer: Theme) => Theme
const derives: Derive[] = []

// The engine merges the theme it is given into a new object of its own, so what the provider
// hands it is read here, in place of the engine's provider.
vi.mock('./engine', () => ({
  EngineThemeProvider: ({ theme }: { theme: Derive }) => {
    derives.push(theme)
    return null
  },
}))

const page: ThemeLayout = { lg: { content: { maxWidth: '1376px' } } }
const derivedFor = (layout: ThemeLayout, outer: Theme) => {
  renderToString(<LayoutProvider layout={layout}>x</LayoutProvider>)
  return derives.at(-1)!(outer)
}

describe('LayoutProvider, the theme it gives the engine', () => {
  it('is the same object for the same outer theme and layout, render after render', () => {
    expect(derivedFor(page, baseTheme)).toBe(derivedFor(page, baseTheme))
  })

  it('is another object for another layout or another outer theme', () => {
    expect(derivedFor({ ...page }, baseTheme)).not.toBe(derivedFor(page, baseTheme))
    expect(derivedFor(page, { ...baseTheme })).not.toBe(derivedFor(page, baseTheme))
  })

  it('builds on the base theme where no theme provider is above', () => {
    expect(derivedFor(page, {} as Theme)).toBe(derivedFor(page, baseTheme))
  })
})
