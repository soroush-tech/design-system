import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const tableSizeValues = ['sm', 'md', 'lg'] as const
export const tableCellPaddingValues = ['normal', 'none'] as const
export const tableAlignValues = ['left', 'right', 'center', 'justify'] as const

const sizeLabels: Record<(typeof tableSizeValues)[number], string> = {
  sm: 'Dense',
  md: 'Default',
  lg: 'Roomy',
}

const deployments = [
  node('TableHead', {}, [
    node('TableRow', {}, [
      node('TableCell', {}, ['Service']),
      node('TableCell', {}, ['Region']),
      node('TableCell', { align: 'right' }, ['Latency (ms)']),
    ]),
  ]),
  node('TableBody', {}, [
    node('TableRow', { isHoverable: true }, [
      node('TableCell', {}, ['web']),
      node('TableCell', {}, ['fra1']),
      node('TableCell', { align: 'right' }, ['42']),
    ]),
    node('TableRow', { isHoverable: true }, [
      node('TableCell', {}, ['api']),
      node('TableCell', {}, ['fra1']),
      node('TableCell', { align: 'right' }, ['87']),
    ]),
  ]),
]

export const tableCatalog = defineCatalogEntry({
  summary:
    'A data table - `TableHead`, `TableBody` and `TableFooter` sections of `TableRow`s and `TableCell`s, with density and padding set once for every cell.',
  isPlaceable: true,
  example: { component: 'Table', props: {}, children: deployments },
  variants: tableSizeValues.map((size) => ({
    name: size,
    label: sizeLabels[size],
    example: { component: 'Table', props: { size }, children: deployments },
  })),
  options: {
    size: { scale: 'sizes', default: 'md' },
    cellPadding: { values: tableCellPaddingValues, default: 'normal' },
    align: { values: tableAlignValues },
    color: { scale: 'palette' },
    bg: { scale: 'background' },
    borderColor: { scale: 'border', default: 'light' },
    borderRadius: { scale: 'radii' },
    hasStickyHeader: { values: [true, false], default: false },
    shouldHideSortIcon: { values: [true, false], default: true },
    hasEllipsis: { values: [true, false], default: false },
  },
  content: { children: 'children' },
  preview: { width: 360 },
})
