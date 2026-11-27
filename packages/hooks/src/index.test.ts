import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import * as root from './index'

// The root is every entry point at once: each hook of package.json is a name of it.
const { exports } = JSON.parse(readFileSync('package.json', 'utf8')) as {
  exports: Record<string, string>
}
const hooks = Object.keys(exports)
  .filter((subpath) => subpath !== '.')
  .map((subpath) => subpath.slice(2))

describe('the root entry', () => {
  it('exports every hook of the package', () => {
    expect(hooks.length).toBeGreaterThan(0)
    for (const hook of hooks) expect(root).toHaveProperty(hook)
  })

  it('serves each hook from its own file', () => {
    const files = import.meta.glob<Record<string, unknown>>(['./use*.ts', '!./*.test.ts'], {
      eager: true,
    })
    for (const hook of hooks) {
      expect(files[`./${hook}.ts`][hook]).toBe((root as Record<string, unknown>)[hook])
    }
  })
})
