import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { ImageProps } from './Image'

export const imageObjectFitValues = [
  'cover',
  'contain',
  'fill',
  'none',
  'scale-down',
] satisfies NonNullable<ImageProps['objectFit']>[]

const fitLabels: Record<(typeof imageObjectFitValues)[number], string> = {
  cover: 'Cover',
  contain: 'Contain',
  fill: 'Fill',
  none: 'None',
  'scale-down': 'Scale down',
}

const picture = { src: '/soroush.svg', alt: 'Logo', width: '200px', height: '200px' }

export const imageCatalog = defineCatalogEntry<ImageProps>()({
  summary: 'An image with an optional fallback source, sized and fitted through props.',
  isPlaceable: true,
  example: { component: 'Image', props: { ...picture, objectFit: 'contain' }, children: [] },
  variants: imageObjectFitValues.map((objectFit) => ({
    name: objectFit,
    label: fitLabels[objectFit],
    example: { component: 'Image', props: { ...picture, objectFit }, children: [] },
  })),
  options: {
    objectFit: { values: imageObjectFitValues },
    borderRadius: { scale: 'radii' },
  },
  content: {},
})
