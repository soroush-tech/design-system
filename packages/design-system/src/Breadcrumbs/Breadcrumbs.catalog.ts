import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { BreadcrumbsProps } from './Breadcrumbs'

export const breadcrumbsSeparatorValues = ['/', '›', '-', '·'] satisfies string[]

const crumbs = [
  node('Link', { href: '#', underline: 'hover', color: 'inherit' }, ['Home']),
  node('Link', { href: '#', underline: 'hover', color: 'inherit' }, ['Catalog']),
  node('Typography', { color: 'primary', 'aria-current': 'page' }, ['Accessories']),
]

export const breadcrumbsCatalog = defineCatalogEntry<BreadcrumbsProps>()({
  summary: "The trail of links from a site's root to the current page.",
  isPlaceable: true,
  example: {
    component: 'Breadcrumbs',
    props: { 'aria-label': 'Breadcrumb', expandLabel: 'Show path' },
    children: crumbs,
  },
  variants: breadcrumbsSeparatorValues.map((separator) => ({
    name: separator,
    label: `Separated by ${separator}`,
    example: {
      component: 'Breadcrumbs',
      props: { 'aria-label': 'Breadcrumb', separator },
      children: crumbs,
    },
  })),
  options: {
    separator: { values: breadcrumbsSeparatorValues, default: '/' },
    maxItems: { values: [2, 3, 4, 8], default: 8 },
    itemsBeforeCollapse: { values: [0, 1, 2], default: 1 },
    itemsAfterCollapse: { values: [1, 2], default: 1 },
    color: { scale: 'text', default: 'secondary' },
    variant: { scale: 'typography', default: 'body1' },
  },
  content: { children: 'children' },
})
