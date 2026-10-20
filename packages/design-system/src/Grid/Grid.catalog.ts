import { defineCatalogEntry, node } from '../catalog/defineCatalogEntry'
import type { GridProps } from './Grid'

export const gridAutoFlowValues = [
  'row',
  'column',
  'dense',
  'row dense',
  'column dense',
] satisfies NonNullable<GridProps['gridAutoFlow']>[]
export const gridJustifyContentValues = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
] satisfies NonNullable<GridProps['justifyContent']>[]
export const gridAlignItemsValues = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'baseline',
] satisfies NonNullable<GridProps['alignItems']>[]
export const gridAlignContentValues = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
] satisfies NonNullable<GridProps['alignContent']>[]
export const gridJustifyItemsValues = [
  'normal',
  'start',
  'end',
  'center',
  'stretch',
] satisfies NonNullable<GridProps['justifyItems']>[]

const cells = ['A', 'B', 'C', 'D'].map((label) =>
  node(
    'Flex',
    { p: 2, bg: 'secondary', borderRadius: 'sm', alignItems: 'center', justifyContent: 'center' },
    [label]
  )
)

export const gridCatalog = defineCatalogEntry<GridProps>()({
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
