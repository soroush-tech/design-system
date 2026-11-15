// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { devDependencies } from '../../../package.json'
import { MARKER } from '../../templates/templates'
import type { StarterFacts } from '../starters'
import { astroStarter } from './astro'

const FACTS: StarterFacts = {
  name: 'myApp',
  packageName: 'my-app',
  title: 'My App',
  isTypeScript: true,
  rendering: 'isomorphic',
  libraries: [],
  scheme: 'light',
  hasSampleData: true,
  version: '2.3.0',
}
const FIXTURE = '../../../type-tests/create-astro'

const createFiles = (facts: Partial<StarterFacts> = {}) =>
  new Map(astroStarter.createFiles({ ...FACTS, ...facts }).map((file) => [file.path, file.content]))

const SAMPLE_DATA_PATHS = [
  'src/data/items.ts',
  'src/components/StatusChip.tsx',
  'src/components/ItemList.tsx',
  'src/components/ItemDetails.tsx',
  'src/pages/items/index.astro',
  'src/pages/items/[id].astro',
]

const PATHS = [
  'package.json',
  'astro.config.mjs',
  'tsconfig.json',
  '.gitignore',
  'README.md',
  'src/theme/themes.ts',
  'src/theme/Providers.ts',
  'src/theme/Theme.tsx',
  'src/layouts/Layout.astro',
  'src/components/Header.tsx',
  'src/components/Home.tsx',
  'src/components/About.tsx',
  'src/components/NotFound.tsx',
  'src/pages/index.astro',
  'src/pages/about.astro',
  'src/pages/404.astro',
]

describe('the Astro starter', () => {
  it('offers the renderings it writes, and no library yet', () => {
    expect(astroStarter.renderings).toEqual(['isomorphic', 'ssg'])
    expect(astroStarter.hasLibraries).toBe(false)
  })

  // `pnpm test:types` typechecks the components and the theme of these apps; the smoke test runs
  // `astro check` on a whole app. After a template change, update them with `vitest run -u`.
  it.each([
    ['isomorphic', FIXTURE],
    ['ssg', `${FIXTURE}-ssg`],
  ] as const)('writes the %s TypeScript app its fixture holds', async (rendering, fixture) => {
    const files = createFiles({ rendering })
    for (const [path, content] of files) {
      await expect(content).toMatchFileSnapshot(`${fixture}/${path}`)
    }
    const islands =
      rendering === 'isomorphic' ? ['src/theme/scheme.ts', 'src/components/Counter.tsx'] : []
    expect([...files.keys()].sort()).toEqual([...PATHS, ...islands, ...SAMPLE_DATA_PATHS].sort())
  })

  it('installs Astro with React, the versions this package is tested with', () => {
    const packageJson = JSON.parse(createFiles().get('package.json')!)
    expect(packageJson).toMatchObject({
      name: 'my-app',
      private: true,
      type: 'module',
      scripts: {
        dev: 'astro dev',
        build: 'astro build',
        preview: 'astro preview',
        typecheck: 'astro check',
      },
    })
    expect(packageJson.dependencies).toEqual({
      '@astrojs/react': devDependencies['@astrojs/react'],
      '@soroush.tech/design-system': '^2.3.0',
      astro: devDependencies.astro,
      react: devDependencies.react,
      'react-dom': devDependencies['react-dom'],
    })
    // Astro's type checker takes TypeScript 6 at most.
    expect(packageJson.devDependencies.typescript).toMatch(/^\^6\./)
    expect(packageJson.devDependencies['@astrojs/check']).toBe(devDependencies['@astrojs/check'])
  })

  it('writes a JavaScript app with no type in it', () => {
    for (const rendering of ['isomorphic', 'ssg'] as const) {
      const files = createFiles({ isTypeScript: false, rendering })
      expect(files.has('tsconfig.json')).toBe(false)
      const packageJson = JSON.parse(files.get('package.json')!)
      expect(packageJson).not.toHaveProperty('devDependencies')
      expect(packageJson.scripts).not.toHaveProperty('typecheck')
      for (const [path, content] of files) {
        expect(path).not.toMatch(/\.tsx?$/)
        if (/\.(jsx?|astro)$/.test(path)) {
          expect(content, path).not.toMatch(/\b(interface|type|satisfies|readonly)\b|: string/)
        }
      }
      expect(files.get('src/pages/items/[id].astro')).toContain('export function getStaticPaths()')
    }
  })

  it('hydrates the islands, routes in the browser and keeps the styles, when isomorphic', () => {
    const files = createFiles()
    const layout = files.get('src/layouts/Layout.astro')!
    expect(layout).toContain("import { ClientRouter } from 'astro:transitions'")
    expect(layout).toContain('<ClientRouter />')
    expect(layout).toContain('<Header client:load transition:persist />')
    expect(layout).toContain("document.addEventListener('astro:before-swap'")
    expect(files.get('src/pages/index.astro')).toContain('<Home client:load />')
    expect(files.get('src/components/Header.tsx')).toContain(
      'onClick={() => setScheme(otherScheme)}'
    )
    expect(files.get('src/theme/Theme.tsx')).toContain('theme={themes[useScheme()]}')
  })

  it('writes HTML with no script and no switch, when SSG', () => {
    const files = createFiles({ rendering: 'ssg', scheme: 'dark' })
    const layout = files.get('src/layouts/Layout.astro')!
    expect(layout).not.toMatch(/ClientRouter|client:|<script/)
    expect(files.has('src/theme/scheme.ts')).toBe(false)
    for (const [path, content] of files) {
      if (path.endsWith('.astro')) expect(content, path).not.toContain('client:load')
    }
    expect(files.get('src/components/Header.tsx')).not.toMatch(/Button|setScheme/)
    expect(files.get('src/theme/Theme.tsx')).toContain('theme={themes.dark}')
    expect(files.get('README.md')).toContain('no JavaScript in the browser')
  })

  it('leaves the sample data pages out unless asked for', () => {
    const files = createFiles({ hasSampleData: false })
    for (const path of SAMPLE_DATA_PATHS) expect(files.has(path), path).toBe(false)
    expect(files.get('src/components/Header.tsx')).not.toContain('/items')
    expect(files.get('README.md')).not.toContain('src/pages/items/')
  })

  it("writes init's themes and Providers, which tools find by their marker", () => {
    const files = createFiles({ scheme: 'dark' })
    expect(files.get('src/theme/themes.ts')!.startsWith(MARKER)).toBe(true)
    expect(files.get('src/theme/Providers.ts')).toContain("scheme = 'dark'")
    expect(files.get('src/theme/scheme.ts')).toContain("let current: Scheme = 'dark'")
  })

  it('names the app by its title', () => {
    const files = createFiles({ title: 'Shop' })
    expect(files.get('src/layouts/Layout.astro')).toContain('<title>Shop</title>')
    expect(files.get('src/components/Header.tsx')).toContain('          Shop\n')
    expect(files.get('README.md')!.startsWith('# Shop\n')).toBe(true)
  })
})
