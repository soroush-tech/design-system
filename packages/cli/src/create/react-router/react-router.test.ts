// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { devDependencies } from '../../../package.json'
import { MARKER } from '../../templates/templates'
import type { StarterFacts } from '../starters'
import { reactRouterStarter } from './react-router'

const FACTS: StarterFacts = {
  name: 'myApp',
  packageName: 'my-app',
  title: 'My App',
  isTypeScript: true,
  rendering: 'spa',
  libraries: [],
  scheme: 'light',
  hasSampleData: true,
  version: '2.3.0',
}
const FIXTURE = '../../../type-tests/create-react-router'

const createFiles = (facts: Partial<StarterFacts> = {}) =>
  new Map(
    reactRouterStarter.createFiles({ ...FACTS, ...facts }).map((file) => [file.path, file.content])
  )

const SAMPLE_DATA_PATHS = [
  'src/data/items.ts',
  'src/pages/items/StatusChip.tsx',
  'src/pages/items/Page.tsx',
  'src/pages/items/loader.ts',
  'src/pages/item/Page.tsx',
  'src/pages/item/loader.ts',
]

const PATHS = [
  'package.json',
  '.gitignore',
  'README.md',
  'index.html',
  'tsconfig.json',
  'vite.config.ts',
  'vitest.config.ts',
  'src/theme/themes.ts',
  'src/theme/Providers.ts',
  'src/main.tsx',
  'src/routes.tsx',
  'src/components/RouterLink.tsx',
  'src/components/Header.tsx',
  'src/components/SchemeSwitch.tsx',
  'src/pages/Layout.tsx',
  'src/pages/ErrorPage.tsx',
  'src/pages/index/Page.tsx',
  'src/pages/index/Counter.tsx',
  'src/pages/index/Page.test.tsx',
  'src/pages/about/Page.tsx',
]

