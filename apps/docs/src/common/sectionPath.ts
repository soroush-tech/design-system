import { sections } from '@gild-ui/docs-content'
import type { DocsSection } from 'src/common/nav'

/**
 * Builds a link into a docs section. On the live site that is `/<route><path>`. Inside a
 * versioned snapshot (built with DOCS_SECTION=<pkg>), same-section routes drop the
 * section's route - the vite base (`/<route>/<version>/`) carries it - while links into
 * *other* sections stay root-relative and so escape the snapshot to the live site,
 * which is the promise a frozen snapshot makes.
 */
export const sectionPath = (pkg: DocsSection, path: string): string =>
  import.meta.env.PUBLIC_ENV__DOCS_SECTION === pkg
    ? `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
    : `/${sections[pkg].route}${path}`
