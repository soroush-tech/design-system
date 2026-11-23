import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { libraries } from '../libraries'

const root = process.cwd()
const dist = join(root, 'dist')
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const [{ package: library }] = libraries

// A consumer gets one copy of the library: the umbrella's build must import it, never hold it.
describe('the built package', () => {
  const published = Object.entries(manifest.publishConfig.exports) as [
    string,
    Record<'import' | 'require', Record<'types' | 'default', string>>,
  ][]

  it.each(published)('%s ships its files', (_subpath, { import: esm, require: cjs }) => {
    for (const file of [esm.types, esm.default, cjs.types, cjs.default]) {
      expect(existsSync(join(root, file)), file).toBe(true)
    }
  })

  it('has one file per condition of each entry point, and nothing else', () => {
    expect(
      readdirSync(dist, { recursive: true, withFileTypes: true }).filter((f) => f.isFile())
    ).toHaveLength(published.length * 4)
  })

  it.each(published)(
    '%s imports the library and bundles none of it',
    (subpath, { import: esm, require: cjs }) => {
      const target = subpath === '.' ? library : `${library}${subpath.slice(1)}`
      for (const file of [esm.default, cjs.default, esm.types, cjs.types]) {
        const source = readFileSync(join(root, file), 'utf8')
        const specifiers = [...source.matchAll(/(?:from|require\()\s*["']([^"']+)["']/g)].map(
          (m) => m[1]
        )
        expect(specifiers, file).toEqual([target])
        expect(statSync(join(root, file)).size, file).toBeLessThan(1000)
      }
    }
  )
})
