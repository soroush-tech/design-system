import designSystemPkg from 'packages/design-system/package.json'
import markdownPkg from 'packages/markdown/package.json'
import mcpPkg from 'packages/mcp/package.json'
import styledSystemPkg from 'packages/styled-system/package.json'
import uiSpecPkg from 'packages/ui-spec/package.json'
import type { DocsSection } from 'src/common/nav'

/** The version of each package this build documents, as it is in its package.json. */
export const PACKAGE_VERSIONS: Record<DocsSection, string> = {
  'design-system': designSystemPkg.version,
  markdown: markdownPkg.version,
  'styled-system': styledSystemPkg.version,
  mcp: mcpPkg.version,
  'ui-spec': uiSpecPkg.version,
}
