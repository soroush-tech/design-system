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
  libraries: [],
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
  it('offers every rendering, and the libraries', () => {
    expect(vikeStarter.renderings).toEqual(['isomorphic', 'ssr', 'spa', 'ssg'])
    expect(vikeStarter.hasLibraries).toBe(true)
  })

  // `pnpm test:types` typechecks these files as the app's own tsconfig.json sets it; this keeps
  // them what create writes. After a template change, update them with `vitest run -u`.
  // One fixture per rendering: create-vike (isomorphic), create-vike-ssr, -spa and -ssg.
  it.each([
    ['isomorphic', FIXTURE],
    ['ssr', `${FIXTURE}-ssr`],
    ['spa', `${FIXTURE}-spa`],
    ['ssg', `${FIXTURE}-ssg`],
  ] as const)('writes the %s TypeScript app its fixture holds', async (rendering, fixture) => {
    const files = createFiles({ rendering })
    for (const [path, content] of files) {
      await expect(content).toMatchFileSnapshot(`${fixture}/${path}`)
    }
    // An SSG page renders nothing in the browser, and has no counter.
    const shared = [...SHARED_PATHS, 'src/pages/index/Counter'].filter(
      (path) =>
        rendering !== 'ssg' ||
        (path !== 'src/pages/+onRenderClient' && path !== 'src/pages/index/Counter')
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
        'vitest.config.ts',
        'src/pages/index/Page.test.tsx',
        'tsconfig.json',
        'src/vike.d.ts',
        // A server renders any item asked for: it has no list of them to prerender.
        ...SAMPLE_DATA_PATHS.filter(
          (path) => rendering !== 'ssr' || !path.endsWith('+onBeforePrerenderStart.ts')
        ),
      ].sort()
    )
  })

  it('renders each page on its own server, on each request, when SSR', () => {
    const files = createFiles({ rendering: 'ssr' })
    const config = files.get('src/pages/+config.ts')!
    expect(config).toContain('  server: true,\n  clientRouting: true,')
    expect(config).not.toContain('prerender')
    expect(JSON.parse(files.get('package.json')!).scripts.start).toBe('node dist/server/index.mjs')
    expect(files.get('src/pages/+onRenderHtml.tsx')).toContain('on the server, on each request')
    expect(files.get('src/pages/items/+data.ts')).toContain('on the server, on each request')
    expect(files.get('src/pages/items/@id/+data.ts')).toContain('server, on each request')
    expect(files.get('src/data/items.ts')).toContain('npm start runs the server the build wrote')
    expect(files.get('README.md')).toContain('`npm start` runs the server the build wrote')
    expect(files.get('README.md')).toContain('read the data on each request')
    // The others build static files, with no server to start.
    expect(JSON.parse(createFiles().get('package.json')!).scripts).not.toHaveProperty('start')
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

  // The libraries' fixtures: create-vike-libraries (isomorphic, sample data, TanStack Query, msw,
  // zustand) and create-vike-jotai (SPA, TanStack Query, Jotai).
  it.each([
    [
      `${FIXTURE}-libraries`,
      { libraries: ['tanstack-query', 'msw', 'zustand'] },
      ['src/state/scheme.ts', 'src/mocks/handlers.ts', 'src/data/api.ts', '.env'],
    ],
    [
      `${FIXTURE}-jotai`,
      { rendering: 'spa', hasSampleData: false, libraries: ['jotai', 'tanstack-query'] },
      ['src/state/scheme.ts'],
    ],
    [
      `${FIXTURE}-more`,
      { libraries: ['swr', 'msw', 'redux-toolkit', 'react-hook-form'] },
      [
        'src/state/store.ts',
        'src/data/api.ts',
        'src/pages/form/+Page.tsx',
        'vitest.config.ts',
        'src/pages/index/Page.test.tsx',
        // With msw, the tests' own mock API, from Node.
        'src/mocks/server.ts',
        'src/mocks/setupTests.ts',
      ],
    ],
  ] as const)('writes the app %s holds', async (fixture, facts, paths) => {
    const files = createFiles(facts)
    for (const [path, content] of files) {
      // The repository ignores .env files, so a fixture holds none: msw's .env is checked below.
      if (path === '.env') continue
      await expect(content).toMatchFileSnapshot(`${fixture}/${path}`)
    }
    for (const path of paths) expect(files.has(path), path).toBe(true)
  })

  it('fetches the sample items through SWR, starting on the build-time data', () => {
    const files = createFiles({ libraries: ['swr'], isTypeScript: false })
    expect(files.get('src/pages/items/+Page.jsx')).toContain("useSWR('items', fetchItems, {")
    expect(files.get('src/pages/items/@id/+Page.jsx')).toContain('{ fallbackData: initialItem }')
    expect(JSON.parse(files.get('package.json')!).dependencies.swr).toBe(devDependencies.swr)
  })

  it('provides the Redux store in PageShell, and keeps the scheme in a slice of it', () => {
    const files = createFiles({ libraries: ['redux-toolkit'] })
    const pageShell = files.get('src/pages/PageShell.tsx')!
    expect(pageShell).toContain("import { Provider as StoreProvider } from 'react-redux'")
    expect(pageShell).toContain(
      '        <StoreProvider store={store}>\n          <PageContextProvider'
    )
    expect(files.get('src/pages/+Layout.tsx')).toContain(
      "const setScheme = (next: 'light' | 'dark') => dispatch(schemeChanged(next))"
    )
    expect(
      createFiles({ libraries: ['redux-toolkit'], isTypeScript: false }).get('src/state/store.js')
    ).toContain('schemeChanged: (_scheme, action) => action.payload,')
  })

  it('adds a validated form page and its link, and a test every app runs', () => {
    const files = createFiles({ libraries: ['react-hook-form'], title: "Shop's" })
    expect(files.get('src/pages/+Layout.tsx')).toContain('<Link href="/form"')
    expect(files.get('src/pages/form/+Page.tsx')).toContain('resolver: zodResolver(schema),')
    expect(files.get('src/pages/index/Page.test.tsx')).toContain(
      String.raw`screen.getByRole('heading', { name: 'Shop\'s' })`
    )
    const packageJson = JSON.parse(files.get('package.json')!)
    expect(packageJson.scripts.test).toBe('vitest run')
    expect(packageJson.devDependencies.jsdom).toBe(devDependencies.jsdom)
    expect(packageJson.dependencies.zod).toBe(devDependencies.zod)
  })

  it('installs each library, msw only for development', () => {
    const packageJson = JSON.parse(
      createFiles({ libraries: ['tanstack-query', 'msw', 'jotai'] }).get('package.json')!
    )
    expect(packageJson.dependencies['@tanstack/react-query']).toBe(
      devDependencies['@tanstack/react-query']
    )
    expect(packageJson.dependencies.jotai).toBe(devDependencies.jotai)
    expect(packageJson.dependencies.zustand).toBeUndefined()
    expect(packageJson.dependencies.msw).toBeUndefined()
    expect(packageJson.devDependencies.msw).toBe(devDependencies.msw)
  })

  it('starts the mock API before the first page, in the browser, while VITE_MSW is true', () => {
    for (const rendering of ['isomorphic', 'spa'] as const) {
      const files = createFiles({ rendering, libraries: ['msw'] })
      const onRenderClient = files.get('src/pages/+onRenderClient.tsx')!
      expect(onRenderClient).toContain("import { startMocks } from '../mocks/start'")
      expect(onRenderClient).toContain('const mocks = startMocks()\n')
      expect(onRenderClient).toContain(
        'OnRenderClientAsync = async (pageContext) => {\n  await mocks\n'
      )
      expect(files.get('vite.config.ts')).toContain("msw({ mode: 'worker-only' })")
      expect(files.get('.env')).toContain('VITE_MSW=true')
    }
    expect(
      createFiles({ libraries: ['msw'], hasSampleData: false }).get('src/mocks/handlers.ts')
    ).toContain("http.get('/api/greeting'")
    expect(createFiles().get('vite.config.ts')).not.toContain('msw')
  })

  it('holds the scheme where the state library says, and the query client in +Layout', () => {
    const zustand = createFiles({ libraries: ['zustand'] }).get('src/pages/+Layout.tsx')!
    expect(zustand).toContain('const { scheme, setScheme } = useScheme()')
    expect(zustand).toMatch(/^import type \{ ReactNode \} from 'react'/)
    const jotai = createFiles({ libraries: ['jotai'], isTypeScript: false })
    expect(jotai.get('src/pages/+Layout.jsx')).toContain(
      'const [scheme, setScheme] = useAtom(schemeAtom)'
    )
    expect(jotai.get('src/state/scheme.js')).toContain("export const schemeAtom = atom('light')")
    const query = createFiles({ libraries: ['tanstack-query'] }).get('src/pages/+Layout.tsx')!
    expect(query).toContain('const [queryClient] = useState(() => new QueryClient())')
    expect(query).toContain('    <QueryClientProvider client={queryClient}>\n      <Providers')
  })

  it('reads the sample items through the query, from the mock API or from the items themselves', () => {
    const withMocks = createFiles({ libraries: ['tanstack-query', 'msw'] })
    expect(withMocks.get('src/data/api.ts')).toContain("await fetch('/api/items')")
    expect(withMocks.get('src/pages/items/+Page.tsx')).toContain('queryFn: fetchItems,')
    expect(withMocks.get('src/pages/items/@id/+Page.tsx')).toContain(
      'queryFn: () => fetchItem(initialItem.id),'
    )
    const withoutMocks = createFiles({ libraries: ['tanstack-query'], isTypeScript: false })
    expect(withoutMocks.get('src/data/api.js')).toContain('return Promise.resolve(items.map(')
    // With no sample items, the API still greets.
    const noItems = createFiles({ libraries: ['tanstack-query'], hasSampleData: false })
    expect(noItems.get('src/data/api.ts')).not.toContain('fetchItems')
    expect(noItems.get('src/data/api.ts')).toContain(
      'export function fetchGreeting(): Promise<Greeting>'
    )
    expect(createFiles({ libraries: ['zustand'] }).has('src/data/api.ts')).toBe(false)
  })

  it('counts on the home page, in its own state or in the state library picked', () => {
    const own = createFiles()
    expect(own.get('src/pages/index/+Page.tsx')).toContain("import { Counter } from './Counter'")
    expect(own.get('src/pages/index/+Page.tsx')).toContain('      <Counter />\n')
    expect(own.get('src/pages/index/Counter.tsx')).toContain(
      'const [count, setCount] = useState(0)'
    )
    expect(own.get('README.md')).toContain('counts the presses of its button, in its own state')

    const zustand = createFiles({ libraries: ['zustand'] })
    expect(zustand.get('src/pages/index/Counter.tsx')).toContain(
      'const { count, increment } = useCounter()'
    )
    expect(zustand.get('src/state/counter.ts')).toContain('export const useCounter = create')
    expect(zustand.get('README.md')).not.toContain('in its own state')

    const jotai = createFiles({ libraries: ['jotai'], isTypeScript: false })
    expect(jotai.get('src/pages/index/Counter.jsx')).toContain('useAtom(countAtom)')
    expect(jotai.get('src/state/counter.js')).toContain('export const countAtom = atom(0)')

    const redux = createFiles({ libraries: ['redux-toolkit'] })
    expect(redux.get('src/pages/index/Counter.tsx')).toContain('dispatch(incremented())')
    expect(redux.get('src/state/store.ts')).toContain('count: countSlice.reducer')
    expect(redux.has('src/state/counter.ts')).toBe(false)

    // An SSG page has no JavaScript in the browser to count with.
    const ssg = createFiles({ rendering: 'ssg' })
    expect(ssg.has('src/pages/index/Counter.tsx')).toBe(false)
    expect(ssg.get('src/pages/index/+Page.tsx')).not.toContain('Counter')
  })

  it('greets from the API through the data library picked, or fetch with msw alone', () => {
    const query = createFiles({ libraries: ['tanstack-query'] })
    expect(query.get('src/pages/index/+Page.tsx')).toContain('      <Greeting />\n')
    expect(query.get('src/pages/index/Greeting.tsx')).toContain(
      "useQuery({ queryKey: ['greeting'], queryFn: fetchGreeting })"
    )
    expect(query.get('src/data/api.ts')).toContain("message: 'Hello from src/data/api")
    expect(createFiles({ libraries: ['swr'] }).get('src/pages/index/Greeting.tsx')).toContain(
      "useSWR('greeting', fetchGreeting)"
    )
    const mocked = createFiles({ libraries: ['msw'], isTypeScript: false })
    expect(mocked.get('src/pages/index/Greeting.jsx')).toContain('fetchGreeting().then(setData')
    expect(mocked.get('src/data/api.js')).toContain("await fetch('/api/greeting')")
    expect(createFiles().has('src/pages/index/Greeting.tsx')).toBe(false)
    expect(createFiles().get('src/pages/index/+Page.tsx')).not.toContain('Greeting')
  })

  it('sends the form through the data library picked, the mock API, or nowhere', () => {
    const page = (libraries: StarterFacts['libraries'], isTypeScript = true) =>
      createFiles({ libraries: ['react-hook-form', ...libraries], isTypeScript }).get(
        `src/pages/form/+Page.${isTypeScript ? 'tsx' : 'jsx'}`
      )!
    expect(page(['tanstack-query'])).toContain('useMutation({ mutationFn: sendMessage })')
    expect(page(['swr'])).toContain('useSWRMutation(')
    expect(page(['swr'], false)).toContain('(_key, { arg }) => sendMessage(arg)')
    expect(page(['msw'])).toContain('setAnswer((await sendMessage(values)).message)')
    expect(page([])).toContain('handleSubmit(setSent)')
    expect(page([])).not.toContain('sendMessage')

    const api = createFiles({ libraries: ['react-hook-form', 'msw'] })
    expect(api.get('src/data/api.ts')).toContain("fetch('/api/messages', {")
    expect(api.get('src/mocks/handlers.ts')).toContain(
      "http.post<never, { name: string }>('/api/messages'"
    )
    expect(
      createFiles({ libraries: ['react-hook-form', 'swr'], isTypeScript: false }).get(
        'src/data/api.js'
      )
    ).toContain('your message was sent.')
  })

  it("tests the home page inside the app's providers", () => {
    const test = (libraries: StarterFacts['libraries']) =>
      createFiles({ libraries }).get('src/pages/index/Page.test.tsx')!
    expect(test([])).toContain("fireEvent.click(screen.getByRole('button', { name: 'Count' }))")
    expect(test([])).not.toMatch(/QueryClientProvider|StoreProvider/)
    expect(test(['tanstack-query'])).toContain('<QueryClientProvider client={new QueryClient()}>')
    expect(test(['redux-toolkit'])).toContain('<StoreProvider store={store}>')
    // An SSG page has no counter to press.
    const ssg = createFiles({ rendering: 'ssg' }).get('src/pages/index/Page.test.tsx')!
    expect(ssg).not.toContain('Count')
    expect(ssg).toContain("import { cleanup, render, screen } from '@testing-library/react'")
    expect(JSON.parse(createFiles({ rendering: 'ssg' }).get('package.json')!).scripts.test).toBe(
      'vitest run'
    )
  })

  it("answers the tests' requests from msw's Node server, with msw", () => {
    const files = createFiles({ libraries: ['msw'] })
    expect(files.get('src/mocks/server.ts')).toContain(
      'export const server = setupServer(...handlers)'
    )
    expect(files.get('src/mocks/setupTests.ts')).toContain(
      "beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))"
    )
    expect(files.get('vitest.config.ts')).toContain("setupFiles: ['./src/mocks/setupTests.ts']")
    expect(files.get('src/pages/index/Page.test.tsx')).toContain(
      "await screen.findByText('Hello from the mock API')"
    )
    // Without msw, the tests have no mock API.
    const plain = createFiles()
    expect(plain.has('src/mocks/server.ts')).toBe(false)
    expect(plain.get('vitest.config.ts')).not.toContain('setupFiles')
    expect(plain.get('src/pages/index/Page.test.tsx')).not.toContain('mock API')
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
    // Every library's files too: the two sets hold each one, with no two of one group.
    const librarySets = [
      [],
      ['tanstack-query', 'msw', 'zustand', 'react-hook-form'],
      ['swr', 'jotai'],
      ['redux-toolkit'],
    ] as const
    for (const [rendering, libraries] of [
      ...(['isomorphic', 'spa', 'ssg'] as const).map((value) => [value, []] as const),
      ...librarySets.map((set) => ['isomorphic', set] as const),
    ]) {
      for (const [path, content] of createFiles({ isTypeScript: false, rendering, libraries })) {
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
      test: 'vitest run',
    })
    expect(packageJson.devDependencies.vitest).toBe(devDependencies.vitest)
    const prerelease = JSON.parse(createFiles({ version: '2.3.0-alpha.1' }).get('package.json')!)
    expect(prerelease.dependencies['@soroush.tech/design-system']).toBe('^2.3.0-alpha.1')
  })

  it('renders <Providers> in +Layout only, starting on the scheme it was given', () => {
    const files = createFiles({ scheme: 'dark' })
    // The app's own code; its test renders the page inside them, as the app does.
    const withProviders = [...files].filter(
      ([path, content]) => content.includes('<Providers') && !path.includes('.test.')
    )
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
