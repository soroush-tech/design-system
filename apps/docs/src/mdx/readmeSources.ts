import { allDocComponents } from 'src/common/nav'

// Every component README as a raw string, resolved at build time: design-system
// (both glob levels - container primaries live at Table/Table/README.md) and markdown.
const designSystemTop = import.meta.glob('packages/design-system/src/*/README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
const designSystemNested = import.meta.glob('packages/design-system/src/*/*/README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
const markdown = import.meta.glob('packages/markdown/src/*/README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const sources = { ...designSystemTop, ...designSystemNested, ...markdown }

const findSource = (pkg: string, readmePath: string): string | undefined =>
  Object.entries(sources).find(([key]) => key.endsWith(`/${pkg}/src/${readmePath}`))?.[1]

/** The raw README source for a component slug; throws on a slug the registry doesn't know. */
export const readmeForSlug = (slug: string): string => {
  const item = allDocComponents.find((component) => component.slug === slug)
  const source = item && findSource(item.pkg, item.readmePath)
  if (!source) throw new Error(`No README for component slug "${slug}"`)
  return source
}
