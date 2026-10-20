import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { AppBarColor, AppBarPosition, AppBarProps } from './AppBar'

export const appBarPositionValues = [
  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',
] satisfies AppBarPosition[]

// The background tokens its pictures show - `color` takes any `theme.background` key.
const pictured = ['paper', 'primary', 'secondary', 'modal'] satisfies AppBarColor[]

const colorLabels: Record<(typeof pictured)[number], string> = {
  paper: 'Paper',
  primary: 'Primary',
  secondary: 'Secondary',
  modal: 'Modal',
}

export const appBarCatalog = defineCatalogEntry<AppBarProps>()({
  summary: 'A full-width header bar for an app title, navigation and actions.',
  isPlaceable: true,
  example: { component: 'AppBar', props: { color: 'paper' }, children: ['Application Header'] },
  variants: pictured.map((color) => ({
    name: color,
    label: colorLabels[color],
    example: { component: 'AppBar', props: { color }, children: ['Application Header'] },
  })),
  options: {
    color: { scale: 'background' },
    size: { scale: 'sizes', default: 'md' },
    elevation: { values: [0, 4, 8, 12, 16, 24], default: 4 },
    position: { values: appBarPositionValues, default: 'static' },
    blur: { values: [true, false], default: false },
  },
  content: { children: 'children' },
  preview: { width: 480 },
})
