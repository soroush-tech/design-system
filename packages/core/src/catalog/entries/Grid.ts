import { defineCatalogEntry, node } from '../defineCatalogEntry'

export const gridAutoFlowValues = ['row', 'column', 'dense', 'row dense', 'column dense'] as const
export const gridJustifyContentValues = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
] as const
export const gridAlignItemsValues = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'baseline',
] as const
export const gridAlignContentValues = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
] as const
export const gridJustifyItemsValues = ['normal', 'start', 'end', 'center', 'stretch'] as const

const cells = ['A', 'B', 'C', 'D'].map((label) =>
  node(
    'Flex',
    { p: 2, bg: 'secondary', borderRadius: 'sm', alignItems: 'center', justifyContent: 'center' },
    [label]
  )
)

export const gridCatalog = defineCatalogEntry({
  summary: 'A CSS grid container - columns and rows from raw track strings, gaps from the theme.',
  isPlaceable: true,
  example: {
    component: 'Grid',
    props: { gridTemplateColumns: '1fr 1fr', gap: 2 as const },
    children: cells,
  },
  variants: [],
  options: {
    gridAutoFlow: { values: gridAutoFlowValues, default: 'row' },
    justifyContent: { values: gridJustifyContentValues },
    alignItems: { values: gridAlignItemsValues },
    alignContent: { values: gridAlignContentValues },
    justifyItems: { values: gridJustifyItemsValues },
    gap: { scale: 'space' },
    columnGap: { scale: 'space' },
    rowGap: { scale: 'space' },
  },
  content: { children: 'children' },
  preview: { width: 320 },
})
