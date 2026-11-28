// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import manifest from '../package.json'

// The hooks and the core are packages of their own, real dependencies of the library: its build
// imports them by the package name and holds no copy, in either format. The theme provider, the
// engine configuration and the style cache are this package's own, and each is defined once in the
// build, shared by every entry point: two copies would be two engine configurations.
const root = process.cwd()
const dist = join(root, 'dist')
const read = (extension: string) =>
  readdirSync(dist)
    .filter((file) => file.endsWith(extension))
    .map((file) => ({ file, source: readFileSync(join(dist, file), 'utf8') }))

// What each package owns: the names of its built entry points, read from the build the suite made.
const owned = async (folder: string, entries: string[]) => {
  const names = await Promise.all(
    entries.map(async (entry) =>
      Object.keys(
        await import(
          /* @vite-ignore */ pathToFileURL(join(root, '..', folder, 'dist', `${entry}.mjs`)).href
        )
      )
    )
  )
  return [...new Set(names.flat())].filter((name) => name !== 'default')
}

const hooks = ['useControlled', 'useEventCallback', 'useMergedRefs']

describe.each([['@gild-ui/hooks'], ['@gild-ui/core']])('%s in the built library', (name) => {
  it('is a dependency, not a peer or a dev dependency', () => {
    expect((manifest.dependencies as Record<string, string>)[name]).toBe('workspace:^')
    expect(manifest.peerDependencies).not.toHaveProperty(name)
    expect(manifest.devDependencies).not.toHaveProperty(name)
  })
})

describe('@gild-ui/hooks in the built library', () => {
  it.each([
    ['.mjs', (name: string) => `from "@gild-ui/hooks/${name}"`],
    ['.cjs', (name: string) => `require("@gild-ui/hooks/${name}")`],
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
          new RegExp(String.raw`function ${name}\b|const ${name} =`)
        )
      }
    }
  })
})

describe('the theme and the engine in the built library', () => {
  it.each(['.mjs', '.cjs'])('are defined once, in one file of the %s build', (extension) => {
    const all = read(extension)
    const defining = (pattern: RegExp) => all.filter(({ source }) => pattern.test(source)).length
    expect(defining(/function ThemeProvider\b/)).toBe(1)
    expect(defining(/function LayoutProvider\b/)).toBe(1)
    expect(defining(/hasStyleMemo/)).toBe(1)
    expect(defining(/key: ["']soroush["']/)).toBe(1)
  })

  it.each(['.mjs', '.cjs'])('hold no copy of the engine in the %s build', (extension) => {
    const engine =
      extension === '.mjs' ? 'from "@umber-style/react"' : 'require("@umber-style/react")'
    expect(read(extension).some(({ source }) => source.includes(engine))).toBe(true)
  })
})

// A bundler that wraps a module in a namespace object reads its names off it at run time, and the
// object lacks the names the module only re-exports with `export *` from a package. A previous move
// of the theme read `themeDefault` off such an object, and threw. Whatever a package owns is imported
// from it directly, never through a barrel of this library.
describe('names owned by an external package', () => {
  it.each(['.mjs', '.cjs'])(
    'are never read off a namespace object in %s files',
    async (extension) => {
      const names = [
        ...hooks,
        ...(await owned('core', ['theme', 'breakpoints', 'utils', 'catalog'])),
      ]
      const reads = new RegExp(String.raw`\b\w+_exports\.(${names.join('|')})\b`)
      for (const { file, source } of read(extension)) {
        expect(source.match(reads)?.[0], `${file} reads a name it does not own`).toBeUndefined()
      }
    },
    60_000
  )
})
