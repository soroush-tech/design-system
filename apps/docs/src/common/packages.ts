import mcpPkg from 'packages/mcp/package.json'
import uiSpecPkg from 'packages/ui-spec/package.json'
import type { ComponentNavItem, DocsPackage } from '@soroush.tech/docs-content'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'

/** Where the packages live: the repository's main branch. */
const GITHUB_TREE = 'https://github.com/soroush-tech/design-system/tree/main'

export interface PackageInfo {
  /** The folder under `packages/`, and the name after `@soroush.tech/`. */
  id: string
  name: string
  description: string
  version: string
  npm: string
  github: string
  /** The docs section of the package, when it has one. */
  docs?: DocsPackage
}

const npmOf = (id: string) => `https://www.npmjs.com/package/@soroush.tech/${id}`
const githubOf = (id: string) => `${GITHUB_TREE}/packages/${id}`

/** The packages the docs are about, the ones with a docs section first. */
export const PACKAGES: PackageInfo[] = [
  {
    id: 'design-system',
    name: 'Design System',
    description:
      'The components: layout, inputs, feedback, navigation and overlays, with a theme to match your brand.',
    version: PACKAGE_VERSIONS['design-system'],
    npm: npmOf('design-system'),
    github: githubOf('design-system'),
    docs: 'design-system',
  },
  {
    id: 'markdown',
    name: 'Markdown',
    description:
      'The companion library: render markdown, edit it live, highlight code and draw diagrams with the same tokens.',
    version: PACKAGE_VERSIONS.markdown,
    npm: npmOf('markdown'),
    github: githubOf('markdown'),
    docs: 'markdown',
  },
  {
    id: 'styled-system',
    name: 'Styled System',
    description:
      'The style-prop engine under it all: responsive props, scales and variants for any component of yours.',
    version: PACKAGE_VERSIONS['styled-system'],
    npm: npmOf('styled-system'),
    github: githubOf('styled-system'),
    docs: 'styled-system',
  },
  {
    id: 'mcp',
    name: 'MCP server',
    description:
      'Serves the component inventory, every README and the theme tokens to AI coding tools.',
    version: mcpPkg.version,
    npm: npmOf('mcp'),
    github: githubOf('mcp'),
  },
  {
    id: 'ui-spec',
    name: 'UI spec',
    description:
      'The generative-UI spec: A2UI catalogs, a behavior schema for page data, and validators.',
    version: uiSpecPkg.version,
    npm: npmOf('ui-spec'),
    github: githubOf('ui-spec'),
  },
]

/** A component's source folder on GitHub - the one its README is in. */
export const sourceUrlOf = (item: ComponentNavItem): string =>
  `${GITHUB_TREE}/packages/${item.pkg}/src/${item.readmePath.replace(/\/README\.md$/, '')}`
