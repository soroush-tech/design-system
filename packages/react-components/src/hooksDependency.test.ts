// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import manifest from '../package.json'

// The hooks are a package of their own, a real dependency of the library: its build imports them by
// the package name and holds no copy, in either format.
const dist = join(process.cwd(), 'dist')
const hooks = ['useControlled', 'useEventCallback', 'useMergedRefs']
const read = (extension: string) =>
  readdirSync(dist)
    .filter((file) => file.endsWith(extension))
    .map((file) => ({ file, source: readFileSync(join(dist, file), 'utf8') }))

describe('@soroush.design/react-hooks in the built library', () => {
  it('is a dependency, not a peer or a dev dependency', () => {
    expect(manifest.dependencies['@soroush.design/react-hooks']).toBe('workspace:^')
  })

  it.each([
    ['.mjs', (name: string) => `from "@soroush.design/react-hooks/${name}"`],
    ['.cjs', (name: string) => `require("@soroush.design/react-hooks/${name}")`],
  ])('imports each hook by the package name in %s files', (extension, specifier) => {
    const all = read(extension)
    for (const name of hooks) {
      expect(all.some(({ source }) => source.includes(specifier(name)))).toBe(true)
    }
  })

  it.each(['.mjs', '.cjs'])('holds no copy of a hook in %s files', (extension) => {
    for (const { file, source } of read(extension)) {
      for (const name of hooks) {
        expect(source, `${file} defines ${name}`).not.toMatch(
          new RegExp(`function ${name}\\b|const ${name} =`)
        )
        // A bundler that wraps a module in a namespace object reads its names off it at run time.
        expect(source, `${file} reads ${name} off a namespace`).not.toMatch(
          new RegExp(`_exports\\.${name}\\b`)
        )
      }
    }
  })
})
