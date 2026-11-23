import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { ModalProps, ModalScroll } from './Modal'

export const modalScrollValues = ['paper', 'body'] satisfies ModalScroll[]

// The content carries its own dialog semantics - Modal's root is only `role="presentation"`.
const dialog = node(
  'Paper',
  { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Example dialog', p: 4, width: '320px' },
  [
    node('Flex', { flexDirection: 'column', gap: 3 }, [
      node('Typography', { variant: 'h5', m: 0 }, ['Modal title']),
      node('Typography', { variant: 'body2', color: 'secondary', m: 0 }, [
        'Press Escape or click the backdrop to close.',
      ]),
    ]),
  ]
)

export const modalCatalog = defineCatalogEntry<ModalProps>()({
  summary:
    'An overlay that dims the page, holds focus inside its content and closes on Escape or a backdrop click.',
  isPlaceable: true,
  example: { component: 'Modal', props: { isOpen: true }, children: [dialog] },
  variants: [],
  options: {
    isOpen: { values: [true, false] },
    scroll: { values: modalScrollValues, default: 'paper' },
    layer: { scale: 'zOrder', default: 'modal' },
    hasBackdrop: { values: [true, false], default: true },
    shouldKeepMounted: { values: [true, false], default: false },
    shouldUsePortal: { values: [true, false], default: true },
    shouldLockScroll: { values: [true, false], default: true },
    disableAriaHidden: { values: [true, false], default: false },
    shouldAutoFocus: { values: [true, false], default: true },
    shouldTrapFocus: { values: [true, false], default: true },
    shouldEnforceFocus: { values: [true, false], default: true },
    shouldRestoreFocus: { values: [true, false], default: true },
  },
  content: { children: 'children' },
  domEvents: ['onClose'],
  preview: { width: 480, height: 320 },
})
