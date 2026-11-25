import cliPkg from 'packages/cli/package.json'
import corePkg from 'packages/core/package.json'
import designSystemPkg from 'packages/react/package.json'
import markdownPkg from 'packages/react-markdown/package.json'
import mcpPkg from 'packages/mcp/package.json'
import reactPkg from 'packages/react/package.json'
import styledSystemPkg from 'packages/styled-system/package.json'
import uiSpecPkg from 'packages/ui-spec/package.json'
import type { DocsSection } from 'src/common/nav'

/** The React range the React package supports: its peer dependency. */
export const COMPONENT_LIBRARY_REACT_RANGE = designSystemPkg.peerDependencies.react

/** The package an app installs and imports from. */
export const APP_PACKAGE = reactPkg.name

/** The version of that package: what the sandbox exports of the demos pin. */
export const APP_PACKAGE_VERSION = reactPkg.version

/** The package an app takes its theme from, and its version: the sandbox exports pin it too. */
export const CORE_PACKAGE = corePkg.name
export const CORE_PACKAGE_VERSION = corePkg.version

/** The version of each package this build documents, as it is in its package.json. */
export const PACKAGE_VERSIONS: Record<DocsSection, string> = {
  react: designSystemPkg.version,
  markdown: markdownPkg.version,
  'styled-system': styledSystemPkg.version,
  mcp: mcpPkg.version,
  'ui-spec': uiSpecPkg.version,
  cli: cliPkg.version,
}
