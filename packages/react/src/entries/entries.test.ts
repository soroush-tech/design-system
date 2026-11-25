// @vitest-environment node
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// An app that imports only one name of the styling system - `@soroush.design/react/keyframes`, say -
// must still get the engine configured: the package is free of side effects, so what configures it
// is a function the entry's own module calls.
const configure = vi.hoisted(() => vi.fn())
vi.mock('@umber-style/react', async (importOriginal) => {
  const engine = await importOriginal<typeof import('@umber-style/react')>()
  return { ...engine, configure: configure.mockImplementation(engine.configure) }
})

const names = readdirSync(join(import.meta.dirname))
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
  .map((file) => file.replace(/\.ts$/, ''))

describe('each entry of the styling system', () => {
  beforeEach(() => {
    vi.resetModules()
    configure.mockClear()
  })

  it('is the 13 names of the contract', () => {
    expect(names).toHaveLength(13)
  })

  it.each(names)('%s configures the engine on its own, with the soroush prefix', async (name) => {
    const entry = await import(`./${name}.ts`)
    expect(Object.keys(entry).length).toBeGreaterThan(0)
    expect(configure).toHaveBeenCalledTimes(1)
    expect(configure).toHaveBeenCalledWith(
      expect.objectContaining({ prefix: 'soroush', hasValueRepair: true })
    )
  })
})
