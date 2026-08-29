import {
  styledSystemDocSlug,
  styledSystemDocs,
  styledSystemGuides,
  stripReadmeChrome,
} from '@soroush.tech/docs-content'
import { loadPackageFile, loadRepoFile } from '@soroush.tech/docs-content/node'
import type { DocRecord } from '../types'
import { DOCS_URL } from './components'

interface DocSource {
  id: string
  title: string
  summary: string
  /** Reads the doc body from disk. */
  read: () => string
  url?: string
}

/** Wraps a source file in a fenced block so it reads as copy-this, not prose. */
const asCode = (source: string, lang: string, note: string): string =>
  `${note}\n\n\`\`\`${lang}\n${source.trimEnd()}\n\`\`\`\n`

const GUIDES: DocSource[] = [
  {
    id: 'installation',
    title: 'Installation',
    summary: 'Install the packages and their peer dependencies.',
    read: () => loadRepoFile('apps/docs/content/docs/installation.md'),
    url: `${DOCS_URL}/design-system/getting-started/installation/`,
  },
  {
    id: 'usage',
    title: 'Usage',
    summary: 'Wrap the app in ThemeProvider and render the first component.',
    read: () => loadRepoFile('apps/docs/content/docs/usage.md'),
    url: `${DOCS_URL}/design-system/getting-started/usage/`,
  },
  {
    id: 'theming',
    title: 'Theming',
    summary: 'The Theme type, the scales it carries, and how createTheme composes one.',
    read: () => loadPackageFile('design-system', 'docs/theming.md'),
    url: `${DOCS_URL}/design-system/customization/theming/`,
  },
  {
    id: 'customization',
    title: 'How to customize',
    summary: 'Override component styles through theme.components and style props.',
    read: () => loadPackageFile('design-system', 'docs/customization.md'),
    url: `${DOCS_URL}/design-system/customization/how-to/`,
  },
  {
    id: 'setup',
    title: 'New app setup',
    summary: 'End-to-end checklist for a new app: fonts, global reset, providers, theme.',
    read: () => loadPackageFile('design-system', 'docs/consumer/setup.md'),
  },
  {
    id: 'layout-kit',
    title: 'App layout kit',
    summary:
      'App-level components to copy verbatim - PageCard, PageHeader, Pill, StatusBadge, TabNav and friends.',
    read: () => loadPackageFile('design-system', 'docs/consumer/layout-kit.md'),
  },
  {
    id: 'brand-theme',
    title: 'Brand theme (theme.ts)',
    summary: 'The brand light and dark theme, ready to drop into an app as theme.ts.',
    read: () =>
      asCode(
        loadPackageFile('design-system', 'docs/consumer/theme.ts'),
        'ts',
        'Copy this verbatim into your app as `theme.ts`.'
      ),
  },
  {
    id: 'providers',
    title: 'Providers (Next.js App Router)',
    summary: 'ThemeProvider plus the Emotion SSR registry for the Next.js App Router.',
    read: () =>
      asCode(
        loadPackageFile('design-system', 'docs/consumer/providers.tsx'),
        'tsx',
        'Copy this verbatim into your app as `providers.tsx`.'
      ),
  },
  {
    id: 'design-system-overview',
    title: 'Design system overview',
    summary: 'The package README: what ships, the import contract, and the component inventory.',
    read: () => stripReadmeChrome(loadPackageFile('design-system', 'README.md')),
    url: `${DOCS_URL}/design-system/`,
  },
  {
    id: 'markdown-overview',
    title: 'Markdown package overview',
    summary: 'The headless markdown editor and renderer built on the design system.',
    read: () => stripReadmeChrome(loadPackageFile('markdown', 'README.md')),
    url: `${DOCS_URL}/markdown/`,
  },
  {
    id: 'styled-system-overview',
    title: 'Styled-system overview',
    summary: 'The style-prop engine underneath the design system.',
    read: () => stripReadmeChrome(loadPackageFile('styled-system', 'README.md')),
    url: `${DOCS_URL}/styled-system/`,
  },
]

// The styled-system package's own docs and guides, ids prefixed so they never collide
// with a guide above.
const styledSystemSources = (): DocSource[] =>
  [...styledSystemDocs, ...styledSystemGuides].map(({ label, file }) => ({
    id: `styled-system/${styledSystemDocSlug(file)}`,
    title: `styled-system: ${label}`,
    summary: `The styled-system package's "${label}" documentation.`,
    read: () => loadPackageFile('styled-system', `docs/${file}`),
    url: `${DOCS_URL}/styled-system/docs/${styledSystemDocSlug(file)}/`,
  }))

/** Every guide and reference document the server serves, read from disk. */
export const buildDocs = (): DocRecord[] =>
  [...GUIDES, ...styledSystemSources()].map(({ id, title, summary, read, url }) => ({
    id,
    title,
    summary,
    body: read(),
    ...(url ? { url } : {}),
  }))
