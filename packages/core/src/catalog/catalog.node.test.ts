// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'

// The catalog is read by tools outside a browser - a daemon, a build-time generator - and by every
// platform. Loading it must reach for no DOM and for no framework or styling engine: any of
// these imported on the way fails the import.
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
    throw new Error(`the catalog imported ${name}`)
  })
}

describe('catalog in plain Node', () => {
  it('loads with no DOM, framework or styling engine', async () => {
    expect('document' in globalThis).toBe(false)
    expect('window' in globalThis).toBe(false)
    const { catalog } = await import('./index')
    await import('./entries')
    expect(Object.keys(catalog.components).length).toBeGreaterThan(0)
  })
})
