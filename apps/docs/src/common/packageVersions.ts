import designSystemPkg from 'packages/design-system/package.json'
import markdownPkg from 'packages/markdown/package.json'
import styledSystemPkg from 'packages/styled-system/package.json'
import type { DocsPackage } from 'src/common/nav'

/** The version of each package this build documents, as it is in its package.json. */
export const PACKAGE_VERSIONS: Record<DocsPackage, string> = {
  'design-system': designSystemPkg.version,
  markdown: markdownPkg.version,
  'styled-system': styledSystemPkg.version,
}
