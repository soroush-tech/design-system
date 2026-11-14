// The Vike starter: a server-rendered React app on the design system. Each file is written once,
// in TypeScript; `t(...)` holds what only TypeScript has, so the JavaScript app is the same file
// with the types taken out. The Vike wiring here is the one `init` reuses for an existing Vike
// app (#80).
import { devDependencies } from '../../../package.json'
import { createProvidersSource, createThemesSource } from '../../templates/templates'
import type { Starter, StarterFacts, StarterFile } from '../starters'

/** The versions the starter installs: the ones this package is tested with. */
const VERSIONS = devDependencies

/** A version from this package's own manifest, as a range an app takes. */
const toRange = (version: string) => (/^\d/.test(version) ? `^${version}` : version)

const pickVersions = (names: readonly (keyof typeof VERSIONS)[]) =>
  Object.fromEntries(names.map((name) => [name, toRange(VERSIONS[name])]))

function createPackageJson({ name, isTypeScript, version }: StarterFacts): string {
  const packageJson = {
    name,
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
      ...pickVersions(['@emotion/server', 'react', 'react-dom', 'vike']),
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

function createSources({ name, isTypeScript, scheme }: StarterFacts) {
  const t = (typeScriptOnly: string) => (isTypeScript ? typeScriptOnly : '')
  const x = isTypeScript ? 'ts' : 'js'
  return {
    config: `${t("import type { Config } from 'vike/types'\n\n")}// The settings of every page: https://vike.dev/config
export default {
  clientRouting: true,
  hydrationCanBeAborted: true,
  // +Layout is a setting of this app's own: the component every page renders inside.
  meta: {
    Layout: { env: { server: true, client: true } },
  },
}${t(' satisfies Config')}
`,
    PageShell: `import { StrictMode } from 'react'
import { CacheProvider, styleCache } from '@soroush.tech/design-system/engine'
${t("import type { PageContext } from 'vike/types'\n")}
/**
 * The page inside its +Layout, the same on the server and in the browser. The Emotion cache is the
 * design system's, so the server can find the styles the page used.
 */
export function PageShell({ pageContext }${t(': { readonly pageContext: PageContext }')}) {
  const { Page, config } = pageContext
  const { Layout } = config
  return (
    <StrictMode>
      <CacheProvider value={styleCache}>
        {Layout ? (
          <Layout>
            <Page />
          </Layout>
        ) : (
          <Page />
        )}
      </CacheProvider>
    </StrictMode>
  )
}
`,
    onRenderHtml: `import createEmotionServer from '@emotion/server/create-instance'
import { renderToString } from 'react-dom/server'
import { styleCache } from '@soroush.tech/design-system/engine'
import { dangerouslySkipEscape, escapeInject } from 'vike/server'
${t("import type { OnRenderHtmlSync } from 'vike/types'\n")}import { PageShell } from './PageShell'

/**
 * Renders the page on the server, with the styles it uses in the head, so it is drawn styled
 * before any script runs.
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
    <title>${name}</title>
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
    Layout: `import { useState${t(', type ReactNode')} } from 'react'
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
    <Providers scheme={scheme}>
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
          ${name}
        </Typography>
        <Flex as="nav" flexDirection="row" alignItems="center" gap={2}>
          <Link href="/" underline="hover">
            Home
          </Link>
          <Link href="/about" underline="hover">
            About
          </Link>
          <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
            {otherScheme}
          </Button>
        </Flex>
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
      <Typography variant="h2">${name}</Typography>
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
        A second page: the server draws it with its styles, and the app moves to it without a
        reload.
      </Typography>
    </Flex>
  )
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

function createReadme({ name, isTypeScript }: StarterFacts): string {
  const x = isTypeScript ? 'ts' : 'js'
  return `# ${name}

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.tech),
rendered on the server with its styles in the HTML.

- \`npm run dev\` starts it, \`npm run build\` builds it, and \`npm run preview\` serves the build.
- \`src/pages/\` holds the pages: a folder per route, each with its \`+Page\`.
- \`src/pages/+Layout.${x}x\` is the frame every page renders in, inside the app's providers.
- \`src/theme/themes.${x}\` holds the light and the dark theme: make them your own.
- \`src/pages/+onRenderHtml.${x}x\` and \`+onRenderClient.${x}x\` render the pages, with the styles each
  page uses in its HTML.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
`
}

/** The files of the Vike app `facts` describe. */
function createFiles(facts: StarterFacts): StarterFile[] {
  const { isTypeScript, scheme } = facts
  const x = isTypeScript ? 'ts' : 'js'
  const sources = createSources(facts)
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
    { path: `src/pages/+onRenderHtml.${x}x`, content: sources.onRenderHtml },
    { path: `src/pages/+onRenderClient.${x}x`, content: sources.onRenderClient },
    { path: `src/pages/+Layout.${x}x`, content: sources.Layout },
    { path: `src/pages/index/+Page.${x}x`, content: sources.home },
    { path: `src/pages/about/+Page.${x}x`, content: sources.about },
    { path: `src/pages/_error/+Page.${x}x`, content: sources.error },
  ]
}

export const vikeStarter: Starter = { title: 'Vike', createFiles }
