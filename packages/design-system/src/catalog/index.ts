import { componentCategories } from '@soroush.tech/docs-content'
import { catalogSources } from './sources'
import { readStyleScales } from './styleScales'
import type { CatalogEntry, DesignSystemCatalog } from './types'

export type * from './types'

const designSystemCategories = componentCategories.map((category) => ({
  label: category.label,
  components: category.items
    .filter((item) => item.pkg === 'design-system')
    .map((item) => item.name),
}))

// Every name is in a category - the catalog's tests hold it to the docs' taxonomy.
const categoryOf = (name: string): string =>
  (
    designSystemCategories.find((category) => category.components.includes(name)) as {
      label: string
    }
  ).label

const components: Record<string, CatalogEntry> = Object.fromEntries(
  Object.entries(catalogSources).map(([name, { entry, folder, family }]) => [
    name,
    {
      ...entry,
      name,
      module: `@soroush.tech/design-system/${folder}`,
      category: categoryOf(family ?? name),
    },
  ])
)

/**
 * @description Every component of the design system as data a tool can read - its
 * category, where it is imported from, what a freshly placed one is, its looks as
 * pictures, the props a picker offers and their theme scales, and how its node props and
 * two-way props are written. Pure data: it loads in Node with no DOM, React or Emotion.
 */
export const catalog: DesignSystemCatalog = {
  categories: designSystemCategories,
  styleScales: readStyleScales(),
  components,
}
