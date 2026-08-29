import type { DocsPackage } from 'src/common/nav'

// These helpers run at Vike config time (in +route.ts / +config.ts), which executes in
// plain Node - process.env, not import.meta.env. Production builds evaluate them once
// there and serialize the results, but the dev server also serves +route.ts to the
// browser (client routing), where `process` does not exist - hence the guard. Dev is
// always the live layout, so the browser fallback of `undefined` is the correct value.

/** A process.env value, or undefined in the browser. */
export const readNodeEnv = (name: string): string | undefined =>
  typeof process === 'undefined' ? undefined : process.env[name]

/** The section a snapshot build carries; undefined on the live site and in the browser. */
export const docsSection = (): string | undefined => readNodeEnv('DOCS_SECTION')

/**
 * The Vike route string for a section page. On the live site the section owns a URL
 * prefix (`/design-system/components/@name`); in that section's versioned snapshot
 * build the prefix drops - the vite base (`/<pkg>/<version>/`) carries it instead.
 */
export const sectionRoute = (pkg: DocsPackage, route: string): string => {
  if (docsSection() === pkg) return route
  // The section overview is `/<pkg>`, not `/<pkg>/` - Vike matches routes exactly.
  const suffix = route === '/' ? '' : route
  return `/${pkg}${suffix}`
}

/**
 * Whether a section's pages prerender in the current build: always on the live site,
 * and only the snapshot's own section when DOCS_SECTION is set.
 */
export const sectionPrerender = (pkg: DocsPackage): boolean => {
  const section = docsSection()
  return !section || section === pkg
}
