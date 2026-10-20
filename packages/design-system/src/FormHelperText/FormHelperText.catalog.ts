import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { FormHelperTextProps } from './FormHelperText'

export const formHelperTextCatalog = defineCatalogEntry<FormHelperTextProps>()({
  summary: "Hint or error text under a field, read by assistive tech as the control's description.",
  isPlaceable: false,
  example: { component: 'FormHelperText', props: {}, children: ["We'll never share it."] },
  variants: [],
  options: {
    error: { values: [true, false], default: false },
    color: { scale: 'text', default: 'secondary' },
  },
  content: { children: 'children' },
})
