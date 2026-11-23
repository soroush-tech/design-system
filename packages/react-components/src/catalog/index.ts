import { catalog as core } from '@soroush.design/core/catalog'
import type { DesignSystemCatalog } from './types'

export type * from './types'

// The core's entries are platform-neutral: each has the subpath it is served from, and this
// library adds the package that serves it. The keys stay in the order a consumer has always read.
const components = Object.fromEntries(
  Object.entries(core.components).map(([key, { name, subpath, category, ...entry }]) => [
    key,
    { ...entry, name, module: `@soroush.design/react-components/${subpath}`, category },
  ])
) as DesignSystemCatalog['components']

/**
 * @description Every component of the design system as data a tool can read - its
 * category, where it is imported from, what a freshly placed one is, its looks as
 * pictures, the props a picker offers and their theme scales, and how its node props and
 * two-way props are written. Pure data: it loads in Node with no DOM, React or styling engine.
 * The data is `@soroush.design/core`'s; this adds the `module` each component is imported from.
 */
export const catalog: DesignSystemCatalog = {
  categories: core.categories,
  styleScales: core.styleScales,
  components,
}
