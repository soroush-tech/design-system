// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, it } from 'vitest'
import manifest from '../package.json'

// The hooks, the core and the theme are packages of their own, real dependencies of the library: its
// build imports them by the package name and holds no copy, in either format. Two copies of the theme
// would be two React contexts and two engine configurations.
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

describe.each([
  ['@soroush.design/react-hooks'],
  ['@soroush.design/react-theme'],
  ['@soroush.design/core'],
])('%s in the built library', (name) => {
  it('is a dependency, not a peer or a dev dependency', () => {
    expect((manifest.dependencies as Record<string, string>)[name]).toBe('workspace:^')
    expect(manifest.peerDependencies).not.toHaveProperty(name)
    expect(manifest.devDependencies).not.toHaveProperty(name)
  })
})

describe('@soroush.design/react-hooks in the built library', () => {
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
          new RegExp(String.raw`function ${name}\b|const ${name} =`)
        )
      }
    }
  })
})

describe('@soroush.design/react-theme in the built library', () => {
  it.each([
    ['.mjs', (entry: string) => `from "@soroush.design/react-theme${entry}"`],
    ['.cjs', (entry: string) => `require("@soroush.design/react-theme${entry}")`],
  ])('imports its entry points by the package name in %s files', (extension, specifier) => {
    const all = read(extension)
    for (const entry of ['', '/theme', '/style', '/engine']) {
      expect(
        all.some(({ source }) => source.includes(specifier(entry))),
        entry
      ).toBe(true)
    }
  })

  it.each(['.mjs', '.cjs'])(
    'holds no provider, engine configuration or cache in %s files',
    (extension) => {
      for (const { file, source } of read(extension)) {
        expect(source, `${file} defines the theme provider`).not.toMatch(
          /function (ThemeProvider|LayoutProvider|useTheme|useDefaultProps)\b/
        )
        expect(source, `${file} configures the engine`).not.toMatch(/hasValueRepair|configure\(/)
        expect(source, `${file} makes the style cache`).not.toMatch(
          /createCache\(|key: ["']soroush["']/
        )
      }
    }
  )

  it.each(['theme', 'style', 'engine'])(
    '%s holds a re-export of the theme and no code',
    (entry) => {
      const source = readFileSync(join(dist, `${entry}.mjs`), 'utf8')
      expect(source).toContain(`export * from "@soroush.design/react-theme/${entry}"`)
      expect(
        source.split('\n').filter((line) => line.startsWith('import')).length
      ).toBeLessThanOrEqual(1)
    }
  )
})

// A bundler that wraps a module in a namespace object reads its names off it at run time, and the
// object lacks the names the module only re-exports with `export *` from a package. A previous move
// of the theme read `themeDefault` off such an object, and threw. Whatever a package owns is imported
// from it directly, never through a barrel of this library.
describe('names owned by an external package', () => {
  it.each(['.mjs', '.cjs'])(
    'are never read off a namespace object in %s files',
    async (extension) => {
      // The library's own barrel star-exports the style-prop package, so a name both packages
      // hold (`space`) is read off that barrel legitimately.
      const styleProps = new Set(await owned('styled-system', ['index']))
      const names = [
        ...hooks,
        ...(await owned('core', ['theme', 'breakpoints', 'utils', 'catalog'])),
        ...(await owned('react-theme', ['index', 'theme', 'style', 'engine'])),
      ].filter((name) => !styleProps.has(name))
      const reads = new RegExp(String.raw`\b\w+_exports\.(${names.join('|')})\b`)
      for (const { file, source } of read(extension)) {
        expect(source.match(reads)?.[0], `${file} reads a name it does not own`).toBeUndefined()
      }
    },
    60_000
  )
})
