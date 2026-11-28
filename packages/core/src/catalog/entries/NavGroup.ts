import { defineCatalogEntry } from '../defineCatalogEntry'

export const navGroupCatalog = defineCatalogEntry({
  summary: 'A group of a `NavTree`: a name over a list of links, which can fold under its name.',
  isPlaceable: false,
  example: { component: 'NavGroup', props: { label: 'Components' }, children: [] },
  variants: [],
  options: {
    isCollapsible: { values: [true, false], default: false },
    isOpen: { values: [true, false], default: false },
  },
  content: { children: 'children', label: 'text' },
})
