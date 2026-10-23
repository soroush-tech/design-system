import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { AlertTitleProps } from './AlertTitle'

export const alertTitleCatalog = defineCatalogEntry<AlertTitleProps>()({
  summary: 'The title of an alert: its first line, in a heavier weight.',
  // It belongs in an Alert.
  isPlaceable: false,
  example: { component: 'AlertTitle', props: {}, children: ['Heads up'] },
  variants: [],
  options: {},
  content: { children: 'children' },
})
