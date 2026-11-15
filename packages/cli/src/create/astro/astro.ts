// The Astro starter: HTML pages built at build time, whose parts are React islands drawn with the
// design system. Astro renders each island as a React root of its own, on the server with plain
// react-dom/server, so the design system needs no 'use client' here, and an island's styles are in
// its HTML. Each file is written once, in TypeScript; `t(...)` holds what only TypeScript has.
import { createProvidersSource, createThemesSource } from '../../templates/templates'
import { createCounterSource } from '../recipes'
import type { Starter, StarterFacts, StarterFile } from '../starters'
import { pickVersions, toRange, VERSIONS } from '../versions'

// Astro's type checker (`astro check`) takes TypeScript 6 at most: this package keeps that
// version under an alias.
const TYPESCRIPT_RANGE = VERSIONS['typescript-astro'].replace('npm:typescript@', '')

function createPackageJson({ packageName, isTypeScript, version }: StarterFacts): string {
  const packageJson = {
    name: packageName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'astro dev',
      build: 'astro build',
      preview: 'astro preview',
      ...(isTypeScript ? { typecheck: 'astro check' } : {}),
    },
    dependencies: {
      '@soroush.tech/design-system': toRange(version),
      ...pickVersions(['@astrojs/react', 'astro', 'react', 'react-dom']),
    },
    ...(isTypeScript
      ? {
          devDependencies: {
            ...pickVersions(['@astrojs/check', '@types/react', '@types/react-dom']),
            typescript: TYPESCRIPT_RANGE,
          },
        }
      : {}),
  }
  return `${JSON.stringify(packageJson, null, 2)}\n`
}

const ASTRO_CONFIG = `import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// The settings of the app: https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [react()],
})
`

const TSCONFIG = `{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
`

const GITIGNORE = `node_modules/
dist/
.astro/
*.log
.DS_Store
`

/**
 * The layout's script for Astro's client router, which replaces the head on each move between
 * pages, and with it the styles Emotion keeps there.
 */
const KEEP_STYLES_SCRIPT = `    <script>
      // Astro's client router replaces the head on each move between pages, and with it the
      // styles the design system keeps there. Each of them gets an id the router keeps. The next
      // page's own styles, which its HTML holds next to each island, move into its head, where
      // the islands expect them as they hydrate - but not its base styles: the header, which
      // the router keeps, draws those in the scheme picked.
      document.addEventListener('astro:before-swap', ({ newDocument }) => {
        const kept = new Set()
        document.head.querySelectorAll('style[data-emotion]').forEach((style, index) => {
          const id = \`soroush-styles-\${index}\`
          style.setAttribute('data-astro-transition-persist', id)
          const placeholder = newDocument.createElement('style')
          placeholder.setAttribute('data-astro-transition-persist', id)
          newDocument.head.append(placeholder)
          kept.add(style.getAttribute('data-emotion'))
        })
        newDocument.body.querySelectorAll('style[data-emotion]').forEach((style) => {
          const name = style.getAttribute('data-emotion') ?? ''
          if (kept.has(name) || name.includes('-global')) style.remove()
          else newDocument.head.append(style)
        })
      })
    </script>
`

function createLayout({ title, rendering }: StarterFacts): string {
  const isIsomorphic = rendering === 'isomorphic'
  return `---
${isIsomorphic ? "import { ClientRouter } from 'astro:transitions'\n" : ''}import Header from '../components/Header'
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
${isIsomorphic ? '    <ClientRouter />\n' : ''}  </head>
  <body>
    <Header${isIsomorphic ? ' client:load transition:persist' : ''} />
    <main>
      <slot />
    </main>
${isIsomorphic ? KEEP_STYLES_SCRIPT : ''}  </body>
</html>
`
}

/** A page of `src/pages`, which renders `component` from `src/components` in the layout. */
function createPage(
  { rendering }: StarterFacts,
  component: string,
  depth: number,
  frontmatter = '',
  props = ''
): string {
  const up = '../'.repeat(depth)
  const directive = rendering === 'isomorphic' ? ' client:load' : ''
  return `---
import ${component} from '${up}components/${component}'
import Layout from '${up}layouts/Layout.astro'
${frontmatter}---

<Layout>
  <${component}${props}${directive} />
</Layout>
`
}

