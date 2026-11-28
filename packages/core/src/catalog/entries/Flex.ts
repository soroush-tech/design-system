import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'] as const
export const flexJustifyContentValues = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const
export const flexAlignItemsValues = [
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'baseline',
] as const
export const flexAlignContentValues = [
  'normal',
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
] as const
export const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const

const box = {
  gap: 2,
  p: 2,
  width: '360px',
  height: '280px',
  bg: 'secondary',
  borderRadius: 'sm',
} as const

const items = ['A', 'B', 'C'].map((label) =>
  node('View', { p: 2, bg: 'primary', borderRadius: 'sm' }, [label])
)

const directions = { column: 'Column', row: 'Row' } as const

export const flexCatalog = defineCatalogEntry({
  summary: 'A flexbox container that lays its children out in a column or a row.',
  isPlaceable: true,
  example: { component: 'Flex', props: { ...box, flexDirection: 'column' }, children: items },
  variants: (['column', 'row'] as const).map((flexDirection) => ({
    name: flexDirection,
    label: directions[flexDirection],
    example: { component: 'Flex', props: { ...box, flexDirection }, children: items },
  })),
  options: {
    flexDirection: { values: flexDirectionValues, default: 'column' },
    justifyContent: { values: flexJustifyContentValues },
    alignItems: { values: flexAlignItemsValues },
    alignContent: { values: flexAlignContentValues },
    flexWrap: { values: flexWrapValues, default: 'nowrap' },
    gap: { scale: 'space' },
    bg: { scale: 'background' },
  },
  content: { children: 'children' },
})
