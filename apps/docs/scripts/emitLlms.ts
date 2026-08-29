// Writes llms.txt and llms-full.txt into the prerendered output, so the deployed site
// serves a machine-readable index alongside the human one. Built from the same registry
// the docs pages and the MCP server use, so all three describe one library.
//
// A post-build script rather than a Vite plugin: vite.config.ts is executed by Node
// with workspace dependencies left external, and this reads the registry out of
// @soroush.tech/docs-content, whose exports are TypeScript source. Run under tsx.
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  absoluteReadmeLinks,
  allComponents,
  markdownComponents,
  splitReadme,
  stripReadmeChrome,
  styledSystemDocSlug,
  styledSystemDocs,
  styledSystemGuides,
  type ComponentNavItem,
} from '@soroush.tech/docs-content'
import { loadPackageFile, loadReadme } from '@soroush.tech/docs-content/node'

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://docs.soroush.design'

const componentUrl = (item: ComponentNavItem): string =>
  `${SITE_URL}/${item.pkg}/components/${item.slug}/`

const firstLine = (markdown: string): string =>
  stripReadmeChrome(markdown)
    .split('\n')
    .find((line) => line.trim() && !line.trim().startsWith('#'))
    ?.replace(/\s+/g, ' ')
    .trim() ?? ''

const link = (item: ComponentNavItem): string =>
  `- [${item.name}](${componentUrl(item)}): ${firstLine(splitReadme(absoluteReadmeLinks(loadReadme(item))).intro)}`

/** The spec-shaped index: what this is, then links out to everything. */
export const renderIndex = (): string =>
  [
    '# soroush design system',
    '',
    '> A token-driven React component library built on a typed style-prop engine, with a',
    '> markdown companion library. Every component documents its props, token values, and',
    '> defaults in its own README, which is what these pages render.',
    '',
    'An MCP server serves this same content to AI tools:',
    'https://mcp.soroush.design/mcp (or `npx -y @soroush.tech/mcp`).',
    '',
    '## Getting started',
    '',
    `- [Installation](${SITE_URL}/design-system/getting-started/installation/): install the packages and their peers.`,
    `- [Usage](${SITE_URL}/design-system/getting-started/usage/): wrap the app in ThemeProvider and render a component.`,
    `- [Theming](${SITE_URL}/design-system/customization/theming/): the Theme type and how createTheme composes one.`,
    `- [Customization](${SITE_URL}/design-system/customization/how-to/): override styles through theme.components.`,
    '',
    '## Components',
    '',
    ...allComponents.map(link),
    '',
    '## Markdown components',
    '',
    ...markdownComponents.map(link),
    '',
    '## styled-system',
    '',
    ...[...styledSystemDocs, ...styledSystemGuides].map(
      ({ label, file }) =>
        `- [${label}](${SITE_URL}/styled-system/docs/${styledSystemDocSlug(file)}/)`
    ),
    '',
  ].join('\n')

/** Everything inlined, for one-shot ingestion. */
export const renderFull = (): string =>
  [
    renderIndex(),
    '',
    '---',
    '',
    '# Component reference',
    '',
    ...[...allComponents, ...markdownComponents].flatMap((item) => {
      const { intro, api, examples } = splitReadme(absoluteReadmeLinks(loadReadme(item)))
      return [
        `## ${item.name}`,
        '',
        `Import: \`import { ${item.name} } from '@soroush.tech/${item.pkg}/${item.name}'\``,
        '',
        stripReadmeChrome(intro),
        api,
        examples,
        '',
      ].filter(Boolean)
    }),
    '---',
    '',
    '# Guides',
    '',
    loadPackageFile('design-system', 'docs/theming.md'),
    '',
    loadPackageFile('design-system', 'docs/customization.md'),
    '',
    loadPackageFile('design-system', 'docs/consumer/setup.md'),
    '',
  ].join('\n')

// Versioned section snapshots are noindex by design and serve one package from the
// domain root, so only the live build gets an index.
if (process.env.DOCS_SECTION) {
  console.log('llms: skipped (section snapshot build)')
} else {
  const clientDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'build', 'client')
  writeFileSync(resolve(clientDir, 'llms.txt'), renderIndex())
  writeFileSync(resolve(clientDir, 'llms-full.txt'), renderFull())
  console.log('llms: wrote build/client/llms.txt and llms-full.txt')
}
