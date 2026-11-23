import { categories } from './categories'
import { catalogSources } from './sources'
import { styleScales } from './styleScales'
import type { CatalogEntry, DesignSystemCatalog } from './types'

export type * from './types'

// Every name is in a category - the catalog's tests hold it to the docs' taxonomy.
const categoryOf = (name: string): string =>
  (categories.find((category) => category.components.includes(name)) as { label: string }).label

const components: Record<string, CatalogEntry> = Object.fromEntries(
  Object.entries(catalogSources).map(([name, { entry, subpath, family }]) => [
    name,
    { ...entry, name, subpath, category: categoryOf(family ?? name) },
  ])
)

/**
 * @description Every component of the design system as data a tool can read - its
 * category, the subpath it is imported from, what a freshly placed one is, its looks as
 * pictures, the props a picker offers and their theme scales, and how its node props and
 * two-way props are written. Pure data: it loads in Node with no DOM and no framework.
 */
export const catalog: DesignSystemCatalog = { categories, styleScales, components }
