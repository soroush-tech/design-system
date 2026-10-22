import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { JsonValue } from '../catalog/types'
import type { TransferListProps } from './TransferList'

// A catalog example is JSON, whose arrays are not readonly: the items, whose optional `disabled` is no JSON value, and the value, at their JSON types.
type TransferListCatalogProps = Omit<TransferListProps, 'items' | 'value' | 'defaultValue'> & {
  items?: Record<string, JsonValue>[]
  value?: (string | number)[]
  defaultValue?: (string | number)[]
}

const items: Record<string, JsonValue>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
]

const names = {
  leftLabel: 'Choices',
  rightLabel: 'Chosen',
  moveRightLabel: 'Move right',
  moveLeftLabel: 'Move left',
}

const moveAllNames = {
  moveAllRightLabel: 'Move all right',
  moveAllLeftLabel: 'Move all left',
}

export const transferListCatalog = defineCatalogEntry<TransferListCatalogProps>()({
  summary: 'Two lists and the buttons that move the checked items from one to the other.',
  isPlaceable: true,
  example: {
    component: 'TransferList',
    props: { items, defaultValue: ['cherry'], ...names },
    children: [],
  },
  variants: [
    {
      name: 'basic',
      label: 'Basic',
      example: { component: 'TransferList', props: { items, ...names }, children: [] },
    },
    {
      name: 'move-all',
      label: 'With move all',
      example: {
        component: 'TransferList',
        props: { items, shouldShowMoveAll: true, ...names, ...moveAllNames },
        children: [],
      },
    },
    {
      name: 'select-all',
      label: 'With select all',
      example: {
        component: 'TransferList',
        props: { items, hasSelectAll: true, ...names },
        children: [],
      },
    },
  ],
  options: {
    shouldShowMoveAll: { values: [true, false], default: false },
    hasSelectAll: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
    error: { values: [true, false], default: false },
    size: { scale: 'sizes', default: 'md' },
    color: { scale: 'palette' },
  },
  content: {},
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
})
