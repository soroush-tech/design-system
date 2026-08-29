import type { ComponentType } from 'react'
import { kebabCase } from '@soroush.tech/docs-content'

// Each component owns its docs page: `<Name>.mdx` lives in the component's folder next
// to its README (both glob levels - container primaries live at Table/Table/).
const topLevel = import.meta.glob('packages/design-system/src/*/*.mdx', {
  eager: true,
  import: 'default',
}) as Record<string, ComponentType>
const nested = import.meta.glob('packages/design-system/src/*/*/*.mdx', {
  eager: true,
  import: 'default',
}) as Record<string, ComponentType>

const pagesBySlug = new Map(
  Object.entries({ ...topLevel, ...nested }).map(([path, Component]) => [
    kebabCase(
      path
        .split('/')
        .pop()!
        .replace(/\.mdx$/, '')
    ),
    Component,
  ])
)

/**
 * The MDX page for a component slug. Every component ships one - `nav.test.ts` guards
 * the set against disk, and this throws (failing the prerender) if one goes missing.
 */
export const mdxForSlug = (slug: string): ComponentType => {
  const page = pagesBySlug.get(slug)
  if (!page) {
    throw new Error(`No MDX page for component slug "${slug}" - add <Name>.mdx beside its README`)
  }
  return page
}
