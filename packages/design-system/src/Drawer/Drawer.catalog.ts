import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { ExampleNode } from '../catalog/types'
import type { DrawerAnchor, DrawerProps } from './Drawer'

export const drawerAnchorValues = ['left', 'right', 'top', 'bottom'] satisfies DrawerAnchor[]

const anchorLabels: Record<DrawerAnchor, string> = {
  left: 'Left',
  right: 'Right',
  top: 'Top',
  bottom: 'Bottom',
}

// The panel's content: a fixed width on a side edge, the full width on the top or bottom.
const body = (anchor: DrawerAnchor): ExampleNode[] => [
  node(
    'Flex',
    {
      flexDirection: 'column',
      gap: 3,
      p: 4,
      width: anchor === 'top' || anchor === 'bottom' ? '100%' : '260px',
    },
    [
      node('Typography', { variant: 'h6', m: 0 }, ['Drawer']),
      node('Typography', { variant: 'body2', color: 'secondary', m: 0 }, [
        'Press Escape or click outside to close.',
      ]),
    ]
  ),
]

export const drawerCatalog = defineCatalogEntry<DrawerProps>()({
  summary:
    'A panel that slides in from a screen edge, opened by a `DrawerToggle` with the same `id`.',
  isPlaceable: true,
  example: {
    component: 'Drawer',
    props: { id: 'drawer', isOpen: true, anchor: 'left' },
    children: body('left'),
  },
  variants: drawerAnchorValues.map((anchor) => ({
    name: anchor,
    label: anchorLabels[anchor],
    example: {
      component: 'Drawer',
      props: { id: 'drawer', isOpen: true, anchor },
      children: body(anchor),
    },
  })),
  options: {
    anchor: { values: drawerAnchorValues, default: 'left' },
    elevation: { values: [0, 1, 2, 4, 8, 16, 24], default: 16 },
    transitionDuration: { default: 225 },
    hasBackdrop: { values: [true, false], default: true },
    shouldLockScroll: { values: [true, false], default: true },
    shouldAutoFocus: { values: [true, false], default: true },
    shouldTrapFocus: { values: [true, false], default: true },
    shouldRestoreFocus: { values: [true, false], default: true },
  },
  content: { children: 'children' },
  domEvents: ['onClose'],
  preview: { width: 480, height: 320 },
})