/** What the second page says of how it got there. */
const ABOUT_TEXT = {
  isomorphic: `A second page: it is HTML with its styles from the build, and the app moves to it without
          a reload.`,
  ssg: `A second page: it is HTML with its styles from the build, and a link loads it as a new
          page.`,
}

function createSources(facts: StarterFacts) {
  const { title, isTypeScript, rendering, scheme, hasSampleData } = facts
  const t = (typeScriptOnly: string) => (isTypeScript ? typeScriptOnly : '')
  const x = isTypeScript ? 'ts' : 'js'
  const isIsomorphic = rendering === 'isomorphic'
  const itemsLink = hasSampleData
    ? `          <Link href="/items" underline="hover">
            Items
          </Link>
`
    : ''
  const schemeSwitch = isIsomorphic
    ? `          <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
            {otherScheme}
          </Button>
`
    : ''
  return {
    scheme: `import { useSyncExternalStore } from 'react'
${t(`
type Scheme = 'light' | 'dark'
`)}
let current${t(': Scheme')} = '${scheme}'
const listeners = new Set${t('<() => void>')}()

/** Switches the color scheme of every island, on this page and the pages the app moves to. */
export function setScheme(scheme${t(': Scheme')}) {
  current = scheme
  for (const listener of listeners) listener()
}

function subscribe(listener${t(': () => void')}) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * The color scheme every island draws in. Each island is a React root of its own, so they share
 * it here, not through context. An island first draws the default, as the server did, so it
 * hydrates on the HTML it was given, then the scheme picked.
 */
export function useScheme()${t(': Scheme')} {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => '${scheme}'
  )
}
`,
    Theme: `${t("import type { ReactNode } from 'react'\n")}import { ThemeProvider } from '@soroush.tech/design-system/theme'
${isIsomorphic ? "import { useScheme } from './scheme'\n" : ''}import themes from './themes'

/**
 * The theme of an island. Astro renders each island as a React root of its own, so each page's
 * component renders inside Theme; the header's Providers draw the base styles, once a page.
 */
export function Theme({ children }${t(': { readonly children: ReactNode }')}) {
  return <ThemeProvider theme={themes${isIsomorphic ? '[useScheme()]' : `.${scheme}`}}>{children}</ThemeProvider>
}
`,
    Header: `${isIsomorphic ? "import { Button } from '@soroush.tech/design-system/Button'\n" : ''}import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Providers } from '../theme/Providers'
${isIsomorphic ? "import { setScheme, useScheme } from '../theme/scheme'\n" : ''}
/**
 * The header of every page${isIsomorphic ? ', an island of its own' : ''}. Its Providers draw the base styles, once a
 * page${isIsomorphic ? ', and its button switches the scheme of every island' : ''}.
 */
export default function Header() {
${isIsomorphic ? "  const scheme = useScheme()\n  const otherScheme = scheme === 'light' ? 'dark' : 'light'\n" : ''}  return (
    <Providers${isIsomorphic ? ' scheme={scheme}' : ''}>
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
${itemsLink}${schemeSwitch}        </Flex>
      </Flex>
    </Providers>
  )
}
`,
    Home: `import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Theme } from '../theme/Theme'
${isIsomorphic ? "import { Counter } from './Counter'\n" : ''}
export default function Home() {
  return (
    <Theme>
      <Flex gap={2} alignItems="flex-start" px={3} py={4}>
        <Typography variant="h2">${title}</Typography>
        <Typography color="secondary">
          An Astro app on the design system. Edit src/components/Home.${x}x, and make the themes your
          own in src/theme/themes.${x}.
        </Typography>
${isIsomorphic ? '        <Counter />\n' : ''}        <Flex flexDirection="row" gap={1}>
          <Button href="https://docs.soroush.tech">Components</Button>
          <Button href="https://astro.build" variant="outlined">
            Astro
          </Button>
        </Flex>
      </Flex>
    </Theme>
  )
}
`,
    About: `import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Theme } from '../theme/Theme'

export default function About() {
  return (
    <Theme>
      <Flex gap={2} px={3} py={4}>
        <Typography variant="h2">About</Typography>
        <Typography color="secondary">
          ${ABOUT_TEXT[rendering as keyof typeof ABOUT_TEXT]}
        </Typography>
      </Flex>
    </Theme>
  )
}
`,
    NotFound: `import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Theme } from '../theme/Theme'

/** Shown for a page that does not exist. */
export default function NotFound() {
  return (
    <Theme>
      <Flex gap={2} alignItems="flex-start" px={3} py={4}>
        <Typography variant="h2">Page not found</Typography>
        <Typography color="secondary">This page does not exist.</Typography>
        <Link href="/">Back home</Link>
      </Flex>
    </Theme>
  )
}
`,
  }
}

