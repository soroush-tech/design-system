// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { MARKER } from '../templates/templates'
import { VITE_ROOT } from '../testApp'
import { createInstallCommand, isPlanEmpty, planInit, type InitFacts } from './planInit'

function createFacts(
  overrides: Partial<InitFacts> = {},
  files: Record<string, string> = {}
): InitFacts {
  return {
    isTypeScript: true,
    hasSrcFolder: true,
    root: { path: 'src/main.tsx', source: VITE_ROOT },
    rootCandidates: ['src/main.tsx'],
    hasDesignSystem: false,
    needsParcelPackageExports: false,
    packageManager: { name: 'pnpm', isYarnBerry: false },
    version: '2.2.0',
    scheme: 'light',
    readFile: (path) => files[path],
    ...overrides,
  }
}

describe('planInit', () => {
  it('creates the theme and the providers, wraps the root, and installs the package', () => {
    const plan = planInit(createFacts())
    expect(plan.creates.map((file) => file.path)).toEqual([
      'src/theme/themes.ts',
      'src/theme/Providers.ts',
    ])
    // The app imports its own files with `.tsx`, so the new imports carry `.ts`.
    expect(plan.creates[1].content).toContain("import themes from './themes.ts'")
    expect(plan.edits).toEqual([
      expect.objectContaining({ path: 'src/main.tsx', before: VITE_ROOT }),
    ])
    expect(plan.edits[0].after).toContain("import { Providers } from './theme/Providers.ts'")
    expect(plan.install).toEqual({
      command: 'pnpm',
      args: ['add', '@soroush.tech/design-system@^2.2.0', '--ignore-scripts'],
      env: {},
    })
    expect(plan.skips).toEqual([])
    expect(plan.manual).toEqual([])
    expect(isPlanEmpty(plan)).toBe(false)
  })

  it('writes JavaScript files in a JavaScript app', () => {
    const plan = planInit(
      createFacts({
        isTypeScript: false,
        root: { path: 'src/index.js', source: 'root.render(<App />)' },
      })
    )
    expect(plan.creates.map((file) => file.path)).toEqual([
      'src/theme/themes.js',
      'src/theme/Providers.js',
    ])
    expect(plan.edits[0].after).toContain("import { Providers } from './theme/Providers'")
  })

  it('puts the theme folder next to the root in an app with no src folder', () => {
    const plan = planInit(
      createFacts({
        hasSrcFolder: false,
        root: { path: 'index.jsx', source: 'root.render(<App />)' },
      })
    )
    expect(plan.creates.map((file) => file.path)).toEqual(['theme/themes.ts', 'theme/Providers.ts'])
  })

  it('changes nothing on a second run: it finds its own files by their marker', () => {
    const wrapped = planInit(createFacts()).edits[0].after
    const plan = planInit(
      createFacts(
        { root: { path: 'src/main.tsx', source: wrapped }, hasDesignSystem: true },
        {
          'src/theme/themes.ts': `${MARKER} edited by the developer`,
          'src/theme/Providers.ts': `${MARKER}`,
        }
      )
    )
    expect(plan).toEqual({ creates: [], edits: [], skips: [], manual: [], install: undefined })
    expect(isPlanEmpty(plan)).toBe(true)
  })

  it('finds its import in double quotes too', () => {
    const source = `import { Providers } from "./theme/Providers.ts"\n${VITE_ROOT}`
    const plan = planInit(createFacts({ root: { path: 'src/main.tsx', source } }))
    expect(plan.edits).toEqual([])
  })

  it('never overwrites an existing theme, and does not build on one it did not write', () => {
    const plan = planInit(createFacts({}, { 'src/theme/themes.ts': 'export const light = {}' }))
    expect(plan.creates).toEqual([])
    expect(plan.edits).toEqual([])
    expect(plan.skips).toEqual([
      { path: 'src/theme/themes.ts', reason: 'exists, and init did not write it' },
      {
        path: 'src/theme/Providers.ts',
        reason: 'would read src/theme/themes.ts, which init did not write',
      },
    ])
    expect(plan.manual).toEqual([
      'Set up the theme by hand: https://docs.soroush.tech/design-system/getting-started/installation/',
    ])
    // The package is still installed.
    expect(plan.install).toBeDefined()
  })

  it('never overwrites existing providers', () => {
    const plan = planInit(createFacts({}, { 'src/theme/Providers.ts': 'export {}' }))
    expect(plan.creates.map((file) => file.path)).toEqual(['src/theme/themes.ts'])
    expect(plan.skips).toEqual([
      { path: 'src/theme/Providers.ts', reason: 'exists, and init did not write it' },
    ])
    expect(plan.edits).toEqual([])
  })

  it('leaves a root that is not the standard shape alone, and says what to add', () => {
    const plan = planInit(
      createFacts({ root: { path: 'src/main.tsx', source: 'root.render(app)' } })
    )
    expect(plan.edits).toEqual([])
    expect(plan.manual).toEqual([
      "src/main.tsx is not the standard shape, so init leaves it as it is. Add import { Providers } from './theme/Providers' to it, and wrap the tree it renders: render(<Providers><App /></Providers>).",
    ])
  })

  it('says what to add when it finds no root, or more than one', () => {
    const none = planInit(createFacts({ root: undefined, rootCandidates: [] }))
    expect(none.creates).toHaveLength(2)
    expect(none.manual[0]).toMatch(/^init found no file that calls createRoot/)
    expect(none.manual[0]).toContain('import { Providers } from src/theme/Providers.ts')
    const several = planInit(
      createFacts({ root: undefined, rootCandidates: ['src/a.tsx', 'src/b.tsx'] })
    )
    expect(several.manual[0]).toMatch(
      /^init found more than one root \(src\/a\.tsx, src\/b\.tsx\) and edits none\./
    )
  })
})

it('asks a Parcel app to read package exports, and edits no bundler config', () => {
  const plan = planInit(createFacts({ needsParcelPackageExports: true }))
  expect(plan.manual).toEqual([
    'Parcel finds @soroush.tech/design-system/theme and the other subpaths only once it reads package exports. Add to package.json: "@parcel/resolver-default": { "packageExports": true }',
  ])
  expect(plan.edits.map((edit) => edit.path)).toEqual(['src/main.tsx'])
})

describe('createInstallCommand', () => {
  it("uses the app's package manager and runs no scripts", () => {
    expect(createInstallCommand({ name: 'npm', isYarnBerry: false }, '2.2.0')).toEqual({
      command: 'npm',
      args: ['install', '@soroush.tech/design-system@^2.2.0', '--ignore-scripts'],
      env: {},
    })
    expect(createInstallCommand({ name: 'yarn', isYarnBerry: false }, '2.2.0').args).toEqual([
      'add',
      '@soroush.tech/design-system@^2.2.0',
      '--ignore-scripts',
    ])
    expect(createInstallCommand({ name: 'bun', isYarnBerry: false }, '2.2.0').command).toBe('bun')
  })

  it('turns scripts off for Yarn 2 and later through its setting, which takes no flag', () => {
    expect(createInstallCommand({ name: 'yarn', isYarnBerry: true }, '2.2.0')).toEqual({
      command: 'yarn',
      args: ['add', '@soroush.tech/design-system@^2.2.0'],
      env: { YARN_ENABLE_SCRIPTS: 'false' },
    })
  })

  it('pins a prerelease exactly', () => {
    expect(createInstallCommand({ name: 'npm', isYarnBerry: false }, '2.3.0-alpha.1').args[1]).toBe(
      '@soroush.tech/design-system@2.3.0-alpha.1'
    )
  })
})
