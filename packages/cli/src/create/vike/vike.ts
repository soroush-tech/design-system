// The Vike starter: an isomorphic React app on the design system, prerendered at build time, then
// routed in the browser. Each file is written once, in TypeScript; `t(...)` holds what only
// TypeScript has, so the JavaScript app is the same file with the types taken out. The Vike wiring
// here is the one `init` reuses for an existing Vike app (#80).
import { devDependencies } from '../../../package.json'
import { createProvidersSource, createThemesSource } from '../../templates/templates'
import type { Rendering, Starter, StarterFacts, StarterFile } from '../starters'

/** The versions the starter installs: the ones this package is tested with. */
const VERSIONS = devDependencies

/** A version from this package's own manifest, as a range an app takes. */
const toRange = (version: string) => (/^\d/.test(version) ? `^${version}` : version)

const pickVersions = (names: readonly (keyof typeof VERSIONS)[]) =>
  Object.fromEntries(names.map((name) => [name, toRange(VERSIONS[name])]))

function createPackageJson({
  packageName,
  isTypeScript,
  rendering,
  version,
}: StarterFacts): string {
  // An SPA's server draws no page, so it extracts no styles.
  const renderer = rendering === 'spa' ? ([] as const) : (['@emotion/server'] as const)
  const packageJson = {
    name: packageName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      ...(isTypeScript ? { typecheck: 'tsc --noEmit' } : {}),
    },
    dependencies: {
      '@soroush.tech/design-system': toRange(version),
      ...pickVersions([...renderer, 'react', 'react-dom', 'vike']),
    },
    devDependencies: pickVersions([
      '@vitejs/plugin-react',
      'vite',
      ...(isTypeScript
        ? (['@types/react', '@types/react-dom', 'typescript'] as const)
        : ([] as const)),
    ]),
  }
  return `${JSON.stringify(packageJson, null, 2)}\n`
}

const VITE_CONFIG = `import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), vike()],
})
`

const TSCONFIG = `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "types": ["vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}
`

const GITIGNORE = `node_modules/
dist/
*.log
.DS_Store
`

const VIKE_TYPES = `// Types for what this app adds to Vike: each page's component, and the +Layout around it.
import type { ReactNode } from 'react'

type Layout = (props: { children: ReactNode }) => ReactNode

declare global {
  namespace Vike {
    interface PageContext {
      Page: () => ReactNode
    }
    interface Config {
      Layout?: Layout
    }
    interface ConfigResolved {
      Layout?: Layout
    }
  }
}

export {}
`

/** The layout's link to the sample data pages, when the app has them. */
const ITEMS_LINK = `          <Link href="/items" underline="hover">
            Items
          </Link>
`

/** The layout's light and dark switch, in a page that has JavaScript. */
const SCHEME_SWITCH = `          <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
            {otherScheme}
          </Button>
`

/** The settings of each rendering, in +config. */
const CONFIG_SETTINGS: Readonly<Record<Rendering, string>> = {
  isomorphic: `  // Isomorphic: every page is HTML at build time, then the app moves between pages in the
  // browser, with no reload.
  prerender: true,
  clientRouting: true,
  hydrationCanBeAborted: true,
  // +Layout is a setting of this app's own: the component every page renders inside.
  meta: {
    Layout: { env: { server: true, client: true } },
  },`,
  spa: `  // SPA: every page is an empty HTML shell from the build, which the browser renders; the app
  // moves between pages with no reload.
  prerender: true,
  clientRouting: true,
  // The page and +Layout, a setting of this app's own, load in the browser only.
  meta: {
    Page: { env: { server: false, client: true } },
    Layout: { env: { server: false, client: true } },
  },`,
  ssg: `  // SSG: every page is HTML at build time, with no JavaScript in the browser: a link loads the
  // next page.
  prerender: true,
  // The page and +Layout, a setting of this app's own, load at build time only.
  meta: {
    Page: { env: { server: true, client: false } },
    Layout: { env: { server: true, client: false } },
  },`,
}

