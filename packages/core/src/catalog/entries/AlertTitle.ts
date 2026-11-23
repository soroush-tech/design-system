import { defineCatalogEntry } from '../defineCatalogEntry'

export const alertTitleCatalog = defineCatalogEntry({
  summary: 'The title of an alert: its first line, in a heavier weight.',
  // It belongs in an Alert.
  isPlaceable: false,
  example: { component: 'AlertTitle', props: {}, children: ['Heads up'] },
  variants: [],
  options: {},
  content: { children: 'children' },
})
