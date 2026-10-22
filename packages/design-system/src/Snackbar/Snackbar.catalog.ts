import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { SnackbarProps } from './Snackbar'

export const snackbarHorizontalValues = ['start', 'center', 'end']
export const snackbarVerticalValues = ['top', 'bottom']

export const snackbarCatalog = defineCatalogEntry<SnackbarProps>()({
  summary: 'A transient message in a corner of the window, with auto-hide and an action.',
  isPlaceable: true,
  example: {
    component: 'Snackbar',
    props: { isOpen: true, message: 'Saved', autoHideDuration: 4000 },
    children: [],
  },
  variants: [],
  options: {
    isOpen: { values: [true, false], default: false },
    autoHideDuration: { values: [2000, 4000, 8000] },
    layer: { scale: 'zOrder', default: 'snackbar' },
  },
  content: { message: 'text', action: 'child', children: 'children' },
})
