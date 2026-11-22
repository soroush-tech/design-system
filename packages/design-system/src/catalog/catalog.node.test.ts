// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'

// The catalog is read by tools outside a browser - a daemon, a build-time generator. Loading
// it must reach for no DOM, and for none of React or the styling engine: any of these imported on the
// way fails the import.
vi.mock('react', () => {
  throw new Error('the catalog imported react')
})
vi.mock('react-dom', () => {
  throw new Error('the catalog imported react-dom')
})
vi.mock('@umber-style/react', () => {
  throw new Error('the catalog imported @umber-style/react')
})
vi.mock('@umber-style/styled', () => {
  throw new Error('the catalog imported @umber-style/styled')
})

describe('catalog in plain Node', () => {
  // A first import of every entry, under coverage instrumentation, takes a few seconds.
  it('loads with no DOM, React or the styling engine', { timeout: 30_000 }, async () => {
    expect(typeof document).toBe('undefined')
    const { catalog } = await import('./index')
    expect(Object.keys(catalog.components).length).toBeGreaterThan(0)
  })
})
