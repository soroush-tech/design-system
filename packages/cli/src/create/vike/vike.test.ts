// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { devDependencies } from '../../../package.json'
import { MARKER } from '../../templates/templates'
import type { StarterFacts } from '../starters'
import { vikeStarter } from './vike'

const FACTS: StarterFacts = {
  name: 'myApp',
  packageName: 'my-app',
  title: 'My App',
  isTypeScript: true,
  rendering: 'isomorphic',
  scheme: 'light',
  hasSampleData: true,
  version: '2.3.0',
}
const FIXTURE = '../../../type-tests/create-vike'

const createFiles = (facts: Partial<StarterFacts> = {}) =>
  new Map(vikeStarter.createFiles({ ...FACTS, ...facts }).map((file) => [file.path, file.content]))

const SAMPLE_DATA_PATHS = [
  'src/data/items.ts',
  'src/pages/items/StatusChip.tsx',
  'src/pages/items/+data.ts',
  'src/pages/items/+Page.tsx',
  'src/pages/items/@id/+data.ts',
  'src/pages/items/@id/+onBeforePrerenderStart.ts',
  'src/pages/items/@id/+Page.tsx',
]

const SHARED_PATHS = [
  'package.json',
  '.gitignore',
  'README.md',
  'src/theme/themes',
  'src/theme/Providers',
  'src/pages/+config',
  'src/pages/PageShell',
  'src/pages/usePageContext',
  'src/pages/+onRenderHtml',
  'src/pages/+onRenderClient',
  'src/pages/+Layout',
  'src/pages/index/+Page',
  'src/pages/about/+Page',
  'src/pages/_error/+Page',
]

