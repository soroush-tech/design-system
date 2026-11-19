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
  rendering: 'ssr',
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
  'src/theme/Island.tsx',
  'src/layouts/Layout.astro',
  'src/components/Header.tsx',
  'src/components/Home.tsx',
  'src/components/About.tsx',
  'src/components/NotFound.tsx',
  'src/pages/index.astro',
  'src/pages/about.astro',
  'src/pages/404.astro',
  'vitest.config.ts',
  'src/components/Home.test.tsx',
]

describe('the Astro starter', () => {
  it('offers the renderings it writes, and the libraries', () => {
    expect(astroStarter.renderings).toEqual(['ssr', 'ssg'])
    expect(astroStarter.hasLibraries).toBe(true)
  })

  // `pnpm test:types` typechecks the components and the theme of these apps; the smoke test runs
  // `astro check` on a whole app. After a template change, update them with `vitest run -u`.
  it.each([
    ['ssr', `${FIXTURE}-ssr`],
    ['ssg', `${FIXTURE}-ssg`],
  ] as const)('writes the %s TypeScript app its fixture holds', async (rendering, fixture) => {
    const files = createFiles({ rendering })
    for (const [path, content] of files) {
      await expect(content).toMatchFileSnapshot(`${fixture}/${path}`)
    }
    const islands =
      rendering === 'ssg'
        ? []
        : ['src/theme/scheme.ts', 'src/components/Counter.tsx', 'src/components/SchemeSwitch.tsx']
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
        test: 'vitest run',
      },
    })
    expect(packageJson.dependencies).toEqual({
      '@astrojs/node': devDependencies['@astrojs/node'],
      '@astrojs/react': devDependencies['@astrojs/react'],
      '@soroush.tech/design-system': '^2.3.0',
      astro: devDependencies.astro,
      react: devDependencies.react,
      'react-dom': devDependencies['react-dom'],
    })
    // Astro's type checker takes TypeScript 6 at most.
    expect(packageJson.devDependencies.typescript).toMatch(/^\^6\./)
    expect(packageJson.devDependencies['@astrojs/check']).toBe(devDependencies['@astrojs/check'])
    expect(packageJson.devDependencies.vitest).toBe(devDependencies.vitest)
  })

  it('writes a JavaScript app with no type in it', () => {
    for (const [rendering, libraries] of [
      ['ssr', ['tanstack-query', 'msw', 'jotai', 'react-hook-form']],
      ['ssr', ['swr', 'redux-toolkit']],
      ['ssr', ['msw', 'zustand', 'react-hook-form']],
      ['ssg', []],
    ] as const) {
      const files = createFiles({ isTypeScript: false, rendering, libraries })
      expect(files.has('tsconfig.json')).toBe(false)
      const packageJson = JSON.parse(files.get('package.json')!)
      expect(packageJson.devDependencies).not.toHaveProperty('typescript')
      expect(packageJson.devDependencies).toHaveProperty('vitest')
      expect(packageJson.scripts).not.toHaveProperty('typecheck')
      for (const [path, content] of files) {
        expect(path).not.toMatch(/\.tsx?$/)
        if (/\.(jsx?|astro)$/.test(path)) {
          // A declaration, not a JSX attribute such as type="email".
          expect(content, path).not.toMatch(
            /\b(interface|satisfies|readonly)\b|\btype [A-Z]|: string/
          )
        }
      }
      // A server reads the item asked for; a build lists the items it writes.
      if (rendering !== 'ssr') {
        expect(files.get('src/pages/items/[id].astro')).toContain(
          'export function getStaticPaths()'
        )
      }
    }
  })

  it('hydrates the islands, routes in the browser and keeps the styles, when SSR', () => {
    const files = createFiles()
    const layout = files.get('src/layouts/Layout.astro')!
    expect(layout).toContain("import { ClientRouter } from 'astro:transitions'")
    expect(layout).toContain('<ClientRouter />')
    expect(layout).toContain('<Header client:load transition:persist />')
    expect(layout).toContain("document.addEventListener('astro:before-swap'")
    expect(files.get('src/pages/index.astro')).toContain(
      '<Home client:load>\n    <Counter client:only="react" />\n  </Home>'
    )
    const header = files.get('src/components/Header.tsx')!
    expect(header).toContain('<AppBar\n      position="sticky"')
    expect(header).toContain('<SchemeSwitch scheme={scheme} onSchemeChange={setScheme} />')
    expect(files.get('src/components/SchemeSwitch.tsx')).toContain('aria-label="Toggle theme"')
    expect(files.get('src/theme/Island.tsx')).toContain('theme={themes[useScheme()]}')
  })

  it('renders each page on a Node server, on each request, when SSR', () => {
    const files = createFiles({ rendering: 'ssr' })
    const config = files.get('astro.config.mjs')!
    expect(config).toContain("import node from '@astrojs/node'")
    expect(config).toContain("output: 'server',\n  adapter: node({ mode: 'standalone' }),")
    const packageJson = JSON.parse(files.get('package.json')!)
    expect(packageJson.scripts.start).toBe('node dist/server/entry.mjs')
    expect(packageJson.dependencies['@astrojs/node']).toBe(devDependencies['@astrojs/node'])
    const item = files.get('src/pages/items/[id].astro')!
    expect(item).toContain('const item = items.find(({ id }) => id === Astro.params.id)')
    expect(item).toContain("if (!item) return Astro.rewrite('/404')")
    expect(item).not.toContain('getStaticPaths')
    expect(files.get('README.md')).toContain('`npm start` runs the server the build wrote')
    expect(files.get('README.md')).toContain("it fetches the next page's HTML from the server")
    expect(files.get('src/data/items.ts')).toContain('read it\n * on each request.')
    const ssg = JSON.parse(createFiles({ rendering: 'ssg' }).get('package.json')!)
    expect(ssg.scripts).not.toHaveProperty('start')
    expect(ssg.dependencies).not.toHaveProperty('@astrojs/node')
  })

  it('writes HTML with no script and no switch, when SSG', () => {
    const files = createFiles({ rendering: 'ssg', scheme: 'dark' })
    const layout = files.get('src/layouts/Layout.astro')!
    expect(layout).not.toMatch(/ClientRouter|client:|<script/)
    expect(files.has('src/theme/scheme.ts')).toBe(false)
    for (const [path, content] of files) {
      if (path.endsWith('.astro')) expect(content, path).not.toContain('client:load')
    }
    expect(files.get('src/components/Header.tsx')).not.toMatch(/SchemeSwitch|setScheme/)
    expect(files.has('src/components/SchemeSwitch.tsx')).toBe(false)
    expect(files.get('src/theme/Island.tsx')).toContain('theme={themes.dark}')
    expect(files.get('src/pages/index.astro')).toContain('  <Home />\n')
    expect(files.get('src/components/Home.test.tsx')).not.toContain('Count')
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

  // The libraries' fixtures: create-astro-libraries (SSR, sample data, TanStack Query, msw,
  // zustand, React Hook Form) and create-astro-more (SSR, sample data, SWR, Redux Toolkit).
  it.each([
    [
      `${FIXTURE}-libraries`,
      { libraries: ['tanstack-query', 'msw', 'zustand', 'react-hook-form'] },
    ],
    [`${FIXTURE}-more`, { rendering: 'ssr', libraries: ['swr', 'redux-toolkit'] }],
  ] as const)('writes the app %s holds', async (fixture, facts) => {
    for (const [path, content] of createFiles(facts)) {
      // The repository ignores .env files, so a fixture holds none: msw's .env is checked below.
      if (path === '.env') continue
      await expect(content).toMatchFileSnapshot(`${fixture}/${path}`)
    }
  })

  it('reads and sends through the data library, and greets from an island of its own', () => {
    const query = createFiles({ libraries: ['tanstack-query', 'react-hook-form'] })
    expect(query.get('src/pages/index.astro')).toContain('<Greeting client:only="react" />')
    expect(query.get('src/components/Greeting.tsx')).toContain("queryKey: ['greeting']")
    expect(query.get('src/theme/Island.tsx')).toContain(
      'const [queryClient] = useState(getQueryClient)'
    )
    expect(query.get('src/data/queryClient.ts')).toContain('browserClient ??= new QueryClient()')
    expect(query.get('src/components/ItemList.tsx')).toContain('initialData: initialItems,')
    expect(query.get('src/components/Form.tsx')).toContain(
      'useMutation({ mutationFn: sendMessage })'
    )
    expect(query.get('src/pages/form.astro')).toContain('<Form client:load />')
    expect(query.get('src/components/Header.tsx')).toContain('<Link href="/form"')
    const swr = createFiles({ libraries: ['swr'] })
    expect(swr.get('src/components/Greeting.tsx')).toContain("useSWR('greeting', fetchGreeting)")
    expect(swr.get('src/components/ItemDetails.tsx')).toContain('fallbackData: initialItem')
    expect(createFiles().has('src/components/Greeting.tsx')).toBe(false)
    expect(createFiles().get('src/pages/index.astro')).not.toContain('Greeting')
  })

  it('starts the mock API in the browser before the first request, and in the tests from Node', () => {
    const files = createFiles({ libraries: ['msw'] })
    expect(files.get('.env')).toContain('PUBLIC_MSW=true')
    expect(files.get('src/mocks/start.ts')).toContain("import.meta.env.PUBLIC_MSW !== 'true'")
    expect(files.get('src/data/api.ts')).toContain(
      "await mocks\n  const response = await fetch('/api/greeting')"
    )
    expect(files.get('astro.config.mjs')).toContain(
      "vite: { plugins: [msw({ mode: 'worker-only' })] },"
    )
    expect(files.get('vitest.config.ts')).toContain("setupFiles: ['./src/mocks/setupTests.ts']")
    expect(files.get('src/components/Home.test.tsx')).toContain(
      "findByText('Hello from the mock API')"
    )
    expect(files.get('src/mocks/server.ts')).toContain('setupServer(...handlers)')
    expect(createFiles().get('astro.config.mjs')).not.toContain('msw')
  })

  it('keeps the count in the state library picked, in an island of its own', () => {
    const counter = (libraries: StarterFacts['libraries']) =>
      createFiles({ libraries }).get('src/components/Counter.tsx')!
    expect(counter([])).toContain('const [count, setCount] = useState(0)')
    expect(counter(['zustand'])).toContain('const { count, increment } = useCounter()')
    expect(counter(['jotai'])).toContain('useAtom(countAtom)')
    expect(counter(['redux-toolkit'])).toContain('dispatch(incremented())')
    const redux = createFiles({ libraries: ['redux-toolkit'] })
    expect(redux.get('src/state/store.ts')).toContain('reducer: { count: countSlice.reducer }')
    expect(redux.get('src/theme/Island.tsx')).toContain('<StoreProvider store={store}>')
    // The scheme stays in src/theme/scheme, whose server snapshot keeps hydration on the HTML.
    expect(redux.get('src/components/Header.tsx')).toContain("from '../theme/scheme'")
    expect(createFiles({ libraries: ['zustand'] }).get('src/state/counter.ts')).toContain(
      'export const useCounter = create'
    )
  })

  it('names the app by its title', () => {
    const files = createFiles({ title: 'Shop' })
    expect(files.get('src/layouts/Layout.astro')).toContain('<title>Shop</title>')
    expect(files.get('src/components/Header.tsx')).toContain('        Shop\n')
    expect(files.get('README.md')!.startsWith('# Shop\n')).toBe(true)
  })
})
