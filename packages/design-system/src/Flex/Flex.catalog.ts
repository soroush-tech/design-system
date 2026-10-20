import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { FlexProps } from './Flex'

export const flexDirectionValues = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
] satisfies NonNullable<FlexProps['flexDirection']>[]
export const flexJustifyContentValues = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] satisfies NonNullable<FlexProps['justifyContent']>[]
export const flexAlignItemsValues = [
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'baseline',
] satisfies NonNullable<FlexProps['alignItems']>[]
export const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'] satisfies NonNullable<
  FlexProps['flexWrap']
>[]

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

export const flexCatalog = defineCatalogEntry<FlexProps>()({
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
    flexWrap: { values: flexWrapValues, default: 'nowrap' },
    gap: { scale: 'space' },
    bg: { scale: 'background' },
  },
  content: { children: 'children' },
})