describe('the React Router starter', () => {
  it('writes single-page apps, with the libraries', () => {
    expect(reactRouterStarter.renderings).toEqual(['spa'])
    expect(reactRouterStarter.hasLibraries).toBe(true)
  })

  // `pnpm test:types` typechecks these files as the app's own tsconfig.json sets it; this keeps
  // them what create writes. After a template change, update them with `vitest run -u`.
  it('writes the TypeScript app its fixture holds', async () => {
    const files = createFiles()
    for (const [path, content] of files) {
      await expect(content).toMatchFileSnapshot(`${FIXTURE}/${path}`)
    }
    expect([...files.keys()].sort()).toEqual([...PATHS, ...SAMPLE_DATA_PATHS].sort())
  })

  // The libraries' fixtures: create-react-router-libraries (TanStack Query, msw, zustand, React
  // Hook Form), create-react-router-more (SWR, Redux Toolkit, React Hook Form) and
  // create-react-router-jotai (Jotai, no sample data).
  it.each([
    [
      `${FIXTURE}-libraries`,
      { libraries: ['tanstack-query', 'msw', 'zustand', 'react-hook-form'] },
    ],
    [`${FIXTURE}-more`, { libraries: ['swr', 'redux-toolkit', 'react-hook-form'] }],
    [`${FIXTURE}-jotai`, { hasSampleData: false, libraries: ['jotai'] }],
  ] as const)('writes the app %s holds', async (fixture, facts) => {
    for (const [path, content] of createFiles(facts)) {
      // The repository ignores .env files, so a fixture holds none: msw's .env is checked below.
      if (path === '.env') continue
      await expect(content).toMatchFileSnapshot(`${fixture}/${path}`)
    }
  })

  it('installs React Router on Vite, the versions this package is tested with', () => {
    const packageJson = JSON.parse(createFiles().get('package.json')!)
    expect(packageJson).toMatchObject({ name: 'my-app', private: true, type: 'module' })
    expect(packageJson.scripts).toEqual({
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      typecheck: 'tsc --noEmit',
      test: 'vitest run',
    })
    expect(packageJson.dependencies).toEqual({
      '@soroush.tech/design-system': '^2.3.0',
      react: devDependencies.react,
      'react-dom': devDependencies['react-dom'],
      'react-router': devDependencies['react-router'],
    })
    expect(packageJson.devDependencies.vite).toBe(devDependencies.vite)
    expect(packageJson.devDependencies.vitest).toBe(devDependencies.vitest)
    const libraries = JSON.parse(
      createFiles({ libraries: ['tanstack-query', 'msw', 'zustand'] }).get('package.json')!
    )
    expect(libraries.dependencies['@tanstack/react-query']).toBe(
      devDependencies['@tanstack/react-query']
    )
    expect(libraries.dependencies.zustand).toBe(devDependencies.zustand)
    expect(libraries.devDependencies.msw).toBe(devDependencies.msw)
  })

  it('routes in the browser, every page in the Layout, with links that do not reload', () => {
    const files = createFiles()
    expect(files.get('index.html')).toContain('<script type="module" src="/src/main.tsx">')
    const main = files.get('src/main.tsx')!
    expect(main).toContain('const router = createBrowserRouter(routes)')
    expect(main).toContain('<RouterProvider router={router} />')
    const routes = files.get('src/routes.tsx')!
    expect(routes).toContain("path: '/',\n    element: <Layout />,")
    expect(routes).toContain("{ path: '*', element: <ErrorPage /> },")
    const layout = files.get('src/pages/Layout.tsx')!
    expect(layout).toContain('<Outlet />')
    expect(layout).toContain(
      '<Header>\n        <SchemeSwitch scheme={scheme} onSchemeChange={setScheme} />\n      </Header>'
    )
    const header = files.get('src/components/Header.tsx')!
    expect(header).toContain('<AppBar\n      position="sticky"')
    expect(header).toContain('<RouterLink to="/about" underline="hover">')
    expect(files.get('src/components/SchemeSwitch.tsx')).toContain('aria-label="Toggle theme"')
    expect(files.get('src/components/RouterLink.tsx')).toContain('useLinkClickHandler(to)')
  })

  it('reads the items with loaders, or through src/data/api with the data library', () => {
    const loaders = createFiles()
    expect(loaders.get('src/routes.tsx')).toContain(
      "{ path: 'items/:id', loader: itemLoader, element: <ItemPage /> },"
    )
    expect(loaders.get('src/pages/items/Page.tsx')).toContain(
      'const items = useLoaderData<typeof loader>()'
    )
    expect(loaders.get('src/pages/item/loader.ts')).toContain('throw data(')
    const query = createFiles({ libraries: ['tanstack-query'] })
    expect(query.has('src/pages/items/loader.ts')).toBe(false)
    expect(query.has('src/pages/item/loader.ts')).toBe(false)
    expect(query.get('src/routes.tsx')).toContain("{ path: 'items', element: <ItemsPage /> },")
    expect(query.get('src/pages/items/Page.tsx')).toContain(
      "useQuery({ queryKey: ['items'], queryFn: fetchItems })"
    )
    expect(query.get('src/pages/item/Page.tsx')).toContain('if (error) throw error')
    expect(query.get('src/pages/index/Greeting.tsx')).toContain("queryKey: ['greeting']")
    expect(query.get('src/pages/Layout.tsx')).toContain(
      '<QueryClientProvider client={queryClient}>'
    )
    const swr = createFiles({ libraries: ['swr'] })
    expect(swr.get('src/pages/item/Page.tsx')).toContain(
      "useSWR(['items', id], () => fetchItem(id))"
    )
    expect(createFiles().has('src/pages/index/Greeting.tsx')).toBe(false)
  })

  it('starts the mock API before the router, in the browser, and in the tests from Node', () => {
    const files = createFiles({ libraries: ['msw'] })
    expect(files.get('.env')).toContain('VITE_MSW=true')
    expect(files.get('src/main.tsx')).toContain(
      'await startMocks()\n\n/** The router: it shows the page the URL names'
    )
    expect(files.get('vite.config.ts')).toContain("msw({ mode: 'worker-only' })")
    expect(files.get('vitest.config.ts')).toContain("setupFiles: ['./src/mocks/setupTests.ts']")
    expect(files.get('src/pages/index/Page.test.tsx')).toContain(
      "findByText('Hello from the mock API')"
    )
    // The items come from the mock API only when a page asks it for them.
    expect(files.get('src/mocks/handlers.ts')).not.toContain('/api/items')
    expect(createFiles({ libraries: ['swr', 'msw'] }).get('src/mocks/handlers.ts')).toContain(
      "http.get('/api/items/:id'"
    )
    expect(createFiles().get('src/main.tsx')).not.toContain('startMocks')
  })

  it('keeps the count and the scheme in the state library picked', () => {
    const counter = (libraries: StarterFacts['libraries']) =>
      createFiles({ libraries }).get('src/pages/index/Counter.tsx')!
    expect(counter([])).toContain('const [count, setCount] = useState(0)')
    expect(counter(['zustand'])).toContain('const { count, increment } = useCounter()')
    expect(counter(['jotai'])).toContain('useAtom(countAtom)')
    expect(counter(['redux-toolkit'])).toContain('dispatch(incremented())')
    const redux = createFiles({ libraries: ['redux-toolkit'] })
    expect(redux.get('src/main.tsx')).toContain('<StoreProvider store={store}>')
    expect(redux.get('src/pages/Layout.tsx')).toContain(
      'const scheme = useSelector((state: RootState) => state.scheme)'
    )
    expect(createFiles().get('src/main.tsx')).not.toContain('StoreProvider')
  })

  it('adds the form page with React Hook Form, and links to it', () => {
    const files = createFiles({ libraries: ['react-hook-form'] })
    expect(files.get('src/pages/form/Page.tsx')).toContain('resolver: zodResolver(schema)')
    expect(files.get('src/routes.tsx')).toContain("{ path: 'form', element: <FormPage /> },")
    expect(files.get('src/components/Header.tsx')).toContain(
      '<RouterLink to="/form" underline="hover">'
    )
    expect(createFiles().get('src/routes.tsx')).not.toContain('form')
  })

  it('leaves the sample data pages out unless asked for', () => {
    const files = createFiles({ hasSampleData: false })
    for (const path of SAMPLE_DATA_PATHS) expect(files.has(path), path).toBe(false)
    expect(files.get('src/routes.tsx')).not.toContain('items')
    expect(files.get('src/pages/Layout.tsx')).not.toContain('/items')
    expect(files.get('README.md')).not.toContain('src/pages/items/')
  })

  it('writes a JavaScript app with no type in it', () => {
    for (const libraries of [
      [],
      ['tanstack-query', 'msw', 'zustand', 'react-hook-form'],
      ['swr', 'jotai'],
      ['redux-toolkit', 'msw'],
    ] as const) {
      const files = createFiles({ isTypeScript: false, libraries })
      expect(files.has('tsconfig.json')).toBe(false)
      expect(files.get('index.html')).toContain('src="/src/main.jsx"')
      const packageJson = JSON.parse(files.get('package.json')!)
      expect(packageJson.scripts).not.toHaveProperty('typecheck')
      expect(packageJson.devDependencies).not.toHaveProperty('typescript')
      for (const [path, content] of files) {
        expect(path).not.toMatch(/\.tsx?$/)
        if (/\.jsx?$/.test(path)) {
          // A declaration, not a JSX attribute such as type="email".
          expect(content, path).not.toMatch(
            /\b(interface|satisfies|readonly)\b|\btype [A-Z]|import type|<typeof|: string|\)!/
          )
        }
      }
    }
  })

  it("writes init's themes and Providers, which tools find by their marker", () => {
    const files = createFiles({ scheme: 'dark' })
    expect(files.get('src/theme/themes.ts')!.startsWith(MARKER)).toBe(true)
    expect(files.get('src/theme/Providers.ts')).toContain("scheme = 'dark'")
    expect(files.get('src/pages/Layout.tsx')).toContain("useState<'light' | 'dark'>('dark')")
  })
})
