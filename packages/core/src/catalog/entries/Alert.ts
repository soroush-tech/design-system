import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const alertSeverityValues = ['success', 'info', 'warning', 'error'] as const
export const alertVariantValues = ['standard', 'contained', 'outlined'] as const

export const alertCatalog = defineCatalogEntry({
  summary: 'An inline message with a severity, an icon, a title and an action.',
  isPlaceable: true,
  example: {
    component: 'Alert',
    props: { severity: 'info' },
    children: [node('AlertTitle', {}, ['Heads up']), 'Your changes were saved.'],
  },
  variants: alertSeverityValues.map((severity) => ({
    name: severity,
    label: severity[0].toUpperCase() + severity.slice(1),
    example: { component: 'Alert', props: { severity }, children: ['Your changes were saved.'] },
  })),
  options: {
    severity: { values: alertSeverityValues, default: 'info' },
    variant: { values: alertVariantValues, default: 'standard' },
    role: { values: ['alert', 'status'], default: 'alert' },
    borderRadius: { scale: 'radii' },
  },
  content: { children: 'children', icon: 'child', action: 'child' },
})
