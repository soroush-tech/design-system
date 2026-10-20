import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { TableCellPadding } from '../TableContext'
import type {
  TableCellAlign,
  TableCellProps,
  TableCellSortDirection,
  TableCellVariant,
} from './TableCell'

export const tableCellVariantValues = ['head', 'body', 'footer'] satisfies TableCellVariant[]
export const tableCellAlignValues = [
  'inherit',
  'left',
  'right',
  'center',
  'justify',
] satisfies TableCellAlign[]
export const tableCellSortDirectionValues = ['asc', 'desc'] satisfies TableCellSortDirection[]

// The same list as Table's `tableCellPaddingValues` - a catalog file imports no other at runtime.
const cellPaddingValues = ['normal', 'none'] satisfies TableCellPadding[]

const variantLabels: Record<TableCellVariant, string> = {
  head: 'Head',
  body: 'Body',
  footer: 'Footer',
}

export const tableCellCatalog = defineCatalogEntry<TableCellProps>()({
  summary:
    'One cell of a `TableRow` - a header `<th>` or a data `<td>`, taken from its section unless `variant` says otherwise.',
  isPlaceable: false,
  example: { component: 'TableCell', props: {}, children: ['web'] },
  variants: tableCellVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'TableCell', props: { variant }, children: ['web'] },
  })),
  options: {
    variant: { values: tableCellVariantValues },
    align: { values: tableCellAlignValues, default: 'inherit' },
    size: { scale: 'sizes' },
    cellPadding: { values: cellPaddingValues },
    sortDirection: { values: tableCellSortDirectionValues },
    hasEllipsis: { values: [true, false] },
    color: { scale: 'text' },
    bg: { scale: 'background' },
    borderColor: { scale: 'border' },
  },
  content: { children: 'children' },
})
