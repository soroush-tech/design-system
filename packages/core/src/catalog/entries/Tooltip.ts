import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const tooltipPlacementValues = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'auto',
  'auto-start',
  'auto-end',
] as const

export const tooltipCatalog = defineCatalogEntry({
  summary: 'A short description of one element, shown on hover, keyboard focus and a long touch.',
  isPlaceable: true,
  example: {
    component: 'Tooltip',
    props: { title: 'Save the page' },
    children: [node('Button', { variant: 'outlined' }, ['Save'])],
  },
  variants: [],
  options: {
    placement: { values: tooltipPlacementValues, default: 'top' },
    hasArrow: { values: [true, false], default: false },
    enterDelay: { values: [0, 100, 500], default: 100 },
    leaveDelay: { values: [0, 200, 500], default: 0 },
    shouldDescribeChild: { values: [true, false], default: false },
    isInteractive: { values: [true, false], default: true },
    shouldWrapDisabledChild: { values: [true, false], default: true },
    isDescriptionPersistent: { values: [true, false], default: false },
    shouldOpenOnHover: { values: [true, false], default: true },
    shouldOpenOnFocus: { values: [true, false], default: true },
    shouldOpenOnTouch: { values: [true, false], default: true },
    layer: { scale: 'zOrder', default: 'tooltip' },
    borderRadius: { scale: 'radii' },
    bg: { scale: 'background', default: 'modal' },
    textColor: { scale: 'text', default: 'initial' },
  },
  content: { title: 'text', children: 'child' },
})
