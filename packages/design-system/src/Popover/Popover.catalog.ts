import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { PopoverProps, PopoverReference } from './Popover'

export const popoverAnchorReferenceValues = [
  'anchorEl',
  'anchorPosition',
  'none',
] satisfies PopoverReference[]

export const popoverCatalog = defineCatalogEntry<PopoverProps>()({
  summary: 'A surface shown next to an anchor element, closed on Escape or a click outside.',
  // It positions against an `anchorEl` - an element, which a catalog example can't hold.
  isPlaceable: false,
  example: {
    component: 'Popover',
    props: { open: false },
    children: [
      node('View', { p: 3 }, [node('Typography', { variant: 'body2' }, ['Popover content'])]),
    ],
  },
  variants: [],
  options: {
    open: { values: [true, false] },
    anchorReference: { values: popoverAnchorReferenceValues, default: 'anchorEl' },
    elevation: { values: [0, 1, 2, 4, 8, 16, 24], default: 8 },
    marginThreshold: { scale: 'space', default: 2 },
    layer: { scale: 'zOrder', default: 'modal' },
    hasBackdrop: { values: [true, false], default: false },
    disableScrollLock: { values: [true, false], default: false },
    disableAriaHidden: { values: [true, false], default: false },
    shouldAutoFocus: { values: [true, false], default: true },
    shouldTrapFocus: { values: [true, false], default: true },
    shouldEnforceFocus: { values: [true, false], default: true },
    shouldRestoreFocus: { values: [true, false], default: true },
    shouldKeepMounted: { values: [true, false], default: false },
  },
  content: { children: 'children' },
  domEvents: ['onClose'],
})