describe('the Vike starter', () => {
  // `pnpm test:types` typechecks these files as the app's own tsconfig.json sets it; this keeps
  // them what create writes. After a template change, update them with `vitest run -u`.
  // One fixture per rendering: create-vike (isomorphic), create-vike-spa and create-vike-ssg.
  it.each([
    ['isomorphic', FIXTURE],
    ['spa', `${FIXTURE}-spa`],
    ['ssg', `${FIXTURE}-ssg`],
  ] as const)('writes the %s TypeScript app its fixture holds', async (rendering, fixture) => {
    const files = createFiles({ rendering })
    for (const [path, content] of files) {
      await expect(content).toMatchFileSnapshot(`${fixture}/${path}`)
    }
    const shared = SHARED_PATHS.filter(
      (path) => rendering !== 'ssg' || path !== 'src/pages/+onRenderClient'
    )
    expect([...files.keys()].sort()).toEqual(
      [
        ...shared.map((path) =>
          /\/(theme\/|\+config)/.test(path)
            ? `${path}.ts`
            : path.startsWith('src/')
              ? `${path}.tsx`
              : path
        ),
        'vite.config.ts',
        'tsconfig.json',
        'src/vike.d.ts',
        ...SAMPLE_DATA_PATHS,
      ].sort()
    )
  })

  it('renders an SPA in the browser only, from an empty shell', () => {
    const files = createFiles({ rendering: 'spa' })
    expect(files.get('src/pages/+config.ts')).toContain(
      'Page: { env: { server: false, client: true } }'
    )
    expect(files.get('src/pages/+onRenderHtml.tsx')).toContain('<div id="root"></div>')
    expect(files.get('src/pages/+onRenderHtml.tsx')).not.toContain('renderToString')
    expect(files.get('src/pages/+onRenderClient.tsx')).not.toContain('hydrateRoot')
    expect(files.get('src/pages/+Layout.tsx')).toContain('setScheme')
    const packageJson = JSON.parse(files.get('package.json')!)
    expect(packageJson.dependencies['@emotion/server']).toBeUndefined()
    expect(files.get('README.md')).toContain('a single-page app')
  })

  it('renders SSG pages to HTML only, with no client renderer and no scheme switch', () => {
    const files = createFiles({ rendering: 'ssg' })
    expect(files.get('src/pages/+config.ts')).toContain(
      'Page: { env: { server: true, client: false } }'
    )
    expect(files.get('src/pages/+config.ts')).not.toContain('clientRouting')
    expect(files.has('src/pages/+onRenderClient.tsx')).toBe(false)
    expect(files.get('src/pages/+Layout.tsx')).not.toMatch(/useState|Button|scheme=/)
    expect(files.get('src/pages/+Layout.tsx')).toContain('<Providers>')
    expect(files.get('src/pages/about/+Page.tsx')).toContain('a link loads it as a new')
    expect(JSON.parse(files.get('package.json')!).dependencies['@emotion/server']).toBeDefined()
    expect(
      createFiles({ rendering: 'ssg', isTypeScript: false }).get('src/pages/+Layout.jsx')
    ).toMatch(/^import \{ Flex \}/)
  })

  it('calls the app by its title in its pages and README, and by its package name in package.json', () => {
    const files = createFiles({ title: 'Shop & Co' })
    expect(files.get('src/pages/+onRenderHtml.tsx')).toContain('<title>Shop & Co</title>')
    expect(files.get('src/pages/+Layout.tsx')).toContain('          Shop & Co\n')
    expect(files.get('src/pages/index/+Page.tsx')).toContain(
      '<Typography variant="h2">Shop & Co</Typography>'
    )
    expect(files.get('README.md')!.startsWith('# Shop & Co\n')).toBe(true)
    expect([...files.values()].some((content) => content.includes('myApp'))).toBe(false)
  })

  it('writes the sample data pages, and links to them, only when asked to', () => {
    const files = createFiles({ hasSampleData: false })
    const paths = [...files.keys()]
    expect(paths.filter((path) => /items/.test(path))).toEqual([])
    expect(files.get('src/pages/+Layout.tsx')).not.toContain('/items')
    expect(files.get('README.md')).not.toContain('src/pages/items/')
    expect(createFiles().get('src/pages/+Layout.tsx')).toContain('<Link href="/items"')
    expect(createFiles().get('README.md')).toContain('src/pages/items/')
    expect(createFiles({ isTypeScript: false }).get('src/data/items.js')).toContain(
      'src/theme/themes.js'
    )
  })

  it('writes the same app in JavaScript, with no types', () => {
    const files = createFiles({ isTypeScript: false })
    const paths = [...files.keys()]
    expect(paths).toContain('vite.config.js')
    expect(paths).toContain('src/pages/+Layout.jsx')
    expect(paths).toContain('src/theme/themes.js')
    expect(paths.some((path) => /\.tsx?$|tsconfig/.test(path))).toBe(false)
    for (const rendering of ['isomorphic', 'spa', 'ssg'] as const) {
      for (const [path, content] of createFiles({ isTypeScript: false, rendering })) {
        if (!/\.jsx?$/.test(path)) continue
        expect(content, `${rendering} ${path}`).not.toMatch(
          /import type|export type|interface |as const|as Data|<Data>|: Root|satisfies|<'light'|readonly |\)!/
        )
      }
    }
    expect(files.get('src/pages/+onRenderClient.jsx')).toContain(
      "const container = document.getElementById('root')\n"
    )
    const packageJson = JSON.parse(files.get('package.json')!)
    expect(packageJson.scripts.typecheck).toBeUndefined()
    expect(packageJson.devDependencies.typescript).toBeUndefined()
  })

  it('installs the design system it was given, and the versions this package is tested with', () => {
    const packageJson = JSON.parse(createFiles().get('package.json')!)
    expect(packageJson.name).toBe('my-app')
    expect(packageJson.dependencies).toEqual({
      '@soroush.tech/design-system': '^2.3.0',
      '@emotion/server': devDependencies['@emotion/server'],
      react: devDependencies.react,
      'react-dom': devDependencies['react-dom'],
      vike: `^${devDependencies.vike}`,
    })
    expect(packageJson.devDependencies.vite).toBe(devDependencies.vite)
    expect(packageJson.scripts).toEqual({
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      typecheck: 'tsc --noEmit',
    })
    const prerelease = JSON.parse(createFiles({ version: '2.3.0-alpha.1' }).get('package.json')!)
    expect(prerelease.dependencies['@soroush.tech/design-system']).toBe('^2.3.0-alpha.1')
  })

  it('renders <Providers> in +Layout only, starting on the scheme it was given', () => {
    const files = createFiles({ scheme: 'dark' })
    const withProviders = [...files].filter(([, content]) => content.includes('<Providers'))
    expect(withProviders.map(([path]) => path)).toEqual(['src/pages/+Layout.tsx'])
    expect(files.get('src/pages/+Layout.tsx')).toContain("useState<'light' | 'dark'>('dark')")
    expect(files.get('src/theme/Providers.ts')).toContain("scheme = 'dark'")
    expect(files.get('src/theme/themes.ts')!.startsWith(MARKER)).toBe(true)
  })

  it('styles through tokens only: no raw color or size in a page', () => {
    for (const [path, content] of createFiles()) {
      if (!path.startsWith('src/pages/')) continue
      expect(content, path).not.toMatch(/#[\da-f]{3,8}\b|\d+(px|rem|em|vh|vw)\b|style=\{/i)
    }
  })
})
