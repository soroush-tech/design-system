import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { TooltipProps } from './Tooltip'
import { tooltipPlacementValues } from './utils/getTooltipOrigins'

export { tooltipPlacementValues }

export const tooltipCatalog = defineCatalogEntry<TooltipProps>()({
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
    shouldOpenOnHover: { values: [true, false], default: true },
    shouldOpenOnFocus: { values: [true, false], default: true },
    shouldOpenOnTouch: { values: [true, false], default: true },
    layer: { scale: 'zOrder', default: 'tooltip' },
  },
  content: { title: 'text', children: 'child' },
})
