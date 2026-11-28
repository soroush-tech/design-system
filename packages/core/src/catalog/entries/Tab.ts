import { defineCatalogEntry } from '../defineCatalogEntry'

export const tabIconPositionValues = ['top', 'start', 'end', 'bottom'] as const

export const tabCatalog = defineCatalogEntry({
  summary: 'One tab of a `Tabs` row - a label, an icon on any side, and an optional close button.',
  isPlaceable: false,
  example: { component: 'Tab', props: { value: 'canvas', label: 'Canvas' }, children: [] },
  variants: [],
  options: {
    disabled: { values: [true, false], default: false },
    isWrapped: { values: [true, false], default: false },
    iconPosition: { values: tabIconPositionValues, default: 'top' },
    color: { scale: 'palette' },
    textColor: { scale: 'text' },
    size: { scale: 'sizes' },
    bg: { scale: 'background' },
    selectedBg: { scale: 'background' },
    borderRadius: { scale: 'radii' },
  },
  content: {
    label: 'text',
    icon: 'child',
    secondaryAction: 'child',
  },
  domEvents: ['onClick'],
})