/**
 * The sample data pages: a list of items and a page for each, which read `src/data/items` at build
 * time.
 */
function createSampleDataFiles(facts: StarterFacts): StarterFile[] {
  const { isTypeScript } = facts
  const t = (typeScriptOnly: string) => (isTypeScript ? typeScriptOnly : '')
  const x = isTypeScript ? 'ts' : 'js'
  const items = `${t(`/** One sample item. */
export interface Item {
  id: string
  title: string
  summary: string
  status: 'todo' | 'doing' | 'done'
}

`)}/**
 * Sample data, so the items pages have something to show: the pages in src/pages/items read it at
 * build time. Make them fetch your own data instead, and remove this file.
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
    summary: 'An .astro file in src/pages is a new route: it renders your components.',
    status: 'todo',
  },
  {
    id: 'data',
    title: 'Read your own data',
    summary: 'The items pages read this file at build time. Make them fetch from your API.',
    status: 'todo',
  },
  {
    id: 'build',
    title: 'Build it',
    summary: 'The build writes every page, these items among them, as HTML with its styles.',
    status: 'done',
  },
  {
    id: 'deploy',
    title: 'Deploy it',
    summary: 'The build is static files in dist, which any static host serves.',
    status: 'todo',
  },
]
`
  const statusChip = `import { Chip } from '@soroush.tech/design-system/Chip'
${t("import type { Item } from '../data/items'\n")}
const COLORS = { todo: 'default', doing: 'primary', done: 'success' }${t(' as const')}

/** An item's status, in its palette color. */
export function StatusChip({ status }${t(": { readonly status: Item['status'] }")}) {
  return <Chip label={status} size="sm" variant="outlined" color={COLORS[status]} />
}
`
  const itemList = `import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
${t("import type { Item } from '../data/items'\n")}import { Theme } from '../theme/Theme'
import { StatusChip } from './StatusChip'

/** The list of items, as src/pages/items/index.astro reads it at build time. */
export default function ItemList({
  items,
}${t(": {\n  readonly items: readonly Pick<Item, 'id' | 'title' | 'status'>[]\n}")}) {
  return (
    <Theme>
      <Flex gap={2} px={3} py={4}>
        <Typography variant="h2">Items</Typography>
        <Typography color="secondary">
          Sample data from src/data/items.${x}, which this page reads at build time.
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
    </Theme>
  )
}
`
  const itemDetails = `import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
${t("import type { Item } from '../data/items'\n")}import { Theme } from '../theme/Theme'
import { StatusChip } from './StatusChip'

/** One item, as src/pages/items/[id].astro reads it at build time. */
export default function ItemDetails({ item }${t(': { readonly item: Item }')}) {
  return (
    <Theme>
      <Flex gap={2} alignItems="flex-start" px={3} py={4}>
        <Typography variant="h2">{item.title}</Typography>
        <StatusChip status={item.status} />
        <Typography color="secondary">{item.summary}</Typography>
        <Link href="/items">All items</Link>
      </Flex>
    </Theme>
  )
}
`
  const listFrontmatter = `import { items } from '../../data/items'

// What the list shows of each item, read at build time.
const summaries = items.map(({ id, title, status }) => ({ id, title, status }))
`
  const itemFrontmatter = `${t("import type { GetStaticPaths, InferGetStaticPropsType } from 'astro'\n")}import { items } from '../../data/items'

/** The pages this route writes at build time: one per item. */
export ${
    isTypeScript
      ? `const getStaticPaths = (() =>
  items.map((item) => ({ params: { id: item.id }, props: { item } }))) satisfies GetStaticPaths

type Props = InferGetStaticPropsType<typeof getStaticPaths>
`
      : `function getStaticPaths() {
  return items.map((item) => ({ params: { id: item.id }, props: { item } }))
}
`
  }
const { item } = Astro.props
`
  return [
    { path: `src/data/items.${x}`, content: items },
    { path: `src/components/StatusChip.${x}x`, content: statusChip },
    { path: `src/components/ItemList.${x}x`, content: itemList },
    { path: `src/components/ItemDetails.${x}x`, content: itemDetails },
    {
      path: 'src/pages/items/index.astro',
      content: createPage(facts, 'ItemList', 2, listFrontmatter, ' items={summaries}'),
    },
    {
      path: 'src/pages/items/[id].astro',
      content: createPage(facts, 'ItemDetails', 2, itemFrontmatter, ' item={item}'),
    },
  ]
}

