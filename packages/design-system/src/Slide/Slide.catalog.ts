import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import { transitionOptions, transitionExampleChild } from '../utils/transitionCatalog'
import type { SlideProps } from './Slide'

export const slideDirectionValues = ['up', 'down', 'left', 'right'] satisfies NonNullable<
  SlideProps['direction']
>[]

export const slideCatalog = defineCatalogEntry<SlideProps>()({
  summary: 'Slides one child in from an edge of the window and back out.',
  isPlaceable: true,
  example: { component: 'Slide', props: { isShown: true }, children: [transitionExampleChild] },
  variants: [],
  options: {
    ...transitionOptions,
    direction: { values: slideDirectionValues, default: 'down' },
  },
  content: { children: 'child' },
})
