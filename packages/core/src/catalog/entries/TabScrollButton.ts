import { defineCatalogEntry } from '../defineCatalogEntry'

export const tabScrollDirectionValues = ['start', 'end'] as const

export const tabScrollButtonCatalog = defineCatalogEntry({
  summary:
    'The button that scrolls a row of tabs - a `Tabs` shows one at each end while they overflow.',
  isPlaceable: false,
  example: { component: 'TabScrollButton', props: { direction: 'end' }, children: [] },
  variants: [],
  options: {
    direction: { values: tabScrollDirectionValues },
    orientation: { values: ['horizontal', 'vertical'], default: 'horizontal' },
    disabled: { values: [true, false], default: false },
    isHidden: { values: [true, false], default: false },
    color: { scale: 'palette' },
    textColor: { scale: 'text' },
  },
  content: { children: 'children' },
  domEvents: ['onClick'],
})