/** How the README says each rendering works. */
const README_RENDERING = {
  isomorphic: `every page is HTML from the build, with its styles, and its parts are React islands
that hydrate in the browser. Astro's client router moves between pages with no reload.`,
  ssg: `every page is HTML from the build, with its styles, and no JavaScript in the browser: its
React parts render at build time only.`,
}

function createReadme({ title, isTypeScript, rendering, hasSampleData }: StarterFacts): string {
  const x = isTypeScript ? 'ts' : 'js'
  const sampleData = hasSampleData
    ? `- \`src/pages/items/\` lists the sample items of \`src/data/items.${x}\`, with a page for each,
  read at build time: make them fetch your own.
`
    : ''
  const islands =
    rendering === 'isomorphic'
      ? `- Each React part of a page is an island, a React root of its own: it renders inside
  \`Theme\`, and the islands share the color scheme through \`src/theme/scheme.${x}\`, not context.
- \`src/layouts/Layout.astro\` keeps the design system's styles as the client router moves
  between pages.
`
      : `- Each React part of a page renders inside \`Theme\`, at build time.
`
  return `# ${title}

An [Astro](https://astro.build) app on the [@soroush.tech design system](https://docs.soroush.tech):
${README_RENDERING[rendering as keyof typeof README_RENDERING]}

- \`npm run dev\` starts it, \`npm run build\` builds it, and \`npm run preview\` serves the build.
- \`src/pages/\` holds the pages: an \`.astro\` file per route, which renders a component of
  \`src/components/\` in \`src/layouts/Layout.astro\`.
- \`src/components/Header.${x}x\` draws the header, inside the app's providers, which draw the base
  styles once a page.
${islands}- \`src/theme/themes.${x}\` holds the light and the dark theme: make them your own.
${sampleData}
Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
`
}

/** The files of the Astro app `facts` describe. */
function createFiles(facts: StarterFacts): StarterFile[] {
  const { isTypeScript, rendering, scheme, hasSampleData } = facts
  const x = isTypeScript ? 'ts' : 'js'
  const sources = createSources(facts)
  return [
    { path: 'package.json', content: createPackageJson(facts) },
    { path: 'astro.config.mjs', content: ASTRO_CONFIG },
    ...(isTypeScript ? [{ path: 'tsconfig.json', content: TSCONFIG }] : []),
    { path: '.gitignore', content: GITIGNORE },
    { path: 'README.md', content: createReadme(facts) },
    { path: `src/theme/themes.${x}`, content: createThemesSource({ isTypeScript }) },
    {
      path: `src/theme/Providers.${x}`,
      content: createProvidersSource({ isTypeScript, scheme, themesImport: './themes' }),
    },
    ...(rendering === 'isomorphic'
      ? [{ path: `src/theme/scheme.${x}`, content: sources.scheme }]
      : []),
    { path: `src/theme/Theme.${x}x`, content: sources.Theme },
    { path: 'src/layouts/Layout.astro', content: createLayout(facts) },
    { path: `src/components/Header.${x}x`, content: sources.Header },
    { path: `src/components/Home.${x}x`, content: sources.Home },
    // An island that hydrates counts; an SSG page has no JavaScript to count with.
    ...(rendering === 'isomorphic'
      ? [{ path: `src/components/Counter.${x}x`, content: createCounterSource(facts, '../state') }]
      : []),
    { path: `src/components/About.${x}x`, content: sources.About },
    { path: `src/components/NotFound.${x}x`, content: sources.NotFound },
    { path: 'src/pages/index.astro', content: createPage(facts, 'Home', 1) },
    { path: 'src/pages/about.astro', content: createPage(facts, 'About', 1) },
    { path: 'src/pages/404.astro', content: createPage(facts, 'NotFound', 1) },
    ...(hasSampleData ? createSampleDataFiles(facts) : []),
  ]
}

export const astroStarter: Starter = {
  title: 'Astro',
  label: 'Astro: HTML pages, with React islands',
  renderings: ['isomorphic', 'ssg'],
  hasLibraries: false,
  createFiles,
}
