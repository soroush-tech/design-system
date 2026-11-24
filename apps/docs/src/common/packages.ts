import { sections, type ComponentNavItem } from '@soroush.design/docs-content'
import type { DocsSection } from 'src/common/nav'
import { PACKAGE_VERSIONS } from 'src/common/packageVersions'

/** Where the packages live: the repository's main branch. */
const GITHUB_TREE = 'https://github.com/soroush-tech/design-system/tree/main'

export interface PackageInfo {
  /** The package's docs section: its URL segment. Its folder and npm name are looked up from it. */
  id: DocsSection
  name: string
  description: string
  version: string
  npm: string
  github: string
  /** The docs section of the package. */
  docs: DocsSection
}

const npmOf = (id: DocsSection) => `https://www.npmjs.com/package/${sections[id].npm}`
const githubOf = (id: DocsSection) => `${GITHUB_TREE}/packages/${sections[id].dir}`

/** The packages the docs are about, the ones with a docs section first. */
export const PACKAGES: PackageInfo[] = [
  {
    id: 'react',
    name: 'Design System',
    description:
      'The components: layout, inputs, feedback, navigation and overlays, with a theme to match your brand.',
    version: PACKAGE_VERSIONS.react,
    npm: npmOf('react'),
    github: githubOf('react'),
    docs: 'react',
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
    version: PACKAGE_VERSIONS.mcp,
    npm: npmOf('mcp'),
    github: githubOf('mcp'),
    docs: 'mcp',
  },
  {
    id: 'ui-spec',
    name: 'UI spec',
    description:
      'The generative-UI spec: A2UI catalogs, a behavior schema for page data, and validators.',
    version: PACKAGE_VERSIONS['ui-spec'],
    npm: npmOf('ui-spec'),
    github: githubOf('ui-spec'),
    docs: 'ui-spec',
  },
  {
    id: 'cli',
    name: 'Command line',
    description:
      'Sets the design system up in an existing React app with one command, showing every change first.',
    version: PACKAGE_VERSIONS.cli,
    npm: npmOf('cli'),
    github: githubOf('cli'),
    docs: 'cli',
  },
]

/** A component's source folder on GitHub - the one its README is in. */
export const sourceUrlOf = (item: ComponentNavItem): string =>
  `${GITHUB_TREE}/packages/${sections[item.pkg].dir}/src/${item.readmePath.replace(/\/README\.md$/, '')}`
