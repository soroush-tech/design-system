import type { DocsPackage } from 'src/common/nav'

/**
 * Builds a link into a docs section. On the live site that is `/<pkg><path>`. Inside a
 * versioned snapshot (built with DOCS_SECTION=<pkg>), same-section routes drop the
 * section segment - the vite base (`/<pkg>/<version>/`) carries it - while links into
 * *other* sections stay root-relative and so escape the snapshot to the live site,
 * which is the promise a frozen snapshot makes.
 */
export const sectionPath = (pkg: DocsPackage, path: string): string =>
  import.meta.env.PUBLIC_ENV__DOCS_SECTION === pkg
    ? `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
    : `/${pkg}${path}`
