import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { IconProps } from './Icon'
import type { IconName } from './icons'

// A handful of registry names - the registry imports React components, so the catalog
// lists them as strings.
export const iconNameValues = [
  'hub',
  'code',
  'terminal',
  'database',
  'psychology',
  'smart_toy',
  'account_tree',
  'analytics',
  'check',
  'close',
  'menu',
  'warning',
] satisfies IconName[]

// The text tokens its pictures show - `color` takes any `theme.text` key.
const pictured = ['primary', 'secondary', 'initial'] satisfies NonNullable<IconProps['color']>[]

const colorLabels: Record<(typeof pictured)[number], string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  initial: 'Initial',
}

export const iconCatalog = defineCatalogEntry<IconProps>()({
  summary: 'A square SVG icon from the registry, colored from the theme text tokens.',
  isPlaceable: true,
  example: {
    component: 'Icon',
    props: { name: 'hub', color: 'primary', size: '3rem' },
    children: [],
  },
  variants: pictured.map((color) => ({
    name: color,
    label: colorLabels[color],
    example: { component: 'Icon', props: { name: 'hub', color, size: '3rem' }, children: [] },
  })),
  options: {
    name: { values: iconNameValues },
    color: { scale: 'text', default: 'primary' },
    size: { default: '1.5rem' },
  },
  content: {},
})