/** What the second page says of how it got there. */
const ABOUT_TEXT: Readonly<Record<Rendering, string>> = {
  isomorphic: `A second page: it is HTML with its styles from the build, and the app moves to it without a
        reload.`,
  spa: `A second page: the browser renders it, with its styles, and the app moves to it without a
        reload.`,
  ssg: 'A second page: it is HTML with its styles from the build, and a link loads it as a new page.',
}

function createSources({ title, isTypeScript, rendering, scheme, hasSampleData }: StarterFacts) {
  const t = (typeScriptOnly: string) => (isTypeScript ? typeScriptOnly : '')
  const x = isTypeScript ? 'ts' : 'js'
  return {
    config: `${t("import type { Config } from 'vike/types'\n\n")}// The settings of every page: https://vike.dev/config
export default {
${CONFIG_SETTINGS[rendering]}
}${t(' satisfies Config')}
`,
    PageShell: `import { StrictMode } from 'react'
import { CacheProvider, styleCache } from '@soroush.tech/design-system/engine'
${t("import type { PageContext } from 'vike/types'\n")}import { PageContextProvider } from './usePageContext'

/**
 * The page inside its +Layout. The Emotion cache is the design system's, so the styles the page
 * uses are found where it is drawn, and every component of the page can read its pageContext.
 */
export function PageShell({ pageContext }${t(': { readonly pageContext: PageContext }')}) {
  const { Page, config } = pageContext
  const { Layout } = config
  return (
    <StrictMode>
      <CacheProvider value={styleCache}>
        <PageContextProvider pageContext={pageContext}>
          {Layout ? (
            <Layout>
              <Page />
            </Layout>
          ) : (
            <Page />
          )}
        </PageContextProvider>
      </CacheProvider>
    </StrictMode>
  )
}
`,
    spaOnRenderHtml: `import { escapeInject } from 'vike/server'
${t("import type { OnRenderHtmlSync } from 'vike/types'\n")}
/** The page's HTML shell, from the build: the browser renders the page in #root. */
export const onRenderHtml${t(': OnRenderHtmlSync')} = () => {
  return escapeInject\`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>\`
}
`,
    spaOnRenderClient: `import { createRoot${t(', type Root')} } from 'react-dom/client'
${t("import type { OnRenderClientSync } from 'vike/types'\n")}import { PageShell } from './PageShell'

let root${t(': Root | undefined')}

/** Draws the page in the browser, and each page the app moves to. */
export const onRenderClient${t(': OnRenderClientSync')} = (pageContext) => {
  root ??= createRoot(document.getElementById('root')${t('!')})
  root.render(<PageShell pageContext={pageContext} />)
}
`,
    onRenderHtml: `import createEmotionServer from '@emotion/server/create-instance'
import { renderToString } from 'react-dom/server'
import { styleCache } from '@soroush.tech/design-system/engine'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'
${t("import type { OnRenderHtmlSync } from 'vike/types'\n")}import { PageShell } from './PageShell'

/**
 * Renders the page to HTML - at build time, as the app is prerendered - with the styles it uses
 * in the head, so it is drawn styled before any script runs.
 */
export const onRenderHtml${t(': OnRenderHtmlSync')} = (pageContext) => {
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(styleCache)
  const html = renderToString(<PageShell pageContext={pageContext} />)
  const styles = constructStyleTagsFromChunks(extractCriticalToChunks(html))
  return escapeInject\`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    \${dangerouslySkipEscape(styles)}
  </head>
  <body>
    <div id="root">\${dangerouslySkipEscape(html)}</div>
  </body>
</html>\`
}
`,
    onRenderClient: `import { createRoot, hydrateRoot${t(', type Root')} } from 'react-dom/client'
${t("import type { OnRenderClientSync } from 'vike/types'\n")}import { PageShell } from './PageShell'

let root${t(': Root | undefined')}

/** Takes over the page the server drew, then draws each page the app moves to. */
export const onRenderClient${t(': OnRenderClientSync')} = (pageContext) => {
  const page = <PageShell pageContext={pageContext} />
  const container = document.getElementById('root')${t('!')}
  if (pageContext.isHydration) {
    root = hydrateRoot(container, page)
  } else {
    root ??= createRoot(container)
    root.render(page)
  }
}
`,
    Layout: `${
      rendering === 'ssg'
        ? `${t("import type { ReactNode } from 'react'\n")}import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in, inside the app's providers. A page has no JavaScript in the
 * browser, so it is drawn in the default scheme, which src/theme/Providers.${x} sets.
 */
export default function Layout({ children }${t(': { readonly children: ReactNode }')}) {
  return (
    <Providers>`
        : `import { useState${t(', type ReactNode')} } from 'react'
import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme it holds can switch the theme.
 */
export default function Layout({ children }${t(': { readonly children: ReactNode }')}) {
  const [scheme, setScheme] = useState${t("<'light' | 'dark'>")}('${scheme}')
  const otherScheme = scheme === 'light' ? 'dark' : 'light'
  return (
    <Providers scheme={scheme}>`
    }
      <Flex
        as="header"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        px={3}
        py={2}
        bg="paper"
      >
        <Typography variant="h6" as="span">
          ${title}
        </Typography>
        <Flex as="nav" flexDirection="row" alignItems="center" gap={2}>
          <Link href="/" underline="hover">
            Home
          </Link>
          <Link href="/about" underline="hover">
            About
          </Link>
${hasSampleData ? ITEMS_LINK : ''}${rendering === 'ssg' ? '' : SCHEME_SWITCH}        </Flex>
      </Flex>
      <View as="main" px={3} py={4}>
        {children}
      </View>
    </Providers>
  )
}
`,
    home: `import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'

export default function Page() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">${title}</Typography>
      <Typography color="secondary">
        A Vike app on the design system. Edit src/pages/index/+Page.${x}x, and make the themes your
        own in src/theme/themes.${x}.
      </Typography>
      <Flex flexDirection="row" gap={1}>
        <Button href="https://docs.soroush.tech">Components</Button>
        <Button href="https://vike.dev" variant="outlined">
          Vike
        </Button>
      </Flex>
    </Flex>
  )
}
`,
    about: `import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'

export default function Page() {
  return (
    <Flex gap={2}>
      <Typography variant="h2">About</Typography>
      <Typography color="secondary">
        ${ABOUT_TEXT[rendering]}
      </Typography>
    </Flex>
  )
}
`,
    usePageContext: `import { createContext, useContext${t(', type ReactNode')} } from 'react'
${t("import type { PageContext } from 'vike/types'\n")}
const Context = createContext${t('<PageContext | undefined>')}(undefined)

/** Gives every component of the page its pageContext: https://vike.dev/pageContext */
export function PageContextProvider({
  pageContext,
  children,
}${t(`: {
  readonly pageContext: PageContext
  readonly children: ReactNode
}`)}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

/** The pageContext of the page on screen: its URL, its route's parameters, its data. */
export function usePageContext() {
  const pageContext = useContext(Context)
  if (!pageContext) throw new Error('usePageContext runs only inside a page.')
  return pageContext
}

/** What the page's +data returned: https://vike.dev/data */
export function useData${t('<Data>')}() {
  return usePageContext().data${t(' as Data')}
}
`,
    error: `import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'

/** Shown for a page that does not exist, and when a page fails to render. */
export default function Page() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Page not found</Typography>
      <Typography color="secondary">This page does not exist, or it could not be shown.</Typography>
      <Link href="/">Back home</Link>
    </Flex>
  )
}
`,
  }
}

/**
 * The sample data pages: a list of items and a page for each, which read `src/data/items` in their
 * +data hooks, at build time.
 */
function createSampleDataFiles({ isTypeScript }: StarterFacts): StarterFile[] {
  const t = (typeScriptOnly: string) => (isTypeScript ? typeScriptOnly : '')
  const x = isTypeScript ? 'ts' : 'js'
  const dataType = t('\nexport type Data = ReturnType<typeof data>\n')
  const items = `${t(`/** One sample item. */
export interface Item {
  id: string
  title: string
  summary: string
  status: 'todo' | 'doing' | 'done'
}

`)}/**
 * Sample data, so the items pages have something to show: each page's +data reads it at build
 * time. Make the +data hooks fetch your own data instead, and remove this file.
 */
export const items${t(': readonly Item[]')} = [
  {
    id: 'theme',
    title: 'Make the theme your own',
    summary: 'Change the colors and fonts of both themes in src/theme/themes.${x}.',
    status: 'doing',
  },
  {
    id: 'fonts',
    title: 'Load the fonts',
    summary: 'The theme names Space Grotesk and JetBrains Mono, and does not load them.',
    status: 'todo',
  },
  {
    id: 'pages',
    title: 'Add a page',
    summary: 'A folder in src/pages with a +Page in it is a new route.',
    status: 'todo',
  },
  {
    id: 'data',
    title: 'Read your own data',
    summary: 'Each +data here reads this file. Make it fetch from your API, at build time.',
    status: 'todo',
  },
  {
    id: 'build',
    title: 'Build it',
    summary: 'The build prerenders every page, these items among them, to HTML with its styles.',
    status: 'done',
  },
  {
    id: 'deploy',
    title: 'Deploy it',
    summary: 'The build is static files in dist/client, which any static host serves.',
    status: 'todo',
  },
]
`
  const statusChip = `import { Chip } from '@soroush.tech/design-system/Chip'
${t("import type { Item } from '../../data/items'\n")}
const COLORS = { todo: 'default', doing: 'primary', done: 'success' }${t(' as const')}

/** An item's status, in its palette color. */
export function StatusChip({ status }${t(": { readonly status: Item['status'] }")}) {
  return <Chip label={status} size="sm" variant="outlined" color={COLORS[status]} />
}
`
  const listData = `import { items } from '../../data/items'

/**
 * The list page's data: what it shows of each item. It runs at build time, as the page is
 * prerendered. https://vike.dev/data
 */
export function data() {
  return items.map(({ id, title, status }) => ({ id, title, status }))
}
${dataType}`
  const listPage = `import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { useData } from '../usePageContext'
${t("import type { Data } from './+data'\n")}import { StatusChip } from './StatusChip'

export default function Page() {
  const items = useData${t('<Data>')}()
  return (
    <Flex gap={2}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        Sample data from src/data/items.${x}, which this page's +data reads at build time.
      </Typography>
      <Flex gap={1}>
        {items.map((item) => (
          <Flex key={item.id} flexDirection="row" alignItems="center" gap={2}>
            <Link href={\`/items/\${item.id}\`}>{item.title}</Link>
            <StatusChip status={item.status} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
`
  const itemData = `import { render } from 'vike/abort'
${t("import type { PageContextServer } from 'vike/types'\n")}import { items } from '../../../data/items'

/**
 * One item's data, by the id in the URL, or the 404 page for an id with no item. It runs at build
 * time, for each URL +onBeforePrerenderStart lists. https://vike.dev/data
 */
export function data(pageContext${t(': PageContextServer')}) {
  const item = items.find(({ id }) => id === pageContext.routeParams.id)
  if (!item) throw render(404)
  return item
}
${dataType}`
  const itemPrerender = `import { items } from '../../../data/items'

/** The URLs of this route the build prerenders: one per item. https://vike.dev/onBeforePrerenderStart */
export function onBeforePrerenderStart() {
  return items.map(({ id }) => \`/items/\${id}\`)
}
`
  const itemPage = `import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { useData } from '../../usePageContext'
import { StatusChip } from '../StatusChip'
${t("import type { Data } from './+data'\n")}
export default function Page() {
  const item = useData${t('<Data>')}()
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <Link href="/items">All items</Link>
    </Flex>
  )
}
`
  return [
    { path: `src/data/items.${x}`, content: items },
    { path: `src/pages/items/StatusChip.${x}x`, content: statusChip },
    { path: `src/pages/items/+data.${x}`, content: listData },
    { path: `src/pages/items/+Page.${x}x`, content: listPage },
    { path: `src/pages/items/@id/+data.${x}`, content: itemData },
    { path: `src/pages/items/@id/+onBeforePrerenderStart.${x}`, content: itemPrerender },
    { path: `src/pages/items/@id/+Page.${x}x`, content: itemPage },
  ]
}

/** How the README says each rendering works, and which files render the pages. */
const README_RENDERING: Readonly<Record<Rendering, { summary: string; renderers: string }>> = {
  isomorphic: {
    summary:
      'prerendered at build time with its styles in the HTML, then moving between pages with no reload.',
    renderers:
      '`+onRenderHtml` and `+onRenderClient` render the pages, with the styles each page uses in its HTML.',
  },
  spa: {
    summary:
      'a single-page app: each page is an HTML shell from the build, rendered in the browser, which moves between pages with no reload.',
    renderers:
      '`+onRenderHtml` writes the HTML shell of each page, and `+onRenderClient` renders the page in it.',
  },
  ssg: {
    summary:
      'every page prerendered to HTML at build time, with its styles, and no JavaScript in the browser.',
    renderers: '`+onRenderHtml` renders the pages to HTML, with the styles each page uses.',
  },
}

function createReadme({ title, isTypeScript, rendering, hasSampleData }: StarterFacts): string {
  const x = isTypeScript ? 'ts' : 'js'
  const { summary, renderers } = README_RENDERING[rendering]
  const sampleData = hasSampleData
    ? `- \`src/pages/items/\` lists the sample items of \`src/data/items.${x}\`, with a page for each.
  Their \`+data\` hooks read the data at build time: make them fetch your own.
`
    : ''
  return `# ${title}

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.tech):
${summary}

- \`npm run dev\` starts it, \`npm run build\` builds it, and \`npm run preview\` serves the build.
- \`src/pages/\` holds the pages: a folder per route, each with its \`+Page\`.
- \`src/pages/+Layout.${x}x\` is the frame every page renders in, inside the app's providers.
- \`src/theme/themes.${x}\` holds the light and the dark theme: make them your own.
- In \`src/pages/\`, ${renderers}
${sampleData}
Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
`
}

/** The files of the Vike app `facts` describe. */
function createFiles(facts: StarterFacts): StarterFile[] {
  const { isTypeScript, rendering, scheme } = facts
  const x = isTypeScript ? 'ts' : 'js'
  const sources = createSources(facts)
  const isSpa = rendering === 'spa'
  // An SSG page has no JavaScript in the browser, so it has nothing to render there.
  const onRenderClient =
    rendering === 'ssg' ? undefined : isSpa ? sources.spaOnRenderClient : sources.onRenderClient
  return [
    { path: 'package.json', content: createPackageJson(facts) },
    { path: `vite.config.${x}`, content: VITE_CONFIG },
    ...(isTypeScript ? [{ path: 'tsconfig.json', content: TSCONFIG }] : []),
    { path: '.gitignore', content: GITIGNORE },
    { path: 'README.md', content: createReadme(facts) },
    ...(isTypeScript ? [{ path: 'src/vike.d.ts', content: VIKE_TYPES }] : []),
    { path: `src/theme/themes.${x}`, content: createThemesSource({ isTypeScript }) },
    {
      path: `src/theme/Providers.${x}`,
      content: createProvidersSource({ isTypeScript, scheme, themesImport: './themes' }),
    },
    { path: `src/pages/+config.${x}`, content: sources.config },
    { path: `src/pages/PageShell.${x}x`, content: sources.PageShell },
    { path: `src/pages/usePageContext.${x}x`, content: sources.usePageContext },
    {
      path: `src/pages/+onRenderHtml.${x}x`,
      content: isSpa ? sources.spaOnRenderHtml : sources.onRenderHtml,
    },
    ...(onRenderClient
      ? [{ path: `src/pages/+onRenderClient.${x}x`, content: onRenderClient }]
      : []),
    { path: `src/pages/+Layout.${x}x`, content: sources.Layout },
    { path: `src/pages/index/+Page.${x}x`, content: sources.home },
    { path: `src/pages/about/+Page.${x}x`, content: sources.about },
    { path: `src/pages/_error/+Page.${x}x`, content: sources.error },
    ...(facts.hasSampleData ? createSampleDataFiles(facts) : []),
  ]
}

export const vikeStarter: Starter = { title: 'Vike', createFiles }
