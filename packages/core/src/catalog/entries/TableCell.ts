import { defineCatalogEntry } from '../defineCatalogEntry'

export const tableCellVariantValues = ['head', 'body', 'footer'] as const
export const tableCellAlignValues = ['inherit', 'left', 'right', 'center', 'justify'] as const
export const tableCellSortDirectionValues = ['asc', 'desc'] as const

// The same list as Table's `tableCellPaddingValues` - a catalog file imports no other at runtime.
const cellPaddingValues = ['normal', 'none'] as const

const variantLabels: Record<string, string> = {
  head: 'Head',
  body: 'Body',
  footer: 'Footer',
}

export const tableCellCatalog = defineCatalogEntry({
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
