// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'

// The core is read by tools outside a browser - a daemon, a build-time generator - and by every
// platform. Loading any entry must reach for no DOM and for no framework or styling engine: any
// of these imported on the way fails the import.
for (const name of [
  'react',
  'react-dom',
  'react-native',
  'vue',
  '@umber-style/react',
  '@umber-style/styled',
  '@umber-style/css',
]) {
  vi.doMock(name, () => {
    throw new Error(`the core imported ${name}`)
  })
}

describe('the core in plain Node', () => {
  it('loads the catalog with no DOM, framework or styling engine', async () => {
    expect('document' in globalThis).toBe(false)
    expect('window' in globalThis).toBe(false)
    const { catalog } = await import('./catalog')
    await import('./catalog/entries')
    expect(Object.keys(catalog.components).length).toBeGreaterThan(0)
  })

  it('loads the theme, the breakpoint helpers and the utilities, and builds a theme', async () => {
    const { baseTheme, createTheme } = await import('./theme')
    const { createMediaHelpers } = await import('./breakpoints')
    const { clamp } = await import('./utils')
    const theme = createTheme(baseTheme, { palette: { primary: { main: '#123456' } } })
    expect(theme.palette.primary.main).toBe('#123456')
    expect(createMediaHelpers({ md: '840px' }).up('md')).toBe('@media (width >= 840px)')
    expect(clamp(5, 0, 1)).toBe(1)
  })
})
