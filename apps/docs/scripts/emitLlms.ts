// Writes llms.txt and llms-full.txt into the prerendered output, so the deployed site
// serves a machine-readable index alongside the human one. Built from the same registry
// the docs pages and the MCP server use, so all three describe one library.
//
// A post-build script rather than a Vite plugin: vite.config.ts is executed by Node
// with workspace dependencies left external, and this reads the registry out of
// @soroush.design/docs-content, whose exports are TypeScript source. Run under tsx.
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  absoluteReadmeLinks,
  allComponents,
  componentPagePath,
  hookSection,
  sitePath,
  importPackageOf,
  importSubpathOf,
  markdownComponents,
  membersOf,
  reactHooks,
  splitReadme,
  stripReadmeChrome,
  styledSystemDocSlug,
  styledSystemDocs,
  styledSystemGuides,
  type ComponentNavItem,
} from '@soroush.design/docs-content'
import { loadPackageFile, loadReadme, loadRepoFile } from '@soroush.design/docs-content/node'

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://docs.soroush.design'

const componentUrl = (item: ComponentNavItem): string =>
  `${SITE_URL}${sitePath(item.pkg, componentPagePath(item))}`

// A family's members follow it, each linked to its API page.
const designSystemComponents = allComponents.flatMap((item) => [item, ...membersOf(item)])

const firstLine = (markdown: string): string =>
  stripReadmeChrome(markdown)
    .split('\n')
    .find((line) => line.trim() && !line.trim().startsWith('#'))
    ?.replace(/\s+/g, ' ')
    .trim() ?? ''

const link = (item: ComponentNavItem): string =>
  `- [${item.name}](${componentUrl(item)}): ${firstLine(splitReadme(absoluteReadmeLinks(loadReadme(item))).intro)}`

const hooksReadme = (): string => loadRepoFile('packages/react-hooks/README.md')

// A hook's page opens with a paragraph that says what it is, wrapped over several lines.
const hookSummary = (hook: string): string =>
  stripReadmeChrome(hookSection(hooksReadme(), hook)).split('\n\n')[0].replace(/\s+/g, ' ').trim()

const hookLink = (hook: string): string =>
  `- [${hook}](${SITE_URL}/react/hooks/${hook}/): ${hookSummary(hook)}`

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
    'https://mcp.soroush.design/mcp (or `npx -y @soroush.design/mcp`).',
    '',
    '## Getting started',
    '',
    `- [Installation](${SITE_URL}/react/installation/): install the packages and their peers.`,
    `- [Usage](${SITE_URL}/react/usage/): wrap the app in ThemeProvider and render a component.`,
    `- [Theming](${SITE_URL}/react/theme/): the Theme type and how createTheme composes one.`,
    `- [Customization](${SITE_URL}/react/customization/): override styles through theme.components.`,
    '',
    '## Components',
    '',
    ...designSystemComponents.map(link),
    '',
    '## Hooks',
    '',
    ...reactHooks.map(hookLink),
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
    ...[...designSystemComponents, ...markdownComponents].flatMap((item) => {
      const { intro, api, examples } = splitReadme(absoluteReadmeLinks(loadReadme(item)))
      return [
        `## ${item.name}`,
        '',
        `Import: \`import { ${item.name} } from '${importPackageOf(item)}/${importSubpathOf(item)}'\``,
        '',
        stripReadmeChrome(intro),
        api,
        examples,
        '',
      ].filter(Boolean)
    }),
    '---',
    '',
    '# Hooks',
    '',
    ...reactHooks.map((hook) => hookSection(hooksReadme(), hook)),
    '',
    '---',
    '',
    '# Guides',
    '',
    absoluteReadmeLinks(loadPackageFile('react', 'docs/theming.md')),
    '',
    absoluteReadmeLinks(loadPackageFile('react', 'docs/customization.md')),
    '',
    absoluteReadmeLinks(loadPackageFile('react', 'docs/consumer/setup.md')),
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
