import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { ButtonColor } from '../../Button'
import type { ToggleButtonProps } from './ToggleButton'

const colorLabels: Record<ButtonColor, string> = {
  default: 'Default',
  primary: 'Primary',
  secondary: 'Secondary',
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning',
}

const colors = Object.keys(colorLabels) as ButtonColor[]

export const toggleButtonCatalog = defineCatalogEntry<ToggleButtonProps>()({
  summary:
    'A button that stays pressed or not - on its own, or one choice of a `ToggleButtonGroup`.',
  isPlaceable: true,
  example: { component: 'ToggleButton', props: { value: 'check' }, children: ['Check'] },
  variants: colors.map((color) => ({
    name: color,
    label: colorLabels[color],
    example: {
      component: 'ToggleButton',
      props: { value: 'check', color, isSelected: true },
      children: ['Check'],
    },
  })),
  options: {
    color: { scale: 'palette', default: 'default' },
    size: { scale: 'sizes', default: 'md' },
    isSelected: { values: [true, false] },
    fullWidth: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    loading: { values: [true, false], default: false },
  },
  content: {
    children: 'children',
    startIcon: 'child',
    endIcon: 'child',
    loadingIndicator: 'child',
  },
  domEvents: ['onClick', 'onChange'],
})
