import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const buttonGroupVariantValues = ['contained', 'outlined', 'text'] as const
export const buttonGroupOrientationValues = ['horizontal', 'vertical'] as const

const variantLabels: Record<string, string> = {
  contained: 'Contained',
  outlined: 'Outlined',
  text: 'Text',
}

const buttons = [
  node('Button', {}, ['One']),
  node('Button', {}, ['Two']),
  node('Button', {}, ['Three']),
]

export const buttonGroupCatalog = defineCatalogEntry({
  summary: 'A row or column of related buttons joined into one cluster that share a style.',
  isPlaceable: true,
  example: {
    component: 'ButtonGroup',
    props: { 'aria-label': 'Basic button group' },
    children: buttons,
  },
  variants: buttonGroupVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: {
      component: 'ButtonGroup',
      props: { variant, 'aria-label': 'Basic button group' },
      children: buttons,
    },
  })),
  options: {
    variant: { values: buttonGroupVariantValues, default: 'outlined' },
    color: { scale: 'palette', default: 'primary' },
    size: { scale: 'sizes', default: 'md' },
    orientation: { values: buttonGroupOrientationValues, default: 'horizontal' },
    borderRadius: { scale: 'radii', default: 'md' },
    disabled: { values: [true, false], default: false },
    fullWidth: { values: [true, false], default: false },
  },
  content: { children: 'children' },
})
