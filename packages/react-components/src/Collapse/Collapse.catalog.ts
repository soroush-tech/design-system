import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import { transitionOptions } from '../utils/transitionCatalog'
import type { CollapseProps } from './Collapse'

export const collapseOrientationValues = ['vertical', 'horizontal'] satisfies NonNullable<
  CollapseProps['orientation']
>[]

export const collapseCatalog = defineCatalogEntry<CollapseProps>()({
  summary: 'Opens and closes its content by its height, or its width.',
  isPlaceable: true,
  example: {
    component: 'Collapse',
    props: { isShown: true },
    children: ['Content that opens and closes'],
  },
  variants: [],
  options: {
    ...transitionOptions,
    orientation: { values: collapseOrientationValues, default: 'vertical' },
    collapsedSize: { values: [0, 24, 48], default: 0 },
  },
  content: { children: 'children' },
})
