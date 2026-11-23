import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const portalCatalog = defineCatalogEntry({
  summary: 'Renders its children into another DOM node - the document body by default.',
  isPlaceable: false,
  example: {
    component: 'Portal',
    props: {},
    children: [node('View', { p: 3 }, ['Portaled content'])],
  },
  variants: [],
  options: {},
  content: { children: 'children' },
})
