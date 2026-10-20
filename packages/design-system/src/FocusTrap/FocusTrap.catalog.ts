import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { FocusTrapProps } from './FocusTrap'

export const focusTrapCatalog = defineCatalogEntry<FocusTrapProps>()({
  summary: 'Keeps keyboard focus within its children while it is enabled.',
  isPlaceable: false,
  example: {
    component: 'FocusTrap',
    props: { isEnabled: true },
    children: [node('View', { p: 3 }, ['Trapped content'])],
  },
  variants: [],
  options: {
    isEnabled: { values: [true, false], default: true },
    shouldAutoFocus: { values: [true, false], default: true },
    shouldTrapFocus: { values: [true, false], default: true },
    shouldEnforceFocus: { values: [true, false], default: true },
    shouldRestoreFocus: { values: [true, false], default: true },
  },
  content: { children: 'children' },
})
